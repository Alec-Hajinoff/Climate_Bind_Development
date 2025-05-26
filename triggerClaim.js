require("dotenv").config();
const { ethers } = require("ethers");

// Set up provider and signer
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
if (!process.env.RPC_URL || !process.env.PRIVATE_KEY) {
    throw new Error("Missing required environment variables: RPC_URL or PRIVATE_KEY.");
}

// Smart contract details
const insuranceFundABI = [
  "function claimPayout() external",
];
const insuranceFundAddress = '0xA66dA33E3786629045b8AbFBCC9eEe44D94c58b2'; // Replace with deployed contract address
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

