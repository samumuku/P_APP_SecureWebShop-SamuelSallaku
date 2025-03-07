const express = require("express");

const userRouter = express.Router();

userRouter.post("/:username", (req, res) => {
  res.render("users");
});

userRouter.get("/:username", (req, res) => {
  res.render("users");
});

module.exports = userRouter;
