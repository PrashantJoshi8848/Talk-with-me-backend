const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const bycryptMiddleware = require("../middleware/bycryptMiddleware");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    pic: {
      type: String,
      default:
        "https://thumbs.dreamstime.com/z/small-size-emoticon-too-showing-fingers-77427252.jpg",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchpassword = async function (enteredpassword) {
  return await bycrypt.compare(enteredpassword, this.password);
};

userSchema.pre("save", bycryptMiddleware);

const user = mongoose.model("user", userSchema);

module.exports = user;
