import { Injectable } from '@angular/core';

declare let require: any;
declare let window: any;

const Web3 = require('web3');
const contract = require('@truffle/contract');
const config = require('src/config/config');

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  private web3: any;
  public ready = false;

  constructor() {
    console.log('In web3 service constructor.');
    window.addEventListener('load', (event) => {
      console.log('Inside web3 service constructor window event listner');
      this.initializeWeb3();
    });
    console.log('In web3 service constructor.: INITIALIZED');
  }

  initializeWeb3() {
    console.log(
      'In web3 service function: initiazeWeb3: widow.ethereum is :' +
        window.ethereum
    );

    // Checking whether Web3 has been injected by the browser (MetaMask is used or not)
    if (typeof window.ethereum !== 'undefined') {
      // Use MetaMask's provider in broowser
      console.log('In web3 service : window.ethereum undefined');
      window.ethereum.enable().then(() => {
        this.web3 = new Web3(window.ethereum);
      });
      console.log('after enabling: web3 is ' + this.web3);
    } else {
      console.log('No web3? You should consider trying MetaMask!');

      // Hack to provide backwards compatibility for Truffle, which uses web3js 0.20.x
      Web3.providers.HttpProvider.prototype.sendAsync =
        Web3.providers.HttpProvider.prototype.send;
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      console.log("config.web3HttpProvider is : " + config.web3HttpProvider);
      this.web3 = new Web3(
        new Web3.providers.HttpProvider(config.web3HttpProvider)
      );

      console.log('after setting httpprovider: web3 is ' + this.web3);
    }
  }
  public async convertArtifactsToContract(artifacts) {
    console.log(
      'In web3 service: in convertArtifactsToContract function ' + artifacts
    );
    if (!this.web3) {
      const delay = new Promise((resolve) => setTimeout(resolve, 100));
      await delay;
      return await this.convertArtifactsToContract(artifacts);
    }

    const absContract = contract(artifacts);
    absContract.setProvider(this.web3.currentProvider);
    console.log('abs contract is :' + absContract);
    return absContract;
  }
}
