import express from "express";
import {
  showRegister,
  register,
  showLogin,
  login,
  logout,
} from "../controllers/authController.js";

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

export default router;