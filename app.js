const express = require("express");
const bodyParser = require("body-parser");
const dotEnv = require("dotenv");
dotEnv.config();

const connectMongodb = require("./init/mongodb");
// init app
const app = express();

// connect database

connectMongodb();
app.use(express.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));

module.exports = app;
