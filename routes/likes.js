const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth-middleware.js");

const { getLikes, createLikes } = require("../controllers/like-controller.js");

router.get("/:postId", authMiddleware, getLikes);

router.post("/:postId", authMiddleware, createLikes);

module.exports = router;
