let asyncHandler = require("express-async-handler");
const chatmodel = require("../models/chatModel");
const usermodule = require("../models/userModel");
const chatacessroute = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  if (!userId) {
    console.log("userId param not send");
    res.send(400);
  }
  var ischat = await chatmodel
    .find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.body.userId } } },
        {
          users: { $elemMatch: { $eq: req.user._id } },
        },
      ],
    })
    .populate("users", "-password")
    .populate("latestMessage");

  ischat = await usermodule.populate(ischat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (ischat.length > 0) {
    res.send(ischat[0]);
  } else {
    var chatdata = {
      chatName: "sender",
      isGroupChat: "false",
      users: [req.user._id, req.body.userId],
    };
    try {
      const createdchat = await chatmodel.create(chatdata);
      const fullchat = await chatmodel
        .findOne({ _id: createdchat._id })
        .populate("users", "-password");
      res.status(200).send(fullchat);
    } catch (error) {
      res.status(400);
      throw new Error(error);
    }
  }
});
module.exports = chatacessroute;
