export const up = async (knex) => {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("username").notNullable().unique();
    table.string("password").notNullable();
  });
};

export const down = async (knex) => {
  return knex.schema.dropTable("users");
};
