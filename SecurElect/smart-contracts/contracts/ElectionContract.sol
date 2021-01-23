// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

/// @title SecurElect Election Smart Contract
contract ElectionContract {
    enum electionStatus {beforeStart, started, ended}
    electionStatus public currentElectionStatus;

    address public admin;

    // Structure definition of the candidate
    struct Candidate {
        uint256 candId;
        string name; // name of the candidate
        uint256 voteCount; // number of votes candidate has
    }

    // Array of candidates.
    // Array size is dynamic so that we can use the contract for different elcetions
    Candidate[] public candidates;
    uint256[] public winningCandidateIDs;

    // Structure definition of the voter
    struct Voter {
        bool eligible; // if true, then the person is eligible to vote
        bool voted; // if true, then the voter has already voted
    }

    // Mapping of addresses(public keys) and voters.
    // We can access elements of 'Voter' structure by the address of the voter
    mapping(address => Voter) public voters;

    // constructor of election contract
    // candidates names are taken dynamically so that we can use the contract for different elcetions
    constructor(uint256[] memory candidateIds, string[] memory candidateNames) {
        currentElectionStatus = electionStatus.beforeStart; // The has not started while generating the contract
        admin = msg.sender;
        voters[admin].eligible = true; // Admin can also vote in the election

        require(
            candidateIds.length == candidateNames.length,
            "ERROR : Arguments Invalid : Ids and Names arrays are not of same length"
        );
        // Adding objects of the candidates in the array from the givan names.
        for (uint256 i = 0; i < candidateNames.length; i++) {
            candidates.push(
                Candidate({
                    candId: candidateIds[i],
                    name: candidateNames[i],
                    voteCount: 0
                })
            );
        }
    }

    // Making the voter eligible to vote for the election
    function makeVoterEligible(address voterAddress) public {
        // Admin can make voter eligible only before the election is started
        require(
            currentElectionStatus == electionStatus.beforeStart,
            "ERROR : Cannot make a voter eligible after the election has started."
        );

        // Message sender must be admin because only admin can make a person eligible for voting
        require(
            msg.sender == admin,
            "ERROR : Admin is allowed to make a person eligible to vote."
        );
        // require(
        //     !voters[voterAddress].voted,
        //     "ERROR : This voter has voted in this election."
        // );
        // Redundancy commented
        require(
            !voters[voterAddress].eligible,
            "INFO : This person is already eligible to vote."
        );
        voters[voterAddress].eligible = true; // Making voter Eligible to vote
    }

    // Voting function
    function vote(uint256 candidateId) public {
        // Voter can only vote after the elction has started and before ended
        require(
            currentElectionStatus == electionStatus.started,
            "ERROR : Cannot vote before or after the election"
        );

        Voter storage voteSender = voters[msg.sender];
        require(
            voteSender.eligible,
            "ERROR : Person is not eligible to vote for the election"
        );
        require(
            !voteSender.voted,
            "ERROR : This voter has voted earlier in the election."
        );
        voteSender.voted = true; // Making sure that one voter only votes once.

        for (uint256 j = 0; j < candidates.length; j++) {
            if (candidateId == candidates[j].candId) {
                candidates[j].voteCount += 1;
                return;
            }
        }

        require(
            false,
            "ERROR : Invalid candidate Id entered while voting in the election"
        ); // Program reaches here only when invalid ID is entered.
    }

    // returning the candidate details of the winner.
    function getWinnerCandidateIDs()
        public
        view
        returns (uint256[] memory winnerCandidateIDs)
    {
        // Winner candidate can be get only when the election is ended.
        require(
            currentElectionStatus == electionStatus.ended,
            "ERROR : Cannot get winner candidate details before the election is ended."
        );

        winnerCandidateIDs = winningCandidateIDs;
    }

    // changing the status of election from 'beforeStart' to 'started'
    function initializeVotingProcess() public {
        // Message sender must be admin because only admin can initiate the voting process
        require(
            msg.sender == admin,
            "ERROR : Admin is allowed to initiate the voting process"
        );

        // Election must not be ended.
        require(
            currentElectionStatus != electionStatus.ended,
            "ERROR : The Elcetion can not be started again after it is ended."
        );
        currentElectionStatus = electionStatus.started;
    }

    // changing the status of election status from 'started' to 'ended'
    // Comparing the voteCount of canidates and setting the winner candidateId
    function finalizeVotingProcess() public {
        // Message sender must be admin because only admin can finalize the voting process
        require(
            msg.sender == admin,
            "ERROR : Admin is allowed to finalize the voting process"
        );

        require(
            currentElectionStatus == electionStatus.started,
            "ERROR : Election has not started yet."
        );
        currentElectionStatus = electionStatus.ended;

        //uint256 maxVoteCandIndex; // to track the index of maximum voted candidate
        uint256 maxVoteCount = 0; // to keep track of maximum votes so far

        // Finding the maximum votes and its candidate index
        for (uint256 k = 0; k < candidates.length; k++) {
            if (candidates[k].voteCount > maxVoteCount) {
                maxVoteCount = candidates[k].voteCount;
                //maxVoteCandIndex = k;
            }
        }

        require(
            maxVoteCount != 0,
            "ERROR : No voter has voted yet in the election so far."
        );

        //winningCandidateId = maxVoteCandIndex;

        // Loop is used to handle "TIE" condition between multiple candidates.
        // Adding candidate IDs to the winning list.
        for (uint256 l = 0; l < candidates.length; l++) {
            if (candidates[l].voteCount == maxVoteCount) {
                winningCandidateIDs.push(candidates[l].candId);
            }
        }
    }
}
