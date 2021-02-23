const Election = require('../models/election.model')
const { request } = require('http');

/**Tested OK */
async function create(election){
    console.log(`ElectionController.Inserting`, election);
    var electionInstance = new Election(election)
    // make a mongoose db call to save election
    console.log(`Saving Election to DB : `, electionInstance);
    return await electionInstance.save();
}
/**Tested Ok */
async function update(electionId, election){
    /** updating election details*/
    //preventing creatorsId from updatating
    delete election.createdBy;
    delete election.voters;
    delete election.candidates;

    election.status = "modified";
    var oldElection = await Election.findByIdAndUpdate(electionId,election);
    const updatedElection = await Election.findById(oldElection._id);
    console.log(updatedElection, `  : in electionController.update `);
    return updatedElection;
}

/** Tested OK */
async function deleteElection(electionId){
    console.log(electionId, ` : : in electionController.deleteElection`);
    const deletedElection = await Election.findByIdAndRemove(electionId);
    return deletedElection;
}

/** Tested OK */
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

async function getAllElectionJoinedByVoter(voterId,state=""){
    if(state!=""){
        electionQuery = {"state":state,"voters":{$elemMatch:{"id":voterId}}}
    }
    else{
        electionQuery = {"voters":{$elemMatch:{"id":voterId}}}
    }
    let elections = await Election.find(electionQuery);
    if( elections ){
        return elections;
    }
    else{
        return null;
    }
}

async function joinElection(electionId, voterId,publicAddress){
    /** updating election details*/
    const election = await Election.findOne({"_id":electionId});
    msg = ""
    if(election && voterId && publicAddress){
        election.voters.push({id:voterId,publicAddress:publicAddress});
        election.save();
        msg = "Joined Election Successfully"
        return (election);
    }
    else if(election && voterId){
        msg = "failed to join Election, missing Public Key"
    }
    else if (election){
        msg = "failed to join Election, missing voter Details"
    }else{
        msg = "unable to find Election "
    }
    console.log("ERROR:",msg)
    return null;
}

async function joinElectionAsCandidate(electionId, candidateId,candidateName){
    /** updating election details*/
    console.log(electionId," candidateId: ",candidateId,"election.controller.js:joinElectionAsCandidate")
    const election = await Election.findOne({"_id":electionId});
    msg = ""
    if(election && candidateId && candidateName){
        election.candidates.push({id:candidateId,name:candidateName});
        election.save();
        msg = "Joined Election as Candidate Successfully";
        console.log(msg);
        return (election);
    }
    else if(election && candidateId){
        msg = "failed to join Election, missing Public Key";
    }
    else if (election){
        msg = "failed to join Election, missing voter Details";
    }else{
        msg = "unable to find Election ";
    }
    console.log("ERROR:",msg);
    return null;
}



async function changeElectionStatus(eAdminId,electionId, status){
    /** updating election details*/
    election = Election.findById(electionId)
    console.log(updatedElection, `  : in electionController.changeElectionStatus `);
    msg = ""
    if(election.createdBy == eAdminId && validTransition(election.status,status)){
        const updatedElection = await Election.findByIdAndUpdate(electionId,{status:status});
        if ( updatedElection){
            msg = "Status changed Successfully";
        }
        else{
            msg = "Error in changing election status";
        }
        
    }else{
        msg = "Unauthorized action to change Election status";
    }
    return msg;
}

function validTransition(currentStatus,nextStatus){
    /*Validate the transition of election status */
    return true;
}

module.exports = {
    create,
    update,
    deleteElection,
    getElectionById,
    getAllElectionCreatedByAdmin,
    getAllElectionJoinedByVoter,
    joinElection,
    changeElectionStatus,
    joinElectionAsCandidate
}