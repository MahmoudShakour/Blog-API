const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  timeCreated: { type: Date },
  userId: { type: Schema.Types.objectId, ref: "User", required: true },
  blogId: { type: Schema.Types.objectId, ref: "Blog", required: true },
});

likeSchema.virtual("url").get(function () {
  return "/like/" + this._id;
});

module.exports = mongoose.model("Like", likeSchema);
