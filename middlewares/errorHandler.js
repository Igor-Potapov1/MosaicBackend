const errorHandler = (error, req, res, next) => {
  res.sendStatus(500);
  console.error(error);
};

module.exports = errorHandler;
