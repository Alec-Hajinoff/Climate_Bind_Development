import React, { useState } from 'react';
import { ethers } from 'ethers';
import "./PremiumPaymentRequest.css";

const contractAddress = '0x...'; // replace with your contract address
const contractAbi = []; // replace with your contract ABI

const PremiumPaymentRequest = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const payPremium = async () => {
    setIsProcessing(true);

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractAbi, signer);

      const tx = await contract.payPremium({
        value: ethers.utils.parseEther('0.01'), // replace with the desired amount
      });

      await tx.wait();
      console.log('Transaction successful:', tx.hash);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button onClick={payPremium} disabled={isProcessing}>
      {isProcessing ? 'Processing...' : 'Pay Premium'}
    </button>
  );
};

export default PremiumPaymentRequest;
