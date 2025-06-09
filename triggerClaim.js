require("dotenv").config(); // Loads environment variables from .env file
const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL); // Connects to Ethereum node
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider); // Signs transactions
if (!process.env.RPC_URL || !process.env.PRIVATE_KEY) {
    throw new Error("Missing required environment variables: RPC_URL or PRIVATE_KEY.");
}

const insuranceFundABI = [ // Defines interface for interacting with the contract
  "function claimPayout() external",
];
const insuranceFundAddress = '0xF038F72f48A28a711459Aac553607A4EE3113DBc'; // Replace with deployed contract address
const insuranceFund = new ethers.Contract(
  insuranceFundAddress,
  insuranceFundABI,
  wallet
);

// Function to trigger claimPayout()
async function triggerClaimPayout() {
  try {
    const tx = await insuranceFund.claimPayout();
    await tx.wait();
    return { status: "success", message: "Payout processed", txHash: tx.hash };
  } catch (error) {
    console.error("Error triggering payout:", error);
    return { status: "error", message: "Transaction failed", details: error.message };
  }
}

module.exports = { triggerClaimPayout };

