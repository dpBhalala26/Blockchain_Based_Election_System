var Election = artifacts.require("../contracts/ElectionContract.sol");
module.exports = function(deployer) {
  deployer.deploy(Election, [11, 12, 13], ["c11", "c12", "c13"]);
};