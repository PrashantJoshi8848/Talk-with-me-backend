const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const fetchAllMessage = asyncHandler(async (req, res) => {
  try {
    const message = await Message.find({ chat: req.params.id })
      .populate("sender", "pic name email")
      .populate("chat");
    res.json(message);
  } catch (err) {
    res.status(400);
    throw new Error(err);
  }
});
module.exports = fetchAllMessage;
