const express = require("express");
const expressjs = require("../config/express");
const asyncHandler = require("express-async-handler");

const userControler = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const roleMW = require("../middleware/roleMW");

const passport = require("../middleware/passport");
const app = require("../config/express");
//const { request, response } = require("../config/express");

const router = express.Router();

function login(req, res) {
  // throw new Error('Self generated error from self');
  console.log("Inside login")
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
    throw new Error("Error from auth.route.js: sendUser() :: User Not valid");
  }
  res.json({ user, token });
}

router.post("/register", asyncHandler(user_insert), login);
// localhost:****/api/auth/register
async function user_insert(req, res, next) {
  const user = req.body;
  console.log(`auth.route.js: register() :: `, user);
  if( user.role!=null && !userControler.isRoleRefKeyValid(user.roles[0])){
    console.log(`registeration error :: invalid Role Referance Key `, user);
    res.json({"error":"invalid Role Referance Key"})
  }
  req.user = await userControler.user_insert(user);
  next();
}
// localhost:****/api/auth/login
router.post("/login", asyncHandler(verifyAndGetUserByCredentials), login);
router.post("/old_pwd_validate", asyncHandler(verifyAndGetUserByCredentials), sendUser);

async function verifyAndGetUserByCredentials(req, res, next) {
  const user = req.body;
  console.log(`Verifying the in user :: `, user);
  req.user = await userControler.verifyAndGetUserByCredentials(user.email, user.pwd);
  next();
}

router.get("/findJWT", passport.authenticate("jwt", { session: false }), login);

router.get("/getuser/:email", asyncHandler(get_user_by_email), sendUser);
async function get_user_by_email(req, res, next) {
  const reqEmail = req.params.email;
  console.log(`Verifying the in user in getUser :: `, reqEmail);
  req.user = await userControler.get_user_by_email(reqEmail);
  next();
}

router.put("/update/:email",passport.authenticate("jwt", { session: false }), asyncHandler(updateUser), login);
async function updateUser(req, res, next) {
  const user = req.body;
  const oldUser = await userControler.verifyAndGetUserByCredentials(req.params.email,user.pwd);
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

function test(req, res, next) {
  console.log(req.user);
}

router.get("/pendingUsers", passport.authenticate("jwt", { session: false }),getAllPendingUsers);
async function getAllPendingUsers(req,res){
  var user_list = await userControler.getAllPendingUsers()
  res.json({"response":user_list});
}

router.get("/user/:userId",passport.authenticate("jwt", { session: false }),roleMW.validateRoleSystemAdmin, asyncHandler(getUserById), sendUser);
async function getUserById(req, res, next) {
  const userId = req.params["userId"];
  console.log(`Verifying the in user in getUser :: `, userId);
  req.user = await userControler.getUserByID(userId);
  next();
}

//setUserVerified
router.patch("/setUserVerified/:userId", passport.authenticate("jwt", { session: false }),roleMW.validateRoleSystemAdmin ,setUserVerified);
async function setUserVerified(req,res){
  var userId = req.params["userId"]
  var message = await userControler.setUserVerified(userId)
  if(message && !message.error){
    /* Use different responses according to error scenario */
  }
  res.json({"response":message});
}

//Admin unable to verify user and suggests modification if information not valid
router.post("/setUserUnVerifiable/:userId",passport.authenticate("jwt", { session: false }),roleMW.validateRoleSystemAdmin , asyncHandler(setUserUnVerifiable));
async function setUserUnVerifiable(req, res) {
  var userId = req.params["userId"]
  var statusIssueMessage = req.body.statusIssueMessage
  response_msg = await userControler.setUserUnVerifiable(userId,statusIssueMessage);
  res.json({"response":response_msg});
}

module.exports = router;