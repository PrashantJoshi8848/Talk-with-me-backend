const syncHandeler = require("express-async-handler");
const chat = require("../models/chatModel");

const addtoGroup = syncHandeler(async (req, res) => {
  const { chatId, userId } = req.body;

  if (!chatId || !userId) {
    res.status(400);
    res.send("Provide userId");
  }

  let finduser = await chat.find({
    _id: chatId,
    users: { $elemMatch: { $eq: userId } },
  });

  if (finduser.length) {
    res.send("user already exists in group");
  } else {
    try {
      const adduser = await chat
        .findByIdAndUpdate(
          { _id: chatId },
          { $push: { users: userId } },
          { new: true }
        )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

      if (!adduser) {
        res.status(404);
        throw new Error("Chat not found");
      } else {
        res.status(201).json(adduser);
      }
    } catch (err) {
      res.status(400);
      throw new Error(err);
    }
  }
});

module.exports = addtoGroup;
