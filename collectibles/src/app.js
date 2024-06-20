import express from "express"
import { WebSocketServer } from "ws"
import Knex from "knex"
import { Model } from "objection"
import knexConfig from "./knexfile.js"

const knex = Knex(knexConfig.development)
Model.knex(knex)

const app = express()
const port = 3000

const wss = new WebSocketServer({ noServer: true })

app.use(express.json())

class Record extends Model {
  static get tableName() {
    return "records"
  }
}

// REST API endpoints
app.get("/records", async (req, res) => {
  const records = await Record.query()
  res.json(records)
})

app.post("/records", async (req, res) => {
  const record = await Record.query().insert(req.body)
  res.json(record)
})

app.put("/records/:id", async (req, res) => {
  const { id } = req.params
  const record = await Record.query().patchAndFetchById(
    id,
    req.body
  )
  res.json(record)
})

app.delete("/records/:id", async (req, res) => {
  const { id } = req.params
  await Record.query().deleteById(id)
  res.sendStatus(204)
})

// WebSocket connection
wss.on("connection", (ws) => {
  ws.on("message", async (message) => {
    const data = JSON.parse(message)
    switch (data.action) {
      case "get":
        const records = await Record.query()
        ws.send(JSON.stringify(records))
        break
      case "create":
        const newRecord = await Record.query().insert(
          data.payload
        )
        ws.send(JSON.stringify(newRecord))
        break
      case "update":
        const updatedRecord =
          await Record.query().patchAndFetchById(
            data.payload.id,
            data.payload
          )
        ws.send(JSON.stringify(updatedRecord))
        break
      case "delete":
        await Record.query().deleteById(data.payload.id)
        ws.send(JSON.stringify({ id: data.payload.id }))
        break
    }
  })
})

// Handling server upgrade for WebSocket
const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})

server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request)
  })
})
