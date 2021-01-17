const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { request } = require('http');
const bcryptSalt = 15
async function user_insert(user){
    
    console.log(`Bcrypting the password`, user);
    user.hashedPwd = bcrypt.hashSync(user.pwd, bcryptSalt);
    delete user.pwd;

    // make a mongoose db call to save user
    console.log(`Saving User to DB : `, user);
    return await new User(user).save();

}

async function user_update(userId, user){

    //console.log(user, `  : in user_update of user controller`);
    user.hashedPwd = bcrypt.hashSync(user.pwd, 15);
    delete user.pwd;
    //console.log(user, `  : in user_update of user controller`);
    const updUser = await User.findByIdAndUpdate( userId, {
        address: user.address,
        uname: user.uname,
        hashedPwd: user.hashedPwd
    }, {new: true});
    console.log(updUser, `  : 2 in user2_update of user controller`);
    return updUser;
    //const user1 = await user_read_email_pwd(user2.email, user2.pwd);
    //console.log(user1, `  : in user_update of user controller`);
    //delete user.pwd
}

async function user_read_email_pwd(email, pwd){
    let user = await User.findOne({email});
    if( isUserValid( user, pwd, user.hashedPwd ) ){
        user = user.toObject();
        delete user.hashedPwd;
        console.log(`In userController.user_read_email_pwd :: USER : `,user)
        return user;
    }
    else{
        console.log('In userController.user_read_email_pwd :: Returned null')
        return null;
    }
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


function isUserValid( user, pwd, hashedPwd ){
    return user && bcrypt.compareSync( pwd, hashedPwd);
}

module.exports = {
    user_insert,
    user_read_email_pwd,
    getUserByID,
    user_update,
    get_user_by_email,
    delete_user
};