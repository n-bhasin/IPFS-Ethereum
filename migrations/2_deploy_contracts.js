var SimpleStorage = artifacts.require("./SimpleStorage.sol");
const IpfsStorage = artifacts.require("IpfsStorage");
module.exports = function (deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(IpfsStorage);
};
