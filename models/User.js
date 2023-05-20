const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String },
  password: { type: String },
  username: { type: String },
  role: { type: String },
  timeCreated: { type: Date },
});

userSchema.virtual("url").get(function () {
  return "/user/" + this._id;
});

module.exports = mongoose.model("User", userSchema);
