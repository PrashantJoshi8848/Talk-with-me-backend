const express = require("express");
const messageRoute = express.Router();
const sendMessage = require("../controller/sendMessage");
const authoriz = require("../middleware/autherization");
const getMessage = require("../controller/fetchAllMessage");

messageRoute.route("/").post(authoriz, sendMessage);
messageRoute.route("/:id").get(authoriz, getMessage);

module.exports = messageRoute;
