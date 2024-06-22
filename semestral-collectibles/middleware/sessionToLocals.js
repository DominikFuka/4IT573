import { findUserById } from "../models/userModel.js";

export const sessionToLocals = async (req, res, next) => {
  if (req.session.userId) {
    const user = await findUserById(req.session.userId);
    res.locals.session = { ...req.session, admin: user.admin };
  } else {
    res.locals.session = req.session;
  }
  next();
};
