"use client";
import { useState } from 'react';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const Swap = () => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionHash, setTransactionHash] = useState('');

  const handleTransfer = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed!");
      return;
    }

    // Using BrowserProvider for ethers.js version 6.x
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const tokenAddress = "YOUR_TOKEN_CONTRACT_ADDRESS"; // Replace with actual contract address
    const tokenABI = [
      "function transfer(address to, uint amount) public returns (bool)",
      "function balanceOf(address owner) public view returns (uint256)"
    ];

    const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);

    try {
      // Using ethers.parseUnits instead of utils.parseUnits
      const tx = await tokenContract.transfer(recipient, ethers.parseUnits(amount, 18));
      setTransactionHash(tx.hash);
    } catch (error) {
      console.error(error);
      alert("Transaction failed!");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-4">1 USDT ≈ 1 WUSD</h1>
      <p className="mb-6">
        Hold WUSD in your own wallet to get <span className="text-green-500">5% rewards</span>
      </p>
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-4">
          <label className="block text-sm mb-2">Recipient Address</label>
          <div className="flex items-center bg-gray-800 p-3 rounded">
            <input 
              type="text" 
              value={recipient} 
              onChange={(e) => setRecipient(e.target.value)} 
              placeholder="0xRecipientAddress" 
              className="bg-transparent text-lg outline-none flex-1"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2">Amount</label>
          <div className="flex items-center bg-gray-800 p-3 rounded">
            <input 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              placeholder="Enter amount" 
              className="bg-transparent text-2xl outline-none flex-1"
            />
            <div className="flex items-center ml-4">
              <span className="text-lg">USDT</span>
            </div>
          </div>
        </div>

        <button 
          onClick={handleTransfer} 
          className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-xl p-3 rounded-lg">
          Transfer
        </button>

        {transactionHash && (
          <p className="mt-4 text-green-500 text-center">
            Transaction hash: {transactionHash}
          </p>
        )}
      </div>
    </div>
  );
};

export default Swap;
