const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");
const { signupValidate } = require("../validator/auth");
const validate = require("../validator/validate");
router.post("/signup", signupValidate, validate, authController.signup);
module.exports = router;
