import express from "express";
import {
  showRegister,
  register,
  showLogin,
  login,
  logout,
} from "../controllers/authController.js";
import itemRoutes from "./itemRoutes.js";
import adminRoutes from "./adminRoutes.js";

const router = express.Router();

// Root route
router.get("/", (req, res) => {
  res.render("index", { session: req.session });
});

router.get("/register", showRegister);
router.post("/register", register);
router.get("/login", showLogin);
router.post("/login", login);
router.get("/logout", logout);

// Include item routes
router.use(itemRoutes);

// Include admin routes
router.use(adminRoutes);

export default router;
