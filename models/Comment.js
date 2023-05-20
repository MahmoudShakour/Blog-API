const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: "User", reqiured: true },
  blogId: { type: Schema.Types.ObjectId, ref: "Blog", reqiured: true },
});

commentSchema.virtual("url").get(function () {
  return "/comment/" + this._id;
});

module.exports = mongoose.model("Comment",commentSchema);
