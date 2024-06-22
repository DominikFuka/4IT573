import express from "express";
import { showAllItems } from "../controllers/adminController.js";
import { requireAdmin } from "../middleware/admin.js";

const router = express.Router();

router.get("/admin/items", requireAdmin, showAllItems);

export default router;
