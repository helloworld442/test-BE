const express = require("express");
const router = express.Router();

const userRouter = require("./users.js");
const postRouter = require("./posts.js");
const likeRouter = require("./likes.js");
const signinRouter = require("./signin.js");
const signupRouter = require("./signup.js");
const followRouter = require("./follows.js");
const commentRouter = require("./comments.js");

router.use("/users", userRouter);
router.use("/posts", postRouter);
router.use("/likes", likeRouter);
router.use("/signin", signinRouter);
router.use("/signup", signupRouter);
router.use("/follow", followRouter);
router.use("/comments", commentRouter);

module.exports = router;
