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
  var createdElction = await electionController.create(election);
  res.json({ response: createElection });
}

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  roleMW.validateRoleElectionAdmin,
  asyncHandler(updateElection)
);

async function updateElection(req, res) {
  const election = req.body;
  const electionId = req.params["id"];
  if (election == null) {
    req.json({ error: "No Content to create" });
  } else if (!election.startDate || !election.endDate) {
    req.json({ error: "Please Provide Election Date's" });
  } else if (election.startDate >= election.endDate) {
    req.json({ error: "Election Date's are inappropriate" });
  }
  else{
    var updatedElection = await electionController.update(electionId, election);
    res.json({ response: updatedElection });
  }
  
}

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

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  roleMW.validateRoleElectionAdmin,
  asyncHandler(getElections)
);

async function getElections(req, res) {
  console.log("user in getElection", req.user);
  console.log("params", req.query);
  switch(req.query["filter"]){
    case ("byElectionAdmin"):
      const eAdminId = req.user["_id"]; //req.params["eAdminId"];
      if (!eAdminId) {
        req.json({ error: "Election Admin Id required" });
      } else {
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


router.post(
  "/join-election",
  passport.authenticate("jwt", { session: false }),
  roleMW.decodeJwt,
  asyncHandler(joinElection)
);
async function joinElection(req, res) {
  
  const electionId = req.body["electionId"];
  const voterId = req.user._id
  const publicAddress = req.user.publicKeyAddress
  if (electionId == null) {
    req.json({ error: "No election Id found" });
  } else if (!voterID || !publicAddress) {
    req.json({ error: "unable to get user details (debug: details from token)" });
  }
  else{
    var election = await electionController.joinElection(electionId,voterId,publicAddress);
    res.json({ response: election });
  }
}

router.post(
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
