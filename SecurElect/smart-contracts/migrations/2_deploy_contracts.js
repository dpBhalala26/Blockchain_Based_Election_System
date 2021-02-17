var Election = artifacts.require("ElectionContract");
module.exports = function(deployer) {
  deployer.deploy(Election);
};