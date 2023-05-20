const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const authUser = require("../middlewares/authUser");
const jwt = require("jsonwebtoken");
const authToken = require("../middlewares/authToken");

router.post("/sign-up", async (req, res, next) => {
  const isUserFound = await User.find({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  }).exec();
  if (isUserFound.length) {
    res.status(403).json({ message: "username or email is taken" });
  } else {
    console.log(req.body);
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        res.json("error has occured");
      } else {
        const newUser = new User({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: hashedPassword,
          username: req.body.username,
          role: "user",
          timeCreated: Date.now(),
        });
        await newUser.save();
        res.status("201").json({ message: "user is created successfully" });
      }
    });
  }
});

router.post("/sign-in", authUser, async (req, res, next) => {
  const accessToken = jwt.sign(req.user, process.env.TOKEN_SECRET);
  res.json({ accessToken });
});

router.get("/list", authToken, async (req, res, next) => {
  if (req.user.role === "admin") {
    const users = await User.find({}).exec();
    res.json(users);
  } else {
    res.status(403).json({ message: "not authorized" });
  }
});

router.get("/:username", authToken, async (req, res, next) => {
  let data = "firstname lastname username";
  if (req.params.username === req.user.username) {
    data += " email date";
  }
  const user = await User.findOne(
    { username: req.params.username },
    data
  ).exec();
  res.json(user);
});

router.put("/:username", authToken, async (req, res, next) => {
  const user = await User.find({ username: req.params.username });
  if (req.params.username !== req.user.username) {
    res.status(403).json({ message: "not authorized" });
  } else if (!user) {
    res.status(404).json({ message: "no such username" });
  } else {
    const newUser = new User({
      firstname: req.body.firstname || req.user.firstname,
      lastname: req.body.lastname || req.user.lastname,
      email: req.body.email || req.user.email,
      username: req.user.username,
      password: req.user.password,
      role: req.user.role,
      _id: req.user._id,
      timeCreated:req.user.timeCreated
    });
    await User.findByIdAndUpdate(req.user._id, newUser, {}).exec();
    res.json(newUser);
  }
});

module.exports = router;
