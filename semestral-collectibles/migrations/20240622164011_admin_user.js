/**
 * Modify table with users.
 * Adds column with atribute differenciating admins (true/false).
 */
export async function up(knex) {
  await knex.schema.table("users", (table) => {
    table.boolean("admin").defaultTo(false);
  });
}

/**
 * Rollback drops column in table "users" with admin attribute.
 */
export async function down(knex) {
  await knex.schema.table("users", (table) => {
    table.dropColumn("admin");
  });
}
