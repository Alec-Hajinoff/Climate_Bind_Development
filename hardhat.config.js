require("@matterlabs/hardhat-zksync-verify");

module.exports = {
  solidity: "0.8.28",
  networks: {
    zkSyncSepolia: {
      url: "https://sepolia.era.zksync.dev",
      chainId: 300,
      zksync: true,
    },
  },
  etherscan: {
    customChains: [
      {
        network: "zkSyncSepolia",
        chainId: 300,
        urls: {
          apiURL: "https://sepolia.explorer.zksync.io/api",
          browserURL: "https://sepolia.explorer.zksync.io",
        },
      },
    ],
  },
};
