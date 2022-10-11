const AsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const usermodule = require("../models/userModel");

const authoriz = AsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decode = jwt.verify(token, process.env.jwt_Secret);
      req.user = await usermodule.findById(decode._id).select("-password");
      next();
    } catch (err) {
      res.status(401);
      throw new Error("Not Authorized,token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorize,no token");
  }
});

module.exports = authoriz;
