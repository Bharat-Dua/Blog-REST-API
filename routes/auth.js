const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");
const {
  signupValidator,
  signinValidator,
  emailValidator,
} = require("../validator/auth");
const validate = require("../validator/validate");
router.post("/signup", signupValidator, validate, authController.signup);
router.post("/signin", signinValidator, validate, authController.signin);
router.post(
  "/send-verification-email",
  emailValidator,
  validate,
  authController.verifyCode
);
module.exports = router;
