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

        const tokenAddress = "YOUR_TOKEN_CONTRACT_ADDRESS";
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
        <div className="min-h-screen flex items-center justify-center bg-gray-800 p-6">
            <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Swap Tokens</h2>

                <div className="mb-4">
                    <label className="block text-gray-400 mb-2">Recipient Address</label>
                    <input 
                        type="text" 
                        value={recipient} 
                        onChange={(e) => setRecipient(e.target.value)} 
                        placeholder="0x..." 
                        className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-400 mb-2">Amount</label>
                    <input 
                        type="text" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                        placeholder="Enter amount" 
                        className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button 
                    onClick={handleTransfer} 
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition-colors duration-200"
                >
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
