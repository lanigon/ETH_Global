"use client";
import React, { useState } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { config } from '../wagmi';
import { abi, add } from './constant';

const Dashboard = () => {
  const [rewards, setRewards] = useState(0);
  const account = useAccount()
  // const {data} = useReadContract({
  //   abi,
  //   address: add,
  //   functionName: 'num',
  // })
  const { writeContract } = useWriteContract()
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Wallet Info */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-gray-400">Wallet Balance</p>
              <p className="text-3xl">0 TUSD</p>
            </div>

          </div>
          <div className="flex justify-between items-center">
            <p>Address: 0xF4...56bB</p>
          </div>
          <div className="mt-4">
          
          </div>
        </div>

        {/* Rewards */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg mb-8">
          <p className="text-2xl">Rewards Earned</p>
          <div className="flex justify-between mt-4">
            <p>24H: <span className="text-green-500">+0</span></p>
            <p>Monthly: <span className="text-green-500">+0</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
