const express = require("express");
const authToken = require("../middlewares/authToken");
const router = express.Router();
const Blog = require("../models/Blog");

router.get("/list", authToken, async (req, res, next) => {
  const allBlogs = await Blog.find({ status: "public" })
    .populate("userId", "firstname lastname email username")
    .exec();
  res.json(allBlogs);
});

router.get("/:blogId", authToken, async (req, res, next) => {
  const blog = await Blog.findById(req.params.blogId)
    .populate("userId", "firstname lastname email username")
    .exec();
  if (!blog) {
    res.status(404).json({ message: "resource is not found" });
  } else {
    if (blog.status === "public" || req.user._id === blog.userId) {
      res.json(blog);
    } else {
      res.status(403).json({ message: "not authorized" });
    }
  }
});

router.post("/", authToken, async (req, res, next) => {
  const blog = new Blog({
    content: req.body.content,
    title: req.body.title,
    status: req.body.status,
    userId: req.user,
    timeCreated: Date.now(),
  });

  await blog.save();
  res.json(blog);
});

router.put("/:blogId", authToken, async (req, res, next) => {
  const blog = await Blog.findById(req.params.blogId).exec();
  // console.log(req.user);
  // console.log(String(blog.userId));
  console.log(req.user._id === String(blog.userId));
  if (!blog) {
    res.status(404).json({ message: "resource is not found" });
  } else {
    if (String(req.user._id) !== String(blog.userId)) {
      res.status(403).json({ message: "not authorized" });
    } else {
      const newBlog = new Blog({
        content: req.body.content || blog.content,
        title: req.body.title || blog.title,
        status: req.body.status || blog.status,
        userId: blog.userId,
        timeCreated: Date.now(),
        _id: blog._id,
      });
      console.log(newBlog);
      await Blog.findByIdAndUpdate(blog._id, newBlog, {}).exec();
      res.json(newBlog);
    }
  }
});

router.delete("/:blogId", authToken, async (req, res, next) => {
  const blog = await Blog.findById(req.params.blogId).exec();
  if (!blog) {
    res.status(404).json({ message: "resource is not found" });
  } else {
    if (req.user._id !== blog.userId) {
      res.status(403).json({ message: "not authorized" });
    } else {
      await Blog.findByIdAndRemove(blog._id);
    }
  }
});

module.exports = router;
