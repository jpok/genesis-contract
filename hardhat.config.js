require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('hardhat-contract-sizer');
const dotenv = require("dotenv");

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    mainnet: {
      url: "https://mainnet.infura.io/v3/8e9eee1282fd4caab5bcc959a4d40a94",
      accounts: [process.env.SKT_GEN_PRIVATE_KEY]
    },
    rinkeby: {
      url: process.env.SKT_GEN_RINKEBY_RPC_URL,
      accounts: [process.env.SKT_GEN_PRIVATE_KEY]
    },
    hardhat: {
      chainId: 1337
    }
  },
  etherscan: {
    apiKey: process.env.SKT_GEN_ETHERSCAN_API_KEY,
  },
  solidity: "0.8.4",
  settings: {
    optimizer: {
      enabled: true,
      runs: 10
    },
  }
};
