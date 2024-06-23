/**
 * Modify table with users.
 * Each user has id, unique username, and hashed password.
 */
export const up = async (knex) => {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("username").notNullable().unique();
    table.string("password").notNullable();
  });
};

/**
 * Rollback drops the whole table with users.
 */
export const down = async (knex) => {
  return knex.schema.dropTable("users");
};
