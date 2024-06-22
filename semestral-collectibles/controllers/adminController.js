import { findAllItems } from "../models/itemModel.js";

export const showAllItems = async (req, res) => {
  const items = await findAllItems();
  res.render("admin/items", { items });
};
