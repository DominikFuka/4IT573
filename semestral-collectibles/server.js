import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import { createServer } from "http";
import WebSocket from "ws";
import knexConfig from "./knexfile.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { requireAuth } from "./middleware/auth.js";
import { sessionToLocals } from "./middleware/sessionToLocals.js";
import knex from "knex";

dotenv.config();

const app = express();
const server = createServer(app);
const wss = new WebSocket.Server({ server });

const db = knex(knexConfig.development);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Add session to res.locals
app.use(sessionToLocals);

// Public routes
app.use("/", authRoutes);

// Protected routes
app.get("/dashboard", requireAuth, (req, res) => {
  res.send("Welcome to the dashboard!");
});

// Use the error handling middleware
app.use(errorHandler);

wss.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("message", (message) => {
    console.log(`Received message => ${message}`);
  });
  socket.on("close", () => {
    console.log("Client disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
