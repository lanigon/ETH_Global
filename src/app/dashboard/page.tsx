"use client";  // 在组件顶部加上这一行，标记为客户端组件

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const Dashboard = () => {
  const [walletBalance, setWalletBalance] = useState('0');
  const [walletAddress, setWalletAddress] = useState('');
  const [rewards24H, setRewards24H] = useState('0');
  const [rewardsMonthly, setRewardsMonthly] = useState('0');
  
  useEffect(() => {
    const loadWalletData = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          const balance = await provider.getBalance(address);

          setWalletAddress(address);
          setWalletBalance(ethers.formatEther(balance));
        } catch (error) {
          console.error('Error fetching wallet data:', error);
        }
      } else {
        alert('Please install MetaMask!');
      }
    };
    loadWalletData();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Wallet Info */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-gray-400">Wallet Balance</p>
              <p className="text-3xl">{walletBalance} ETH</p>
            </div>
            <button className="bg-blue-500 px-4 py-2 rounded">Import Token</button>
          </div>
          <div className="flex justify-between items-center">
            <p>Address: {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Not Connected'}</p>
            <p>Referral Code: 35UFRG</p>
          </div>
          <div className="mt-4">
            <p className="text-gray-400">Referral Link: https://www.stableflow.app/#35UFRG</p>
          </div>
        </div>

        {/* Rewards */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg mb-8">
          <p className="text-2xl">Rewards Earned</p>
          <div className="flex justify-between mt-4">
            <p>24H: <span className="text-green-500">+{rewards24H}</span></p>
            <p>Monthly: <span className="text-green-500">+{rewardsMonthly}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
