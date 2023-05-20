const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  content: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String },
  status: { type: String },
  timeCreated: { type: Date },
});

blogSchema.virtual("url").get(function () {
  return "/blog/" + this._id;
});

module.exports = mongoose.model("Blog", blogSchema);
