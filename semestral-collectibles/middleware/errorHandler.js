/**
 * Basic server side error handler.
 */
export const errorHandler = (err, req, res, next) => {
  // send err code 500 with message
  console.error(err.stack);
  res.status(500).send("Sorry, something broke, but it's not your fault.");
};
