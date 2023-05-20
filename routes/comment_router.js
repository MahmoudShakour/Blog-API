const express = require("express");
const authToken = require("../middlewares/authToken");
const router = express.Router();
const Comment = require("../models/Comment");
const Blog = require("../models/Blog");

router.get("/list", authToken, async (req, res, next) => {
  if (req.user.role === "admin") {
    const allComments = await Comment.find({})
      .populate("userId", "firstname lastname username email")
      .populate("blogId", "title status")
      .exec();
    res.json(allComments);
  } else {
    res.status(403).json({ message: "not authorized" });
  }
});

router.get("/:commentId", authToken, async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId)
    .populate("userId", "firstname lastname username email")
    .populate("blogId", "title status")
    .exec();
  if (comment) {
    if (
      comment.blogId.status === "public" ||
      comment.userId.username === req.user.usename
    ) {
      res.json(comment);
    } else {
      res.status(403).json({ message: "not authorized" });
    }
  } else {
    res.status(404).json({ message: "resource is not valid" });
  }
});

router.post("/:blogId", authToken, async (req, res, next) => {
  const blog = await Blog.findById(req.params.blogId).exec();
  if (!blog) {
    res.status(404).json({ message: "blogId is not found" });
  } else if (blog.status === "private") {
    res.status(403).json({ message: "not authorized" });
  } else {
    const comment = new Comment({
      content: req.body.content,
      userId: blog.userId,
      blogId: blog,
      timeCreated: Date.now(),
    });

    await comment.save();
    res.json({ message: "comment is created" });
  }
});

router.put("/:commentId", authToken, async (req, res, next) => {
    const comment=await Comment.findById(req.params.commentId).exec();
    if(!comment){
        res.status(404).json({message:"comment is not found"});
    }
    else if(comment.userId!==req.params.commentId){
        res.status(403).json({message:"not authorized"});
    }
    else{
        const newComment=new Comment({
            content: req.body.content,
            userId: comment.userId,
            blogId: comment.blogId,
            timeCreated: comment.timeCreated,
            _id:req.params.commentId
        });

        await Comment.findByIdAndUpdate(req.params.commentId,newComment,{});
        res.json(newComment);
    }
});

router.delete("/:commentId", authToken, async (req, res, next) => {
    const comment=await Comment.findById(req.params.commentId).exec();
    if(!comment){
        res.status(404).json({message:"comment is not found"});
    }
    else if(comment.userId!==req.user._id){
        res.status(403).json({message:"not authorized"});
    }
    else{
        await Comment.findByIdAndRemove(req.params.commentId).exec();
        res.status(204).json({message:"comment deleted successfully"})
    }
});

module.exports = router;
