import { findUserById } from "../models/userModel.js";

/**
 * Ensure the user in session has admin.
 */
export const requireAdmin = async (req, res, next) => {
  // find user
  const user = await findUserById(req.session.userId);
  // verify admin
  if (user && user.admin) {
    // admin verified, continue to following middleware/route
    next();
  } else {
    // user is not admin, error + message
    res.status(403).send("You need admin access to do that.");
  }
};
