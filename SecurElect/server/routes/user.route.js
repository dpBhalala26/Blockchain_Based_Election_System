const express = require("express");
const expressjs = require("../config/express");
const asyncHandler = require("express-async-handler");

const userControler = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");

const passport = require("../middleware/passport");
const app = require("../config/express");
const { request, response } = require("../config/express");

const router = express.Router();
/* Under Development */