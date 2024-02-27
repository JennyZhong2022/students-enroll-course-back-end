const NotFoundException = require("../exceptions/NotFoundException");

module.exports=(err, req, res, next) => {
  if (err instanceof NotFoundException) {
    res.status(err.status || 404).json({ error: err.message });
    return;
  }
  next(err)
};