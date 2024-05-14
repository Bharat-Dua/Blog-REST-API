const express = require("express");
const bodyParser = require("body-parser");
const dotEnv = require("dotenv");

dotEnv.config();

// init app
const app = express();
app.use(express.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));

module.exports = app;
