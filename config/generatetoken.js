const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = async (id) => {
  let token = await jwt.sign({ _id: id }, process.env.jwt_Secret, {
    expiresIn: "30d",
  });
  return token;
};
generateToken();
module.exports = generateToken;
