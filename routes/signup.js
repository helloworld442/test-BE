const express = require("express");
const router = express.Router();

const { createUser } = require("../controllers/auth-controller");

router.post("/", createUser);

module.exports = router;
