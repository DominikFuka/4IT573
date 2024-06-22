import {
  createItem,
  findItemsByOwnerId,
  deleteItemById,
} from "../models/itemModel.js";

export const showItems = async (req, res) => {
  const items = await findItemsByOwnerId(req.session.userId);
  res.render("items", { items });
};

export const addItem = async (req, res) => {
  const { name, description } = req.body;
  await createItem(name, description, req.session.userId);
  res.redirect("/items");
};

export const deleteItem = async (req, res) => {
  const { id } = req.params;
  await deleteItemById(id);
  res.redirect("/items");
};
