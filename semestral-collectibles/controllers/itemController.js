import {
  createItem,
  findItemsByOwnerId,
  deleteItemById,
} from "../models/itemModel.js";

/**
 * Show all items that belong to the logged-in user.
 */
export const showItems = async (req, res) => {
  const items = await findItemsByOwnerId(req.session.userId);
  res.render("items", { items });
};

/**
 * Add new item to the logged-in user.
 */
export const addItem = async (req, res) => {
  const { name, description } = req.body;
  await createItem(name, description, req.session.userId);
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
