import express from "express";
import {
  showItems,
  addItem,
  deleteItem,
} from "../controllers/itemController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/items", requireAuth, showItems);
router.post("/items", requireAuth, addItem);
router.post("/items/delete/:id", requireAuth, deleteItem);

export default router;
