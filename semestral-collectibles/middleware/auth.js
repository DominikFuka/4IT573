/**
 * Ensures that some routes are protected by logins.
 */
export const requireAuth = (req, res, next) => {
  // is userId set in session (logged in user)?
  if (req.session && req.session.userId) {
    // yes, continue to next
    next();
  } else {
    // no, redirect to login page
    res.redirect("/login");
  }
};
