/**
 * Modify transfer requests.
 * Each user has id, unique username, and hashed password.
 */
export async function up(knex) {
  await knex.schema.createTable("transfer_requests", (table) => {
    table.increments("id").primary(); // auto increment id
    table
      .integer("item_id")
      .unsigned()
      .references("id")
      .inTable("items")
      .onDelete("CASCADE"); // if item is deleted, so is the req
    table
      .integer("from_user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE"); // if sending user is deleted, so is the req
    table
      .integer("to_user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE"); // if receiving user is deleted, so is the req
    table.boolean("accepted").defaultTo(null); // null = pending, true = accepted, false = rejected
    table.timestamps(true, true); // timestamp managed by Knex
  });
}

/**
 * Rollback drops the whole table with tranfer requests.
 */
export async function down(knex) {
  await knex.schema.dropTable("transfer_requests");
}
