const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { request } = require('http');
const bcryptSalt = 15
async function user_insert(user){
    console.log(`Bcrypting the password`, user);
    user.hashedPwd = bcrypt.hashSync(user.pwd, bcryptSalt);
    delete user.pwd;
    var userInstance = new User(user)
    // make a mongoose db call to save user
    console.log(`Saving User to DB : `, userInstance);
    return await userInstance.save();
}

async function user_update(userId, user){
    /** cannot update email and role  */

    // user.hashedPwd = bcrypt.hashSync(user.pwd, bcryptSalt);
    // delete user.pwd;
    
    //preventing email to update
    delete user.email;
    user.status = "modified";
    const updUser = await User.findByIdAndUpdate(userId,user);
    delete updUser.hashedPwd;
    console.log(updUser, `  : in user2_update of user controller`);
    return updUser;
    //const user1 = await user_read_email_pwd(user2.email, user2.pwd);
    //console.log(user1, `  : in user_update of user controller`);
    //delete user.pwd
}

async function verifyAndGetUserByCredentials(email, pwd){
    let user = await User.findOne({email:email});
    console.log(email)
    console.log(user)
    if( isUserValid( user, pwd, user.hashedPwd ) ){
        user = user.toObject();
        delete user.hashedPwd;
        console.log(`In userController.verifyAndGetUserByCredentials :: USER : `,user)
        return user;
    }
    else{
        console.log('In userController.verifyAndGetUserByCredentials :: Returned null :: Invalid credentials')
        return null;
    }
}

function isUserValid( user, pwd, hashedPwd ){
    return user && bcrypt.compareSync( pwd, hashedPwd);
}

async function get_user_by_email(email){
    
    let user = await User.findOne({email});
    console.log(`In userController.get_user_by_email :: USER : `,user);
    delete user.hashedPwd;
    return user;
}

async function delete_user(userId){
    console.log(userId, ` : : in delete_user of user controller`);
    const delUser = await User.findByIdAndRemove(userId);
    return delUser;
}

async function getUserByID(id){
    let user = await User.findById(id);
    if( user ){
        user = user.toObject();
        delete user.hashedPwd;
        return user;
    }
    else{
        return null;
    }
}



async function getAllPendingUsers(){
    let user_list = await User.find({$or:[{"status":"pending"},{"status":"modified"}]});
    if( user_list ){
        user_list.forEach(user => {
            //user = user.toObject();
            user.hashedPwd=undefined
            //delete user.hashedPwd;
            //console.log(user)
        });
        console.log(user_list)
        return user_list;
    }
    else{
        return null;
    }
}

async function setUserVerified(userId){
    /*Check before changing */
    usr = await User.findById(userId)
    console.log(usr)
    if(usr.status == "pending" || usr.status == "modified" ){
        const updUser = await User.findByIdAndUpdate( userId, {
            status:"verified",
            statusIssueMessage:"Verified User"
        }, {new: true});
        console.log(updUser, `  : 2 in setUserVerified of user controller`);
        return "status updated";
    }else{
        return "invalid request";
    }   
}

async function setUserUnVerifiable(userId,statusIssueMsg){
    usr = await User.findById(userId)
    //console.log(userId,statusIssueMessage)
    if(usr.status == "pending" || usr.status == "modified"){
        const updUser = await User.findByIdAndUpdate( userId, {
            status:"unverifiable",
            statusIssueMessage:statusIssueMsg
        }, {new: true});
        console.log(updUser, `  : 2 in setUserUnVerifiable of user controller`);
        return "status updated";
    }else{
        return "invalid request";
    }
}
module.exports = {
    user_insert,
    verifyAndGetUserByCredentials,
    getUserByID,
    user_update,
    get_user_by_email,
    delete_user,
    getAllPendingUsers,
    setUserVerified,
    setUserUnVerifiable
};
