const asyncHandeler = require("express-async-handler");
const chat = require("../models/chatModel");
const { findByIdAndDelete } = require("../models/userModel");

const removeFromGroup = asyncHandeler(async (req, res) => {
  const { chatId, userId } = req.body;

  if (!chatId || !userId) {
    res.send("require user id to delete");
  }
  try {
    const user = await chat
      .findByIdAndUpdate(
        { _id: chatId },
        { $pull: { users: userId } },
        { new: true }
      )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (user) {
      res.json(user);
    } else {
      res.status(400);
      throw new Error(user);
    }
  } catch (err) {
    res.status(400);
    throw new Error(err);
  }
});

module.exports = removeFromGroup;
