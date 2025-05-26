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
const insuranceFundAddress = "YOUR_SMART_CONTRACT_ADDRESS_HERE"; // Replace with deployed contract address
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
    console.log(`Payout claimed: Tx hash ${tx.hash}`);
  } catch (error) {
    console.error("Error triggering payout:", error);
  }
}

module.exports = { triggerClaimPayout };

