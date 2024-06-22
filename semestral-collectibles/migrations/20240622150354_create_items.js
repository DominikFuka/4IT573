export async function up(knex) {
  await knex.schema.createTable("items", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("description");
    table.integer("owner_id").unsigned().references("id").inTable("users");
  });
}

export async function down(knex) {
  await knex.schema.dropTable("items");
}
