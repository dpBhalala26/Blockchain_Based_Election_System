const express = require("express");
const expressjs = require("../config/express");
const asyncHandler = require("express-async-handler");

const userControler = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");

const passport = require("../middleware/passport");
const app = require("../config/express");
const { request, response } = require("../config/express");

const router = express.Router();

router.post("/register", asyncHandler(user_insert), login);
// localhost:xxxx/api/auth/register
async function user_insert(req, res, next) {
  const user = req.body;
  console.log(`registering user :: `, user);
  req.user = await userControler.user_insert(user);
  next();
}

//router.post('/login', passport.authenticate('local', {session: false}), login);
router.post("/login", asyncHandler(user_read_email_pwd), login);
router.post("/old_pwd_validate", asyncHandler(user_read_email_pwd), sendUser);
// localhost:xxxx/api/auth/login
async function user_read_email_pwd(req, res, next) {
  const user = req.body;
  console.log(`Verifying the in user :: `, user);
  req.user = await userControler.user_read_email_pwd(user.email, user.pwd);
  next();
}

router.get("/getuser/:email", asyncHandler(get_user_by_email), sendUser);
async function get_user_by_email(req, res, next) {
  const reqEmail = req.params.email;
  console.log(`Verifying the in user in getUser :: `, reqEmail);
  req.user = await userControler.get_user_by_email(reqEmail);
  //const retuser = req.user;
  //res.json(retuser);
  next();
}

router.put("/update/:email", asyncHandler(update_the_user), login);
async function update_the_user(req, res, next) {
  const user = req.body;
  const oldUser = await userControler.get_user_by_email(req.params.email);
  console.log(
    `Verifying the in user :: `,
    user,
    `   and ID is :: `,
    oldUser._id
  );
  req.user = await userControler.user_update(oldUser._id, user);
  console.log(user, `  :: `);
  next();
}

router.delete("/delete/:email", asyncHandler(delete_the_user), sendUser);
async function delete_the_user(req, res, next) {
  const oldUser = await userControler.get_user_by_email(req.params.email);
  console.log(
    `Verifying the in user :: `,
    oldUser,
    `   and ID is :: `,
    oldUser._id
  );
  req.user = await userControler.delete_user(oldUser._id);
  next();
}

function login(req, res) {
  // throw new Error('Self generated error from self');
  const user = req.user;
  const token = authController.generateToken(user);
  console.log(user, token);
  if (user == null || token == null) {
    throw new Error("Error from login func in auth.route.js");
  }
  res.json({ user, token });
}

function sendUser(req, res) {
  const user = req.user;
  console.log(user, ` :: In sendUser() :::::::::::::::::::::::::::::::::::::::::::::: `);
  const token = null;
  if (user == null) {
    throw new Error("Error from login func in auth.route.js");
  }
  res.json({ user, token });
}
/*
router.post('/login', (req, res) => {
    passport.authenticate('local', function (err, user, info) {     
        console.log(user); 
        if (err) {
            return res.status(401).json(err);
        }
        if (user) {
            const token = authController.generateToken(user);
            return res.status(200).json({
                "token": token
            });
        } else {
            res.status(401).json(info);
        }
    })(req, res)
});*/

function test(req, res, next) {
  console.log(req.user);
}

router.get("/findJWT", passport.authenticate("jwt", { session: false }), login);

module.exports = router;