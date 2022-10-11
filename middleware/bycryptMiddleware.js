const bycrypt = require("bcryptjs");
const bycryptMiddleware = async function (next) {
  if (!this.isModified) {
    next();
  }
  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password, salt);
};

module.exports = bycryptMiddleware;
