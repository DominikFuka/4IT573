import { findAllItems, deleteItemById } from "../models/itemModel.js";

/**
 * Display all items in the system (admin users only).
 */
export const showAllItems = async (req, res) => {
  const items = await findAllItems();
  res.render("admin/items", { items });
};

/**
 * Delete item from the system (admin users only).
 */
export const deleteAnyItem = async (req, res) => {
  const { id } = req.params;
  await deleteItemById(id);
  res.redirect("/admin/items");
};
