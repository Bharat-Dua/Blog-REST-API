const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");
const { signupValidate, signinValidate } = require("../validator/auth");
const validate = require("../validator/validate");
router.post("/signup", signupValidate, validate, authController.signup);
router.post("/signin", signinValidate, validate, authController.signin);
module.exports = router;
