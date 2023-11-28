const express = require("express");
const router = express.Router();

const dotenv = require("dotenv");
dotenv.config();

const { checkUser } = require("../controllers/auth-controller.js");

router.post("/", checkUser);

module.exports = router;
