const asyncHandler = require("express-async-handler");
const chat = require("../models/chatModel");
const user = require("../models/userModel");
const fetchroute = asyncHandler(async (req, res) => {
  try {
    var ischat = chat
      .find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (result) => {
        result = await user.populate(result, {
          path: "latesMessage.sender",
          select: "name pic email",
        });
        res.status(201).send(result);
      });
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

module.exports = fetchroute;
