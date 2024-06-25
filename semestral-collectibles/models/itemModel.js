import knex from "knex";
import knexConfig from "../knexfile.js";

const db = knex(knexConfig.development);

/**
 * Create new item.
 * @param {String} name
 * @param {String} description
 * @param {Number} ownerId
 */
export const createItem = async (name, description, ownerId) => {
  const [id] = await db("items").insert({
    name,
    description,
    owner_id: ownerId,
  });
  return await findItemById(id); // return new item
};

/**
 * Fetch all items.
 */
export const findAllItems = async () => {
  return await db("items").select("*");
};

/**
 * Find items of user owner by the user's ID.
 * @param {Number} ownerId
 */
export const findItemsByOwnerId = async (ownerId) => {
  return await db("items").where({ owner_id: ownerId });
};

/**
 * Find item by it's ID.
 * @param {Number} id - item's ID
 */
export const findItemById = async (id) => {
  return await db("items").where({ id }).first();
};

/**
 * Delete item by given ID.
 * @param {Number} id - item's ID
 */
export const deleteItemById = async (id) => {
  return await db("items").where({ id }).del();
};

/**
 * Update item's owner.
 * @param {Number} itemId
 * @param {Number} newOwnerId
 */
export const updateItemOwner = async (itemId, newOwnerId) => {
  return await db("items")
    .where({ id: itemId })
    .update({ owner_id: newOwnerId });
};
