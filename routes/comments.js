const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth-middleware");

const {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/comment-controller");

router.get("/:postId", getComments);

router.post("/:postId", authMiddleware, createComment);

router.put("/:postId/:commentId", authMiddleware, updateComment);

router.delete("/:postId/:commentId", authMiddleware, deleteComment);

module.exports = router;
