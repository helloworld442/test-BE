const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth-middleware.js");

const { getUser, getUsers } = require("../controllers/user-controller");

router.get("/userList", authMiddleware, getUsers);

router.get("/userProfile", authMiddleware, getUser);

module.exports = router;
