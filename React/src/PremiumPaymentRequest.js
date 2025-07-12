import React, { useState } from "react";
import { ethers } from "ethers";
import "./PremiumPaymentRequest.css";
import { saveWalletAddress } from "./ApiService"; // Import saveWalletAddress

const contractAddress = "0xF038F72f48A28a711459Aac553607A4EE3113DBc"; // Replace with contract address
const contractAbi = ["function payPremium() external payable"]; // Replace with contract ABI

const PremiumPaymentRequest = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const payPremium = async () => {
    setIsProcessing(true);

    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        alert("Please install MetaMask first.");
        return;
      }

      // Request account access
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const payingAddress = await signer.getAddress(); // Gets user wallet address
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      const tx = await contract.payPremium({
        value: ethers.BigNumber.from("110"), // Enter the amount of wei we are requesting
      });

      await tx.wait();
      console.log("Transaction successful:", tx.hash);

      await saveWalletAddress({ // Sends user wallet address to the database
        wallet_address: payingAddress,
        transaction_hash: tx.hash
      });
      
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button
      type="button" // This prevents form submission
      onClick={payPremium}
      disabled={isProcessing}
    >
      {isProcessing ? "Processing..." : "Pay Premium"}
    </button>
  );
};

export default PremiumPaymentRequest;
