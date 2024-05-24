const { check } = require("express-validator");

const signupValidate = [
  check("name").notEmpty().withMessage("Name is required"),
  check("email")
    .isEmail()
    .withMessage("Email is required")
    .notEmpty()
    .withMessage("Email is required"),

  check("password")
    .isLength({ min: 6 })
    .withMessage("Password should be 6 char long")
    .notEmpty()
    .withMessage("Password is required"),
];

const signinValidate = [
  check("email")
    .isEmail()
    .withMessage("Invalid Email")
    .notEmpty()
    .withMessage("Email is required"),

  check("password").notEmpty().withMessage("Password is required"),
];
module.exports = { signupValidate, signinValidate };

