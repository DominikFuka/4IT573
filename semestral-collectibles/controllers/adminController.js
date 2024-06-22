import { findAllItems, deleteItemById } from "../models/itemModel.js";

export const showAllItems = async (req, res) => {
  const items = await findAllItems();
  res.render("admin/items", { items });
};

export const deleteAnyItem = async (req, res) => {
  const { id } = req.params;
  await deleteItemById(id);
  res.redirect("/admin/items");
};
