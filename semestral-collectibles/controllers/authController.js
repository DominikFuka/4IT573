import bcrypt from "bcryptjs";
import {
  createUser,
  findUserByUsername,
  findUserById,
} from "../models/userModel.js";

export const showRegister = (req, res) => {
  res.render("register");
};

export const register = async (req, res) => {
  const { username, password, password2 } = req.body;
  if (password !== password2) {
    return res.render("register", { error: "Passwords do not match" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await createUser(username, hashedPassword);
    res.redirect("/login");
  } catch (err) {
    res.render("register", { error: "Username already taken" });
  }
};

export const showLogin = (req, res) => {
  res.render("login");
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await findUserByUsername(username);
  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.userId = user.id;
    res.redirect("/");
  } else {
    res.render("login", { error: "Invalid username or password" });
  }
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/");
    }
    res.redirect("/login");
  });
};
