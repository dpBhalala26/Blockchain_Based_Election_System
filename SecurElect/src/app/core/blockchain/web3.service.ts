import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const Web3 = require('web3');
//const contract = require('@truffle/contract');

declare let require: any;
declare let window: any;

//const Web3 = require('web3');
//const contract = require('@truffle/contract');
const config = require('src/config/config');

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  private web3: any;
  public ready = false;

  constructor() {
    this.initializeWeb3();
    this.getAccountAddress();
  }

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

  public convertArtifactsToContract(artifacts): Promise<any> {
    console.log('In web3 service: in convertArtifactsToContract function '); 
    console.log(artifacts);

    var absContract: Promise<any> = new window.web3.eth.Contract(artifacts["abi"], this.getAccountAddress());
    
    console.log('abs contract is :');
    console.log(absContract);
    return absContract;
  }

  public getAccountAddress(){
    return window.ethereum.request({ method: 'eth_requestAccounts' }).then((arr) => { console.log("Getting account"); console.log(arr); return arr[0];});
  }
}
