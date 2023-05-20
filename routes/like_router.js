const express = require("express");
const authToken = require("../middlewares/authToken");
const Blog = require("../models/Blog");
const router = express.Router();
const Like = require("../models/Like");
const User = require("../models/User");

router.get("/list", authToken, async (req, res, next) => {
  if (req.user.role !== "admin") {
    res.status(403).json({ message: "not authortized" });
  } else {
    const likes = await Like.find({})
      .populate("userId", "firstname lastname username email")
      .populate("blogId", "title status")
      .exec();

    res.json(likes);
  }
});

router.get("/:likeId", authToken, async (req, res, next) => {
  const like = await Like.findById(req.params.likeId)
    .populate("userId", "firstname lastname username email")
    .populate("blogId", "title status")
    .exec();
  if (!like) {
    res.status(404).json({ messsage: "resource is not found" });
  } else if (
    like.blogId.status === "private" &&
    like.userId._id != req.user._id
  ) {
    res.status(403).json({ messsage: "not authorized" });
  } else {
    res.json(like);
  }
});

router.post("/:blogId", authToken, async (req, res, next) => {
  const blog = await Blog.findById(req.params.blogId).exec();
  const user = await User.findById(req.user._id).exec();
  console.log(user);
  if (!blog) {
    res.status(404).json({ message: "resource is not found" });
  } else if (blog.status === "private") {
    res.status(403).json({ message: "not authorized" });
  } else {
    const newLike = new Like({
      timeCreated: Date.now(),
      blogId: blog,
      userId: user,
    });
    await newLike.save();
    res.json(newLike);
  }
});

router.delete("/:likeId", authToken, async (req, res, next) => {
  const like = await Like.findById(req.params.likeId).exec();

  if (!like) {
    res.status(404).json({ message: "resource is not found" });
  } else if (like.userId !== req.user._id) {
    res.status(403).json({ message: "not authorized" });
  } else {
    await Like.findByIdAndRemove(req.params.likeId).exec();
    req.status(204).json({ message: "like deleted succefully" });
  }
});

module.exports = router;
