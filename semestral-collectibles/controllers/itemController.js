import {
  createItem,
  findItemsByOwnerId,
  deleteItemById,
} from "../models/itemModel.js";
import { broadcast } from "../server.js";

/**
 * Show all items that belong to the logged-in user.
 */
export const showItems = async (req, res) => {
  const items = await findItemsByOwnerId(req.session.userId);
  res.render("items", { items });
};

/**
 * Add new item to the logged-in user and send broadcast about it.
 */
export const addItem = async (req, res) => {
  const { name, description } = req.body;
  const newItem = await createItem(name, description, req.session.userId);
  broadcast({ type: "NEW_ITEM", item: newItem }); // broadcast to all clients
  res.redirect("/items");
};

/**
 * Delete user's existing item.
 */
export const deleteItem = async (req, res) => {
  const { id } = req.params;
  await deleteItemById(id);
  res.redirect("/items");
};
