import { findUserById } from "../models/userModel.js";

export const requireAdmin = async (req, res, next) => {
  const user = await findUserById(req.session.userId);
  if (user && user.admin) {
    next();
  } else {
    res.status(403).send("Forbidden");
  }
};
