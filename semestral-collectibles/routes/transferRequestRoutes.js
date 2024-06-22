import express from "express";
import {
  createRequest,
  showRequests,
  respondRequest,
} from "../controllers/transferRequestController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/transfer-request", requireAuth, createRequest);
router.get("/transfer-requests", requireAuth, showRequests);
router.post("/transfer-request/respond", requireAuth, respondRequest);

export default router;
