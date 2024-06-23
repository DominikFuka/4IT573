import bcrypt from "bcryptjs";
import {
  createUser,
  findUserByUsername,
  findUserById,
} from "../models/userModel.js";

/**
 * Render page with registration form.
 */
export const showRegister = (req, res) => {
  res.render("register");
};

/**
 * Function to handle registering new user.
 */
export const register = async (req, res) => {
  const { username, password, password2 } = req.body;
  // check password match
  if (password !== password2) {
    return res.render("register", { error: "Passwords do not match" });
  }
  // hashing to password so it is not stored as plain string
  const hashedPassword = await bcrypt.hash(password, 10);
  // create new user: success = redirect to login / fail = error message
  try {
    await createUser(username, hashedPassword);
    res.redirect("/login");
  } catch (err) {
    res.render("register", { error: "Username already taken" });
  }
};

/**
 * Render login page.
 */
export const showLogin = (req, res) => {
  res.render("login");
};

/**
 * Function to handle user login.
 */
export const login = async (req, res) => {
  const { username, password } = req.body;
  // find user by the usernam
  const user = await findUserByUsername(username);
  // test correct password
  if (user && (await bcrypt.compare(password, user.password))) {
    // redirect to homepage on correct pass
    req.session.userId = user.id;
    res.redirect("/");
  } else {
    // error message on incorrect pass
    res.render("login", { error: "Invalid username or password" });
  }
};

/**
 * Function to handle logout.
 */
export const logout = (req, res) => {
  // destroy session = logout user and redirect to login page
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/");
    }
    res.redirect("/login");
  });
};
