const asyncHandler = require("express-async-handler");
const chat = require("../models/chatModel");
const createGroup = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    res.status(400).send("Required valid name and user");
  }
  var users = JSON.parse(req.body.users);
  if (users.length < 2) {
    return res.status(400).send("more than 2 user is require to create group");
  }

  users.push(req.user._id);

  try {
    const groupchat = await chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullchat = await chat
      .findOne({ _id: groupchat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullchat);
  } catch (err) {
    res.status(400);
    throw new Error(err);
  }
});

module.exports = createGroup;
