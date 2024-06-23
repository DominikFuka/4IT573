/**
 * Modify table with items.
 * Each item has id, name, can have description, and has owner from
 * "users" table.
 */
export async function up(knex) {
  await knex.schema.createTable("items", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("description");
    table.integer("owner_id").unsigned().references("id").inTable("users");
  });
}

/**
 * Rollback drops the whole table with items.
 */
export async function down(knex) {
  await knex.schema.dropTable("items");
}
