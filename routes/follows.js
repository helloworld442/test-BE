const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth-middleware.js");

const {
  getFollow,
  createFollow,
} = require("../controllers/follow-controller.js");

const Follow = require("../schemas/follow.js");

router.get("/", authMiddleware, getFollow);

router.post("/:followingName/:followingId", authMiddleware, createFollow);

module.exports = router;
