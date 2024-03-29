const ethers = require("ethers");
const { Contract } = require("@ethersproject/contracts");
const config = require("../../client/config");
const apiKeys = require("../../db/apiKeys");

module.exports = {
  sleep: async (millis) => {
    // eslint-disable-next-line no-undef
    return new Promise((resolve) => setTimeout(resolve, millis));
  },

  getContract(chainId) {
    if (config.supportedId[chainId]) {
      let provider;
      if (chainId === 1337) {
        provider = new ethers.providers.JsonRpcProvider();
      } else {
        provider = new ethers.providers.InfuraProvider(
          chainId,
          apiKeys.infuraApiKey
        );
      }
      return new Contract(config.address[chainId], config.abi, provider);
    }
  },
};
