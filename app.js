require("dotenv").config();
const express = require("express");
const mongoose=require("mongoose");

const mongoDb = "mongodb+srv://admin:admin@cluster0.xqz01ir.mongodb.net/blog?retryWrites=true&w=majority";
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));



const app = express();
app.use(express.json());

app.get("/sign-up", (req, res, next) => {
    res.json({ messge: "hi" });
});

app.listen(3000, () => console.log("running on port 3000"));
