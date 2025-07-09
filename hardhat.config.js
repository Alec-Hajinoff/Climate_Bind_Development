require("dotenv").config();
require("@matterlabs/hardhat-zksync-verify");

module.exports = {
  solidity: {
    version: "0.8.0", // must match Remix deployment version exactly
  },
  networks: {
    zkSyncSepolia: {
      url: process.env.RPC_URL,
      chainId: 300,
      ethNetwork: "sepolia",
      zksync: true,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  zksolc: {
    version: "1.3.7", // zkSync compiler used in Remix
    compilerSource: "binary",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200, // must match Remix optimizer setting
      },
    },
  },
};
