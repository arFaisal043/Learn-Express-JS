// custom Logger application middleware
exports.logMiddleware = (req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
};
