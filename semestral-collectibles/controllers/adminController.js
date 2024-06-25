import {
  findAllItems,
  deleteItemById,
  findItemById,
} from "../models/itemModel.js";
import { broadcast } from "../server.js";

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
  const item = await findItemById(id);
  // if item exists, delete item and send broadcast
  if (item) {
    await deleteItemById(id);
    broadcast({ type: "DELETE_ITEM", itemId: id, ownerId: item.owner_id });
  }
  res.redirect("/admin/items");
};
