import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SmartContractService {

  constructor() { }

  // Function to initialize and migrate smart contract to the blockchain.
  // We have assumed that smart-contract will be migrated manually using truffle by the admin.
  async migrateElectionContract(electionId: string, mnemonic: string, port: string, host:string){
    // API should accept election_id and return id, (candidateIds - name), (voterIds - public addresses), mnemonic, port, host
    // server api call to change state and description of election => uninitiazed to beforestart (string)
    // return string  ("Success") or throwError
  }

  // Function to add candidate for the election
  private addCandidatesForElection(){

  }

  // Function to make voters eligible for the election
  private makeVotersEligibleForElection(){

  }

  // To initialize the voting process.
  async initializeVotingProcess(electionId: string){
    // server api call to change state of election => beforestart to started (string)
    // return string  ("Success") or throwError
  }

  // To cast vote
  async castVote(candidateId: string){
    // return string ("Success") or throwError
  }

  // To finalize the voting process
  async finalizeVotingProcess(electionId: string){
    // return string  ("Success") or throwError
  }

  async getCandidateVoteCounts(electionId: string){
    // returns Candidate[]
  }

  async getWinningCandidates(electionId: string){
    // returns Candidate[]
  }

}
