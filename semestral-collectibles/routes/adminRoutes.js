import express from "express";
import { showAllItems, deleteAnyItem } from "../controllers/adminController.js";
import { requireAdmin } from "../middleware/admin.js";

const router = express.Router();

// seeing all items and deleting any item is protected by admin access
router.get("/admin/items", requireAdmin, showAllItems);
router.post("/admin/items/delete/:id", requireAdmin, deleteAnyItem);

export default router;
