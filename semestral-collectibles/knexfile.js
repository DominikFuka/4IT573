const config = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./collectibles.sqlite",
    },
    useNullAsDefault: true,
  },
};

export default config;
