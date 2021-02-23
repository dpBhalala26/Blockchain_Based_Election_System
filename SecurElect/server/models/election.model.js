const mongoose = require('mongoose');
const { stringifyConfiguration } = require('tslint/lib/configuration');
const electionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate:{
        type: Date,
        required:true
    },
    endDate:{
        type: String,
        required: true
    },
    createdBy:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    voters:[{
        id:String,
        publicAddress:String
    }],
    candidates:[{
        id: String,
        name:String
    }],
    deploymentPost:{
        type: String
    },
    deploymentLocation:{
        type: String
    },
    contractMnemonics:{
        type: String
    },
    
    versionKey: false
});
module.exports = mongoose.model('Election', electionSchema );