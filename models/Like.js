const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  timeCreated: { type: Date },
  userId: { type: Schema.Types.ObjectId, ref: "User", reqiured: true },
  blogId: { type: Schema.Types.ObjectId, ref: "Blog", reqiured: true },
});

likeSchema.virtual("url").get(function () {
  return "/like/" + this._id;
});

module.exports = mongoose.model("Like", likeSchema);
