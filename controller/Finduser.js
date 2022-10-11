const asyncHandler = require("express-async-handler");
const user = require("../models/userModel");
const alluser = asyncHandler(async (req, res) => {
  if (req.query.search) {
    let User = await user
      .find({
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: `${req.query.search}`, $options: "i" } },
        ],
      })
      .find({ _id: { $ne: req.user._id } });
    res.send(User);
  }
});

module.exports = alluser;
