const express = require("express");
const { userRegister, userSignin } = require("../controller/userController");
const userroute = express.Router();
const alluser = require("../controller/Finduser");
const autherization = require("../middleware/autherization");

userroute.post("/", userRegister).get("/", autherization, alluser);
userroute.post("/login", userSignin);

module.exports = { userroute };
