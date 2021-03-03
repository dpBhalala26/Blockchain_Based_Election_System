import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import Common from 'ethereumjs-common';

const Web3 = require('web3');
const EthereumTx = require('ethereumjs-tx').Transaction;
//const contract = require('@truffle/contract');

declare let require: any;
declare let window: any;
declare const Buffer;

const config = require('src/config/config');

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  public ready = false;
  electionContract: any;
  conNonce: any;
  contractAddress: string;
  web3 = new Web3();

  constructor(private authService: AuthService) {
    this.initializeWeb3();
    this.getAccountAddress();
  }
  /*
  initializeWeb3() {
    console.log('In web3 service function: initiazeWeb3: widow.ethereum is :');
    console.log(window.ethereum);

    // Checking whether Web3 has been injected by the browser (MetaMask is used or not)
    if (window.ethereum) {
      // Use MetaMask's provider in broowser
      console.log('In web3 service : window.ethereum');
      window.web3 = new Web3(window.ethereum);
      console.log('after enabling: web3 is '); console.log(window.web3);
    } else {
      console.log("Else of windoes.ethereum");
    }
  }
*/

  initializeWeb3() {
    const web3ProviderURL = 'http://127.0.0.1:8545';
    this.web3.setProvider(web3ProviderURL);
    this.web3.eth.defaultAccount = this.authService.userValue.publicKey;
    //this.web3.eth.defaultAccount = '0x19574eF12Cce1DdD794Fe71B0845e6B677940ccE';
    console.log('In initialize web3');
    console.log(this.web3);
  }
  /*  
  public convertArtifactsToContract(artifacts): Promise<any> {
    console.log('In web3 service: in convertArtifactsToContract function '); 
    console.log(artifacts);

    var absContract: Promise<any> = new window.web3.eth.Contract(artifacts["abi"], this.getAccountAddress());
    
    console.log('abs contract is :');
    console.log(absContract);
    return absContract;
  }  */

  private getNonce() {
    this.web3.eth.getTransactionCount(
      this.web3.eth.defaultAccount,
      (err, nonce) => {
        console.log('nonce value is ');
        this.conNonce = nonce;
        console.log(nonce);
      }
    );
    return this.conNonce;
  }

  public convertArtifactsToContract(artifacts) {
    this.web3.eth.getTransactionCount(
      this.web3.eth.defaultAccount,
      (err, nonce) => {
        console.log('nonce value is ');
        this.conNonce = nonce;
        console.log(nonce);
        console.log(artifacts['abi']);
        this.contractAddress = artifacts['networks']['5777']['address'];
        console.log(this.contractAddress);
        const contract = new this.web3.eth.Contract(
          artifacts['abi'],
          this.contractAddress,
          {
            from: this.web3.eth.defaultAccount,
            gas: 3000000,
          }
        );
        console.log('abs contract is and type:');
        console.log(contract);
        this.electionContract = contract;
        console.log(this.electionContract);
      }
    );
  }

  /*
  public getAccountAddress(){
    return window.ethereum.request({ method: 'eth_requestAccounts' }).then((arr) => { console.log("Getting account"); console.log(arr); return arr[0];});
  } */

  private sendTxForContractFun(funAbi, privateKey) {
    var details = {
      nonce: this.getNonce(),
      //nonce: this.conNonce,
      gasPrice: this.web3.utils.toHex(this.web3.utils.toWei('47', 'gwei')),
      gas: 300000,
      to: this.contractAddress,
      value: 0,
      data: funAbi,
    };

    const customCommon = Common.forCustomChain(
      'mainnet',
      {
        name: 'SecurElect',
        networkId: 5777,
        chainId: 1337,
      },
      'petersburg'
    );
    //const transaction = new EthereumTx(details, { chain: '1337', hardfork: 'muirglacier' });
    const transaction = new EthereumTx(details, { common: customCommon });
    transaction.sign(Buffer.from(privateKey, 'hex'));
    var rawData = '0x' + transaction.serialize().toString('hex');
    this.web3.eth
      .sendSignedTransaction(rawData)
      .on('transactionHash', (hash) => {
        console.log('After sending: Transaction Hash is: ', hash);
      })
      .on('receipt', (receipt) => {
        console.log('After sending: Transaction Receipt is: ', receipt);
      })
      .on('error', (err) => {
        console.log('ERROR After sending: Error is: ', err);
      });
  }
  public getAccountAddress() {
    console.log(this.authService.userValue.publicKey);
    return this.authService.userValue.publicKey;
  }

  public migrateElectionContract(
    candIds,
    candNames,
    voterAddresses,
    privateKey
  ) {
    console.log("In web3, migrateElection:");
    const funAbi = this.electionContract.methods
      .initializeElection(candIds, candNames, voterAddresses)
      .encodeABI();
    console.log('In web3, migrateElection: funAbi is:');
    console.log(funAbi);
    this.sendTxForContractFun(funAbi, privateKey);
  }

  public initializeVotingProcess(privateKey) {
    const funAbi = this.electionContract.methods
      .initializeVotingProcess()
      .encodeABI();
    console.log('In web3, initializeVotingProcess: funAbi is:');
    console.log(funAbi);
    this.sendTxForContractFun(funAbi, privateKey);
  }

  public castVote(candId, privateKey) {
    console.log("in web3: cast vote: canId: ");
    console.log(candId);
    const funAbi = this.electionContract.methods.vote(candId).encodeABI();
    console.log('In web3, castVote: funAbi is:');
    console.log(funAbi);
    this.sendTxForContractFun(funAbi, privateKey);
  }

  public finalizeVotingProcess(privateKey) {
    const funAbi = this.electionContract.methods
      .finalizeVotingProcess()
      .encodeABI();
    console.log('In web3, finalizeVotingProcess: funAbi is:');
    console.log(funAbi);
    this.sendTxForContractFun(funAbi, privateKey);
  }

  public getElectionsResults() {
    // const funAbi = this.electionContract.methods
    //   .getCandidateDetails()
    //   .encodeABI();
    // console.log('In web3, getElectionsResults: funAbi is:');
    // console.log(funAbi);
    // this.sendTxForContractFun(funAbi, privateKey);
    console.log('In web3, getElectionsResults:');
    return this.electionContract.methods
      .getCandidateDetails()
      .call({ from: this.web3.eth.defaultAccount })
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => {
        console.log('Error : ', err);
        return throwError(err);
      });
  }

  public getWinningCandidatesDetails() {
    // const funAbi = this.electionContract.methods
    //   .getWinnerCandidateDetails()
    //   .encodeABI();
    // console.log('In web3, getWinningCandidatesDetails: funAbi is:');
    // console.log(funAbi);
    // this.sendTxForContractFun(funAbi, privateKey);
    console.log('In web3, getWinningCandidatesDetails:');
    return this.electionContract.methods
      .getWinnerCandidateDetails()
      .call({ from: this.web3.eth.defaultAccount })
      .then((result) => {
        //console.log(result);
        return result;
      })
      .catch((err) => {
        console.log('Error : ', err);
        return throwError(err);
      });
  }

  public getVoterByPublicKey(publicKey) {
    return this.electionContract.methods
      .getVoterByAddress(publicKey)
      .call({ from: this.web3.eth.defaultAccount })
      .then((result) => {
        //console.log(result);
        return result;
      })
      .catch((err) => {
        console.log('Error : ', err);
        return throwError(err);
      });
  }
}
