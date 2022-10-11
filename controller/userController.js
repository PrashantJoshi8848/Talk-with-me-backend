const asyncHandler = require("express-async-handler");
const user = require("../models/userModel");
const generateToken = require("../config/generatetoken");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userRegister = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all field");
  }
  const userExists = await user.findOne({ email });
  if (userExists) {
    throw new Error("user already exist");
  }
  const adduser = await user.create({
    name,
    email,
    password,
    pic,
  });
  if (adduser) {
    let result = await generateToken(adduser._id);
    res.status(201).json({
      _id: adduser._id,
      name: adduser.name,
      email: adduser.email,
      password: adduser.password,
      pic: adduser.pic,
      jwsToken: await generateToken(adduser._id),
    });
  } else {
    res.status(400);
    throw new Error("Faild to create the User");
  }
});
const userSignin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const User = await user.findOne({ email });
  if (User && (await User.matchpassword(password))) {
    res.json({
      _id: User._id,
      name: User.name,
      email: User.email,
      pic: User.pic,
      jwsToken: await generateToken(User._id),
    });
  }
});

module.exports = { userRegister, userSignin };
