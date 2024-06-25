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
import transferRequestRoutes from "./transferRequestRoutes.js";

const router = express.Router();

// root route
router.get("/", (req, res) => {
  res.render("index", { session: req.session });
});

// routes to controller actions
router.get("/register", showRegister);
router.post("/register", register);
router.get("/login", showLogin);
router.post("/login", login);
router.get("/logout", logout);

// include item routes
router.use(itemRoutes);

// include admin routes
router.use(adminRoutes);

// include transfer request routes
router.use(transferRequestRoutes);

export default router;
