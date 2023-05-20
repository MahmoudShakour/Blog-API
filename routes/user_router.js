const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/sign-up", async (req, res, next) => {
  // res.status(201).json({message:});
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
          date: new Date(),
          role: "user",
        });
        await newUser.save();
        res.status("201").json({ message: "user is created successfully" });
      }
    });
  }
});

module.exports = router;
