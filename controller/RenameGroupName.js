const asyncHandeler = require("express-async-handler");
const chat = require("../models/chatModel");

const groupRename = asyncHandeler(async (req, res) => {
  const { chatId, chatName } = req.body;
  const updatedchat = await chat
    .findByIdAndUpdate({ _id: chatId }, { chatName: chatName }, { new: true })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  console.log(updatedchat);
  if (!updatedchat) {
    res.status(404);
    throw new Error("chat not found");
  } else {
    res.json(updatedchat);
  }
});

module.exports = groupRename;
