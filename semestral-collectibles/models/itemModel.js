import knex from "knex";
import knexConfig from "../knexfile.js";

const db = knex(knexConfig.development);

// Create a new item
export const createItem = async (name, description, ownerId) => {
  return await db("items").insert({ name, description, owner_id: ownerId });
};

// Find all items
export const findAllItems = async () => {
  return await db("items").select("*");
};

// Find items by owner ID
export const findItemsByOwnerId = async (ownerId) => {
  return await db("items").where({ owner_id: ownerId });
};

// Find an item by ID
export const findItemById = async (id) => {
  return await db("items").where({ id }).first();
};

// Delete an item by ID
export const deleteItemById = async (id) => {
  return await db("items").where({ id }).del();
};

// Update item owner
export const updateItemOwner = async (itemId, newOwnerId) => {
  return await db("items")
    .where({ id: itemId })
    .update({ owner_id: newOwnerId });
};