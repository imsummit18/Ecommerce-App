module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 400;
  err.status = err.status || "fail";
  res.status(err.statusCode).json({
    status: err.status,
    msg: err.message,
  });
};
