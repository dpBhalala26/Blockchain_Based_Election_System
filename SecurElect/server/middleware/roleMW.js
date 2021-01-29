const User = require('../models/user.model');
const authController = require("../controllers/auth.controller");

async function validateRoleSystemAdmin(req,res,next){
    
    var authHeader = req.headers["authorization"];
    var jwt_token = undefined;
    //console.log("authHeader ",req.headers["authorization"].split(" "))
    if(authHeader){
        jwt_token = authHeader.split(" ")[1];
        //console.log("jwt token : ",jwt_token)
        user = authController.decodeToken(jwt_token);
        
        //console.log("user : ",user.roles[0].name)
        if(user && user.roles[0].name=="system-admin"){
            req.user = user
            next()
        }
        else{
            res.json({"response":"you are not authorised"})    
        }
        
    }
    else{
        res.json({"response":"Unauthorised action"})
    }
    
  }


async function validateRoleElectionAdmin(req,res,next){

    var authHeader = req.headers["authorization"];
    var jwt_token = undefined;
    //console.log("authHeader ",req.headers["authorization"].split(" "))
    if(authHeader){
        jwt_token = authHeader.split(" ")[1];
        //console.log("jwt token : ",jwt_token)
        user = authController.decodeToken(jwt_token);
        
        //console.log("user : ",user.roles[0].name)
        if(user && user.roles[0].name=="election-admin"){
            req.user = user
            next()
        }
        else{
            res.json({"response":"you are not authorised"})    
        }
        
    }
    else{
        res.json({"response":"Unauthorised action"})
    }
    
}


async function decodeJwt(req,res,next){

    var authHeader = req.headers["authorization"];
    var jwt_token = undefined;
    //console.log("authHeader ",req.headers["authorization"].split(" "))
    if(authHeader){
        jwt_token = authHeader.split(" ")[1];
        //console.log("jwt token : ",jwt_token)
        user = authController.decodeToken(jwt_token);
        
        //console.log("user : ",user.roles[0].name)
        req.user = user;
        next();
    }
    else{
        res.json({"response":"Unauthorised action"})
    }
}

  

module.exports = {
    validateRoleSystemAdmin,
    validateRoleElectionAdmin,
    decodeJwt
};