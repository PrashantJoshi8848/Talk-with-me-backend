const express = require("express");
const chatRoute = express.Router();
const authorize = require("../middleware/autherization");
const accesschat = require("../controller/chatAccessController");
const fetchchat = require("../controller/fetchChat");
const creategroupchat = require("../controller/createGroup");
const renamegroupchat = require("../controller/RenameGroupName");
const addTogroup = require("../controller/addtoGroup");
const removeFromgroup = require("../controller/removeFromGroup");

chatRoute.route("/").post(authorize, accesschat);
chatRoute.route("/").get(authorize, fetchchat);
chatRoute.route("/group").post(authorize, creategroupchat);
chatRoute.route("/rename").put(authorize, renamegroupchat);
chatRoute.route("/groupadd").put(authorize, addTogroup);
chatRoute.route("/groupremove").put(authorize, removeFromgroup);
module.exports = chatRoute;
