const express = require("express");
const path = require("path");
const config = require("./config");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const routes = require("../routes");
const { static } = require("express");
const passport = require("../middleware/passport");
const HttpError = require("http-errors");

// get app
const app = express();

// logger
if (config.env == "development") {
  app.use(logger("dev"));
}

// get dist folder
const disDir = path.join(__dirname, "../../dist/SecurElect");

// use dist folder as the hosting folder by express
app.use(express.static(disDir));

// parsing from API
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// secure app http
app.use(helmet());

// allow cors
app.use(cors());

// authenticate and intercept
app.use(passport.initialize());

// api router
// localhost:4200/api
app.use("/api/", routes);

// serve the 'index.html' file
app.get("/", (req, res) => res.sendFile(path.join(disDir, "index.html")));

// Handling 404 HTTP-Error
app.use((req, res, next) => {
  const err = new HttpError(404);
  return next(err);
});

// Error - Handler to trace the stack
app.use((err, req, res, next) => {
    res.status( err.status || 500 ).json({
        message: err.message
    });
    next(err);
}); 

module.exports = app;
