// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

/// @title SecurElect Election Smart Contract
contract ElectionContract {
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
        admin = msg.sender;
        voters[admin].eligible = true;

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
        // Message sender must be admin because only admin can make a person eligible for voting
        require(
            msg.sender == admin,
            "ERROR : Admin is allowed to make a person eligible to vote."
        );
        require(
            !voters[voterAddress].voted,
            "ERROR : This voter has voted in this election."
        );
        require(
            !voters[voterAddress].eligible,
            "INFO : This person is already eligible to vote."
        );
        voters[voterAddress].eligible = true; // Making voter Eligible to vote
    }

    // Voting function
    function vote(uint256 candidateId) public {
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

    // Comparing the voteCount of canidates and returning the winner candidate
    function getWinnerCandidate()
        public
        view
        returns (Candidate memory winnerCandidate)
    {
        uint256 maxVoteCandIndex; // to track the index of maximum voted candidate
        uint256 maxVoteCount = 0; // to keep track of maximum votes so far

        // Finding the maximum votes and its candidate index
        for (uint256 k = 0; k < candidates.length; k++) {
            if (candidates[k].voteCount > maxVoteCount) {
                maxVoteCount = candidates[k].voteCount;
                maxVoteCandIndex = k;
            }
        }

        require(
            maxVoteCount != 0,
            "ERROR : No voter has voted yet in the election so far."
        );
        winnerCandidate = candidates[maxVoteCandIndex];
    }
}
