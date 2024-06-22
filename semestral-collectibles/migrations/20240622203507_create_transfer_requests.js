export async function up(knex) {
  await knex.schema.createTable("transfer_requests", (table) => {
    table.increments("id").primary();
    table
      .integer("item_id")
      .unsigned()
      .references("id")
      .inTable("items")
      .onDelete("CASCADE");
    table
      .integer("from_user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .integer("to_user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.boolean("accepted").defaultTo(null); // null means pending, true means accepted, false means rejected
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTable("transfer_requests");
}
