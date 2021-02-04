const Election = require('../models/election.model')
const { request } = require('http');

async function create(election){
    console.log(`ElectionController.Inserting`, election);
    var electionInstance = new Election(election)
    // make a mongoose db call to save election
    console.log(`Saving Election to DB : `, electionInstance);
    return await electionInstance.save();
}

async function update(electionId, election){
    /** cannot update email and role  */
    //preventing creatorsId from updatating
    delete election.createdBy;
    election.status = "modified";
    const updatedElection = await Election.findByIdAndUpdate(electionId,election);
    console.log(updatedElection, `  : in electionController.update `);
    return updatedElection;
}

async function deleteElection(electionId){
    console.log(electionId, ` : : in electionController.deleteElection`);
    const deletedElection = await Election.findByIdAndRemove(electionId);
    return deletedElection;
}

async function getElectionById(id){
    let election = await Election.findById(id);
    if( election ){
        election = election.toObject();
        return election;
    }
    else{
        return null;
    }
}

async function getAllElectionCreatedByAdmin(adminId,state=""){
    if(state!=""){
        electionQuery = {"createdBy":adminId,"state":state}
    }
    else{
        electionQuery = {"createdBy":adminId}
    }
    let elections = await Election.find(electionQuery);
    if( elections ){
        
        return elections;
    }
    else{
        return null;
    }
}


module.exports = {
    create,
    update,
    deleteElection,
    getElectionById,
    getAllElectionCreatedByAdmin
}