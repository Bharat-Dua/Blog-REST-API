const errorHandler = (err, req, res, next) => {
  try {
    const code = res.code ? res.code : 500;
    res
      .status(code)
      .json({ code, status: false, message: err.message, stack: err.stack });
  } catch (error) {
    // Handle any errors that occur within the error handler itself
    res
      .status(500)
      .json({
        code: 500,
        status: false,
        message: "Internal Server Error",
        stack: error.stack,
      });
  }
};

module.exports = errorHandler;
