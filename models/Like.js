const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  
});

userSchema.virtual("url").get(function () {
  return "/user/" + this._id;
});

module.exports = mongoose.model("User", userSchema);
