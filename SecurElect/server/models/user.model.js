const mongoose = require('mongoose');
const { stringifyConfiguration } = require('tslint/lib/configuration');
const userSchema = new mongoose.Schema({
    uname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email address.']
    },
    hashedPwd: {
        type: String,
        required: true
    },
    createDate:{
        type: Date,
        default: Date.now
    },
    address:{
        type: String,
        required: true
    },
    publicKeyAddress:{
        type: String
    },
    publicKey:{
        type: String
    },
    status:{
        type: String,
        required: true
    },
    statusIssueMessage:{
        type: String
    },
    
    roles:[
        {
            name :String,
            refKey : String
        }]
    ,
    versionKey: false
});
module.exports = mongoose.model( 'User', userSchema );