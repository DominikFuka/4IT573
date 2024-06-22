export async function up(knex) {
  await knex.schema.table("users", (table) => {
    table.boolean("admin").defaultTo(false);
  });
}

export async function down(knex) {
  await knex.schema.table("users", (table) => {
    table.dropColumn("admin");
  });
}
