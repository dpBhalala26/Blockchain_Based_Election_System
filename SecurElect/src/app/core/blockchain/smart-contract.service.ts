import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Candidate } from '../candidate';
import { Election } from '../election';
import { ElectionService } from '../elections/election.service';
import { Web3Service } from './web3.service';

declare let require: any;
const electionArtifacts = require('../../../../build/contracts/ElectionContract.json');

@Injectable({
  providedIn: 'root',
})
export class SmartContractService {
  electionContract: any;
  election: Election;
  accountAddress: string;
  serviceStatus: string = '';
  privateKey = '';

  constructor(
    private web3Service: Web3Service,
    private electionService: ElectionService
  ) {
    console.log('In smart-contract service constructor: Web3Service is=');
    console.log(this.web3Service);
    console.log('In smart-contract service constructor: ElectionService is=');
    console.log(this.electionService);

    console.log('In smart-contract service constructor: electionArtifacts=');
    console.log(electionArtifacts);

    this.web3Service.convertArtifactsToContract(electionArtifacts);

    this.getAccountAddress();
  }

  getAccountAddress() {
    console.log(this.web3Service.getAccountAddress());
    return this.web3Service.getAccountAddress();
  }

  async migrateElectionContract(
    electionId: string,
    mnemonic: string,
    port: string,
    host: string,
    privateKey: string
  ) {
    try {
      // election service election_id and whole Election without above arguments
      // const candIds = ['c11', 'c12', 'c13'];
      // const candNames = ['ca11', 'ca12', 'ca13'];
      // const voterAddresses = [
      //   '0xF960b8A27c1098965C9d75DC3CC5dE3C4589d248',
      //   '0xFEc985Cbb7880Ca4F2C55A70429b194E1dC37Ee5',
      //   '0x6E3986DfF67302cEb87765CE2Cb70d49ac9C4233',
      // ];
      await this.electionService
        .getElection(electionId)
        .subscribe( (data) => {
          this.election = data['response'];
          console.log('thisElection: ');
          console.log(this.election);
          console.log(this.election.candidates);
          const candIds = this.election.candidates.map((cnd) => cnd.id);
          const candNames = this.election.candidates.map((cnd) => cnd.name);
          console.log(this.election.voters);
          const voterAddresses = this.election.voters.map(
            (vtr) => vtr.publicAddress
          );
          console.log(candIds);
          console.log(candNames);
          console.log(voterAddresses);
          //const privateKey = "1d4c98e4fb04890e0c9d63a75ec3fc7b526893e55334c50d0d9ebc12dddae566";
           this.web3Service.migrateElectionContract(
            candIds,
            candNames,
            voterAddresses,
            privateKey
          );
          // service api call to change state and description of election => uninitiazed to beforestart (string)
          // return string  ("Success") or throwError
          this.setServiceStatus('Sccess in migrateElectionContract');
          console.log(this.serviceStatus);
          return 'Success';
        });
    } catch (err) {
      console.log('ERROR in migrateElectionContract : error: ' + err);
      return throwError(err);
    }
  }

  // Function to add candidate for the election
  private async addCandidatesForElection() {
    if (!this.electionContract) {
      this.setServiceStatus(
        'in addCandidatesForElection() : Election Contract is not loaded.' +
          this.electionContract
      );
      console.log(this.serviceStatus);
      return;
    }

    this.setServiceStatus(
      'Trying to add candidates on smart contract. WAIT for some time'
    );
    console.log(this.serviceStatus);

    try {
      const candIds = ['c11', 'c12', 'c13'];
      const candNames = ['ca11', 'ca12', 'ca13'];
      await this.getAccountAddress();
      const deployedElectionContract = this.electionContract.deployed();
      const transaction = deployedElectionContract.addCandidateForElection(
        candIds,
        candNames,
        { from: this.accountAddress }
      );
    } catch (err) {
      this.setServiceStatus('ERROR in addCandidatesForElection() : ' + err);
      console.log(this.serviceStatus);
    }
  }

  // Function to make voters eligible for the election
  private async makeVotersEligibleForElection() {
    if (!this.electionContract) {
      this.setServiceStatus(
        'in makeVotersEligibleForElection() : Election Contract is not loaded.' +
          this.electionContract
      );
      console.log(this.serviceStatus);
      return;
    }

    this.setServiceStatus(
      'Trying to make voters eligible on smart contract. WAIT for some time'
    );
    console.log(this.serviceStatus);

    try {
      const voterAddresses = ['', '', ''];
      await this.getAccountAddress();
      const deployedElectionContract = this.electionContract.deployed();
      var transaction;
      voterAddresses.forEach(function (item) {
        transaction = deployedElectionContract.addCandidateForElection(item, {
          from: this.accountAddress,
        });
      });
    } catch (err) {
      this.setServiceStatus('ERROR in addCandidatesForElection() : ' + err);
      console.log(this.serviceStatus);
    }
  }

  // To initialize the voting process.
  async initializeVotingProcess(electionId: string, privateKey: string) {
    // service api call to change state of election => beforestart to started (string)
    // return string  ("Success") or throwError
    try {
      //const privateKey = "1d4c98e4fb04890e0c9d63a75ec3fc7b526893e55334c50d0d9ebc12dddae566";
      await this.web3Service.initializeVotingProcess(privateKey);
      this.setServiceStatus('Sccess in initializeVotingProcess');
      console.log(this.serviceStatus);
      return 'Success';
    } catch (err) {
      console.log('ERROR in initializeVotingProcess : error: ' + err);
      return throwError(err);
    }
  }

  // To cast vote
  async castVote(electionId: string, candidateId: string, privateKey: string) {
    // return string ("Success") or throwError
    try {
      //const privateKey = "1d4c98e4fb04890e0c9d63a75ec3fc7b526893e55334c50d0d9ebc12dddae566";
      //const candId = 'c11';
      await this.web3Service.castVote(candidateId, privateKey);
      this.setServiceStatus('Sccess in castVote');
      console.log(this.serviceStatus);
      return 'Success';
    } catch (err) {
      console.log('ERROR in castVote : error: ' + err);
      return throwError(err);
    }
  }

  // To finalize the voting process
  async finalizeVotingProcess(electionId: string, privateKey: string) {
    // service api call to change state of election => started to ended (string)
    // return string  ("Success") or throwError
    try {
      //const privateKey = "1d4c98e4fb04890e0c9d63a75ec3fc7b526893e55334c50d0d9ebc12dddae566";
      await this.web3Service.finalizeVotingProcess(privateKey);
      this.setServiceStatus('Sccess in finalizeVotingProcess');
      console.log(this.serviceStatus);
      return 'Success';
    } catch (err) {
      console.log('ERROR in finalizeVotingProcess : error: ' + err);
      return throwError(err);
    }
  }

  async getElectionsResults(electionId: string) {
    // returns Candidate[]
    try {
      //const privateKey = "1d4c98e4fb04890e0c9d63a75ec3fc7b526893e55334c50d0d9ebc12dddae566";
      var result = await this.web3Service.getElectionsResults();
      this.setServiceStatus('Sccess in getElectionsResults');
      console.log('Candidates : ');
      //console.log(result);
      console.log(this.serviceStatus);
      var retCand = result as Candidate[];
      console.log(retCand);
      return retCand;
    } catch (err) {
      console.log('ERROR in getElectionsResults : error: ' + err);
      return throwError(err);
    }
  }

  async getWinningCandidatesDetails(electionId: string) {
    // returns Candidate[]
    try {
      //const privateKey = "1d4c98e4fb04890e0c9d63a75ec3fc7b526893e55334c50d0d9ebc12dddae566";
      var result = await this.web3Service.getWinningCandidatesDetails();
      this.setServiceStatus('Sccess in getWinningCandidatesDetails');
      console.log('Winning Candidates : ');
      //console.log(result);
      console.log(this.serviceStatus);
      var retCand = result as Candidate[];
      console.log(retCand);
      return retCand;
    } catch (err) {
      console.log('ERROR in getWinningCandidatesDetails : error: ' + err);
      return throwError(err);
    }
  }

  async getVoterByPublicKey(electionId: string, publicKey: string) {
    // returns Candidate[]
    try {
      //const privateKey = "1d4c98e4fb04890e0c9d63a75ec3fc7b526893e55334c50d0d9ebc12dddae566";
      var result = await this.web3Service.getVoterByPublicKey(publicKey);
      this.setServiceStatus('Sccess in getVoterByPublicKey');
      console.log('Voter is : ');
      console.log(result);
      console.log(this.serviceStatus);
      return result;
    } catch (err) {
      console.log('ERROR in getVoterByPublicKey : error: ' + err);
      return throwError(err);
    }
  }

  private setServiceStatus(message: string) {
    this.serviceStatus = message;
  }
}
