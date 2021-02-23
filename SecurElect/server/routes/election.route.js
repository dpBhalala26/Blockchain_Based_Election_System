const express = require("express");
const expressjs = require("../config/express");
const asyncHandler = require("express-async-handler");

const electionController = require("../controllers/election.controller");

const roleMW = require("../middleware/roleMW");

const passport = require("../middleware/passport");
const app = require("../config/express");
//const { request, response } = require("../config/express");

const router = express.Router();

/**  Routes for election */
/** Tested OK */
router.post(
  "",
  passport.authenticate("jwt", { session: false }),
  roleMW.validateRoleElectionAdmin,
  asyncHandler(createElection)
);
async function createElection(req, res) {
  const election = req.body;
  if (election == null) {
    req.json({ error: "No Content to create" });
  } else if (!election.startDate || !election.endDate) {
    req.json({ error: "Please Provide Election Date's" });
  } else if (election.startDate >= election.endDate) {
    req.json({ error: "Election Date's are inappropriate" });
  }
  election.status = "upcomming";
  election.createdBy = req.user._id;
  try{
    var createdElection = await electionController.create(election);
    res.json({ "response": createdElection });
  }
  catch(err){
    res.json({ "error": "couldnt add election in DB","details":err.message });
  }
}

/**Tested Ok */
router.put(
  "",
  passport.authenticate("jwt", { session: false }),
  roleMW.validateRoleElectionAdmin,
  asyncHandler(updateElection)
);

async function updateElection(req, res) {
  const election = req.body;
  const electionId = election._id//req.params["id"];
  if (election == null || electionId==null) {
    req.json({ error: "election_id missing" });
  } else if (election.startDate >= election.endDate) {
    req.json({ error: "Election Date's are inappropriate" });
  }
  else{
    var updatedElection = await electionController.update(electionId, election);
    res.json({ response: updatedElection });
  }
  
}

/**Tested Ok */
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  roleMW.validateRoleElectionAdmin,
  asyncHandler(deleteElection)
);

async function deleteElection(req, res) {
  const electionId = req.params["id"];
  if (!electionId) {
    req.json({ error: "Election Id required" });
  }
  var deletedElection = await electionController.deleteElection(electionId);
  res.json({ response: deletedElection });
}

/** Tested OK */
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(getElectionById)
);
async function getElectionById(req, res) {
  const electionId = req.params["id"];
  if (!electionId) {
    req.json({ error: "Election Id required" });
  } else {
    var election = await electionController.getElectionById(electionId);
    console.log(election)
    res.json({ response: election });
  }
}

/**Tested Ok */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  roleMW.decodeJwt,
  asyncHandler(getElections)
);

async function getElections(req, res) {
  console.log("user in getElection", req.user);
  console.log("params", req.query);
  switch(req.query["filter"]){
    case ("byElectionAdmin"):
      const eAdminId = req.user["_id"]; //req.params["eAdminId"];
      if (!eAdminId) {
        res.json({ error: "Election Admin Id required" });
      }
      else if (req.user.roles[0].name != "election-admin"){
        res.json({ error: "Unauthorized access" });
      }
       else {
        var elections = await electionController.getAllElectionCreatedByAdmin(
          eAdminId
        );
        res.json({ response: elections });
      }
      break;
    case("byVoter"):
      const voterId = req.user["_id"];
      if (!voterId) {
        req.json({ error: "voter Id required" });
      } else {
        var elections = await electionController.getAllElectionJoinedByVoter(voterId);
        res.json({ response: elections });
      }
      break;
    default:
      res.json({ message: "election list not found" });
  }
}

/**Tested Ok with a quick fix */
/**Issue Unable to get data in req.body, way around is to get electionId in route param */
router.post(
  "/join-election/:eid",
  passport.authenticate("jwt", { session: false }),
  roleMW.decodeJwt,
  asyncHandler(joinElection)
);


async function joinElection(req, res) {
  const electionId = req.params["eid"];//req.body["electionId"];
  
  const voterId = req.user._id
  var publicAddress = req.user.publicKeyAddress
  /**testing phase */
  if(!publicAddress){
    publicAddress="None";
  }
  console.log("TESTING",voterId,publicAddress);
  if (electionId == null) {
    res.json({ error: "No election Id found in request body" });
  } else if (!voterId || !publicAddress) {
    res.json({ error: "unable to get user details (debug: details from token)" });
  }
  else{
    var election = await electionController.joinElection(electionId,voterId,publicAddress);
    res.json({ response: election });
  }
}

router.post(
  "/candidate-join-election/:eid",
  passport.authenticate("jwt", { session: false }),
  roleMW.decodeJwt,
  asyncHandler(joinElectionAsCandidate)
);


async function joinElectionAsCandidate(req, res) {
  const electionId = req.params["eid"];//req.body["electionId"];
  
  const candidateId = req.user._id
  const candidateName = req.user.uname
  if (electionId == null) {
    res.json({ error: "No election Id found in request body" });
  } else if (!candidateId || !candidateName) {
    res.json({ error: "unable to get user details (debug: details from token)" });
  }
  else{
    var election = await electionController.joinElectionAsCandidate(electionId,candidateId,candidateName);
    res.json({ response: election });
  }
}



router.put(
  "/change-election-status",
  passport.authenticate("jwt", { session: false }),
  roleMW.validateRoleElectionAdmin,
  asyncHandler(changeElectionStatus)
);
async function changeElectionStatus(req, res) {
  const electionId = req.body["electionId"];
  const newStatus =  req.body["status"];
  const eAdminId = req.user._id
  if (electionId == null) {
    req.json({ error: "No election Id found" });
  } else if (!eAdminId || !newStatus) {
    req.json({ error: "insufficient details" });
  }
  else{
    var msg = await electionController.changeElectionStatus(eAdminId,electionId,newStatus);
    res.json({ response: msg });
  }
}

module.exports = router;
