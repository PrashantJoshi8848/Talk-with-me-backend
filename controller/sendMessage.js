const asyncHandeler = require("express-async-handler");
const chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const user = require("../models/userModel");

const sendMessage = asyncHandeler(async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    console.log("invalid data Process into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };
  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await user.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });
    await chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });
    res.json(message);
  } catch (err) {
    res.status(400);
    throw new Error(err);
  }
});

module.exports = sendMessage;
