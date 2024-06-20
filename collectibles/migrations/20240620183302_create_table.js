/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable(
    "collectibles",
    function (table) {
      table.increments("id").primary()
      table.string("name")
      table.string("description")
      // TODO - pridat foreign na user majitele
    }
  )
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("collectibles")
}
