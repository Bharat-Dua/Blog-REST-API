const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../config/kyes");

const isAuth = async (req, res, next) => {
  try {
    // console.log(req.headers);
    // const token = req.headers.authorization.split(' ')[1];
    const authorization = req.headers.authorization
      ? req.headers.authorization.split(" ")
      : [];
    const token = authorization.length > 1 ? authorization[1] : null;
    if (token) {
      const decoded = jwt.verify(token, jwtSecretKey);
      console.log(decoded);
      if (decoded) {
        req.user = {
          id: decoded._id,
          name: decoded.name,
          email: decoded.email,
          role: decoded.role,
        };
        next();
      } else {
        res.status(401);
        throw new Error("Unauthorized");
      }
    } else {
      res.code = 400;
      throw new Error("Token is required");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = isAuth;
