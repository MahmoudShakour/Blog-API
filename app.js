require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(express.urlencoded());

const user_router = require("./routes/user_router");
const blog_router=require("./routes/blog_router");
const comment_router=require("./routes/comment_router");
const like_router=require("./routes/like_router");


const mongoDb =
  "mongodb+srv://admin:admin@cluster0.xqz01ir.mongodb.net/blog?retryWrites=true&w=majority";
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

app.use("/user", user_router);
app.use("/blog",blog_router);
app.use("/comment",comment_router);
app.use("/comment",like_router);
app.listen(3000, () => console.log("running on port 3000"));
