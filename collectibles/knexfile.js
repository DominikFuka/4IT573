export default {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./collectibles.sqlite",
    },
    useNullAsDefault: false,
    debug: false,
  },
}
