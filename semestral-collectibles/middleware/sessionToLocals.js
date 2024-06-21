export const sessionToLocals = (req, res, next) => {
  res.locals.session = req.session;
  next();
};
