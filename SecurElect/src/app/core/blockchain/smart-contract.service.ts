import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service';

declare let require: any;
const electionArtifacts = require('../../../../build/contracts/ElectionContract.json');

@Injectable({
  providedIn: 'root',
})
export class SmartContractService {
  electionContract: any;
  constructor(private web3Service: Web3Service) {
    console.log(
      'In smart-contract service constructor: Web3Service is=' + web3Service
    );
    console.log('OnInit: ' + this.web3Service);
    console.log(this);
    // watch current account
    this.web3Service
      .convertArtifactsToContract(electionArtifacts)
      .then((absContract) => {
        this.electionContract = absContract;
        this.electionContract.deployed().then((deployed) => {
          console.log(
            'OnInit: election contract deployed successfully.' + deployed
          );
        });
      });
  }

  // Function to initialize and migrate smart contract to the blockchain.
  // We have assumed that smart-contract will be migrated manually using truffle by the admin.
  async migrateElectionContract(
    electionId: string,
    mnemonic: string,
    port: string,
    host: string
  ) {
    // API should accept election_id and return id, (candidateIds - name), (voterIds - public addresses), mnemonic, port, host
    // server api call to change state and description of election => uninitiazed to beforestart (string)
    // return string  ("Success") or throwError
  }

  // Function to add candidate for the election
  private addCandidatesForElection() {}

  // Function to make voters eligible for the election
  private makeVotersEligibleForElection() {}

  // To initialize the voting process.
  async initializeVotingProcess(electionId: string) {
    // server api call to change state of election => beforestart to started (string)
    // return string  ("Success") or throwError
  }

  // To cast vote
  async castVote(candidateId: string) {
    // return string ("Success") or throwError
  }

  // To finalize the voting process
  async finalizeVotingProcess(electionId: string) {
    // return string  ("Success") or throwError
  }

  async getCandidateVoteCounts(electionId: string) {
    // returns Candidate[]
  }

  async getWinningCandidates(electionId: string) {
    // returns Candidate[]
  }
}
