import { findUserById } from "../models/userModel.js";

/**
 * Hands out the session data to different views.
 */
export const sessionToLocals = async (req, res, next) => {
  // check for logged in user
  if (req.session.userId) {
    // user logged in, find him in db
    const user = await findUserById(req.session.userId);
    // set session data for later use in views
    res.locals.session = { ...req.session, admin: user.admin };
  } else {
    // set empty session to avoid errors in views
    res.locals.session = req.session;
  }
  // continue to next
  next();
};
