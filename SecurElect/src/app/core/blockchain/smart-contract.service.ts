import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Election } from '../election';
import { ElectionService } from '../elections/election.service';
import { Web3Service } from './web3.service';

declare let require: any;
const electionArtifacts =""//= require('../../../../build/contracts/ElectionContract.json');

@Injectable({
  providedIn: 'root',
})
export class SmartContractService {
  electionContract: any;
  election: Observable<Election>;
  accountAddress: string;
  serviceStatus: string = '';

  constructor(
    private web3Service: Web3Service,
    private electionService: ElectionService
  ) {
    console.log(
      'In smart-contract service constructor: Web3Service is=' + web3Service
    );
    console.log(
      'In smart-contract service constructor: ElectionService is=' +
        electionService
    );
    console.log('OnConstruct: ' + this.web3Service);
    console.log(this);
    // watch current account
    this.web3Service
      .convertArtifactsToContract(electionArtifacts)
      .then((absContract) => {
        this.electionContract = absContract;
        this.electionContract.deployed().then((deployed) => {
          console.log(
            'OnConstruct: election contract deployed successfully.' + deployed
          );
        });
      });
    console.log('After converting aftifacts..');
    this.getAccountAddress().then((acc) => {
      console.log('Got acc at counstructor: ' + acc);
    });
  }

  async getAccountAddress() {
    this.web3Service.getAccountAddress().then((acc) => {
      console.log('Got acc at method: ' + acc);
      this.accountAddress = acc;
    });
    console.log(
      'After getting account address :::: address:' + this.accountAddress
    );
    return this.accountAddress;
  }

  // Function to initialize and migrate smart contract to the blockchain.
  // We have assumed that smart-contract will be migrated manually using truffle by the admin.
  async migrateElectionContract(
    electionId: string,
    mnemonic: string,
    port: string,
    host: string
  ) {
    try {
      // election service election_id and whole Election without above arguments
      // make candidates stand for election
      //await this.addCandidatesForElection();
      // make voters eligible
      //await this.makeVotersEligibleForElection();

      // Making use of one fuction only.
      if (!this.electionContract) {
        this.setServiceStatus(
          'in migrateElectionContract() : Election Contract is not loaded.' +
            this.electionContract
        );
        console.log(this.serviceStatus);
        return;
      }

      this.setServiceStatus(
        'Trying to initiaze election on smart contract. WAIT for some time'
      );
      console.log(this.serviceStatus);

      try {
        const candIds = ['c11', 'c12', 'c13'];
        const candNames = ['ca11', 'ca12', 'ca13'];
        const voterAddresses = ['', '', ''];
        await this.getAccountAddress();
        this.electionContract.deployed().then((deployed) => {
          deployed
            .electionInitialized({}, { fromBlock: 0, toBlock: 'latest' })
            .watch(function (err, event) {
              console.log('Event Triggered: ' + event);
            });
          deployed.initializeElection(candIds, candNames, voterAddresses, {
            from: this.accountAddress,
          });
        });
        // const deployedElectionContract = this.electionContract.deployed();
        // const transaction = deployedElectionContract.initializeElection(
        //   candIds,
        //   candNames,
        //   voterAddresses,
        //   { from: this.accountAddress }
        // );
      } catch (err) {
        this.setServiceStatus('ERROR in migrateElectionContract() : ' + err);
        console.log(this.serviceStatus);
      }
      // service api call to change state and description of election => uninitiazed to beforestart (string)
      // return string  ("Success") or throwError
      this.setServiceStatus('Sccess in migrateElectionContract');
      console.log(this.serviceStatus);
      return 'Success';
    } catch (err) {
      console.log('ERROR in migrateElectionContract : error: ' + err);
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
  async initializeVotingProcess(electionId: string) {
    // service api call to change state of election => beforestart to started (string)
    // return string  ("Success") or throwError
  }

  // To cast vote
  async castVote(electionId: string, candidateId: string) {
    // return string ("Success") or throwError
  }

  // To finalize the voting process
  async finalizeVotingProcess(electionId: string) {
    // service api call to change state of election => started to ended (string)
    // return string  ("Success") or throwError
  }

  async getCandidateVoteCounts(electionId: string) {
    // returns Candidate[]
  }

  async getWinningCandidates(electionId: string) {
    // returns Candidate[]
  }

  private setServiceStatus(message: string) {
    this.serviceStatus = message;
  }
}
