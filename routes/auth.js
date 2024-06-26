const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");
const {
  signupValidator,
  signinValidator,
  emailValidator,
  verifyUserValidator,
  recoverPasswordValidator,
} = require("../validator/auth");
const validate = require("../validator/validate");
const isAuth = require("../middlewares/isAuth");

router.post("/signup", signupValidator, validate, authController.signup);
router.post("/signin", signinValidator, validate, authController.signin);
router.post(
  "/send-verification-email",
  emailValidator,
  validate,
  authController.verifyCode
);
router.post(
  "/verify-user",
  verifyUserValidator,
  validate,
  authController.verifyUser
);
router.post(
  "/forgot-password-code",
  emailValidator,
  validate,
  authController.forgotPasswordCode
);

router.post(
  "/recover-password",
  recoverPasswordValidator,
  validate,
  authController.recoverPassword
);

router.put("/change-password",isAuth,authController.changePassword)
module.exports = router;
