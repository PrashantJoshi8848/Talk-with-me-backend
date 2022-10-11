const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const connection = () => {
  try {
    const dbconnectionresult = mongoose
      .connect(process.env.Mongo_URI)
      .then(() => {
        console.log(`db connected`);
      });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = connection;
