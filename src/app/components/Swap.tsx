"use client";
import React, { useState } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { abi } from './abi'
import { vaultabi, vaultadd } from '../dashboard/constant';

const Swap = () => {
  const account = useAccount()
  const [fromCurrency, setFromCurrency] = useState('USDC');
  const [toCurrency, setToCurrency] = useState('TUSD');
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);
  const handleSwitch = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(0);
    setToAmount(0);
  };
  const { writeContract } = useWriteContract()
  // const TUSDAmount = useReadContract({
  //   abi: vaultabi,
  //   address: vaultadd,
  //   functionName: 'balanceOf',
  //   args: [account],
  //   account: account,
  // })
  // const USDCAmount = useReadContract({
  //   abi: usdcabi,
  //   address: usdcadd,
  //   functionName: 'balanceOf',
  //   args: [account],
  //   account: account,
  // })
  const handleButtonClick = () => {
    if (toCurrency === 'TUSD') {
      writeContract({ 
        abi: vaultabi,
        address: vaultadd,
        functionName: "deposit",
        args: [
          fromAmount
          ,account
        ],
     })
    } else {
      writeContract({ 
        abi: vaultabi,
        address: vaultadd,
        functionName: "withdraw",
        args: [
          toAmount
          ,account
        ],
     })
    }
  };
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-4">1 USDC ≈ 1 TUSD</h1>
      <p className="mb-6">
        Hold TUSD in your own wallet to get <span className="text-green-500">5% rewards</span>
      </p>
      
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-4">
          <label className="block text-sm mb-2">From</label>
          <div className="flex items-center bg-gray-800 p-3 rounded">
            <input type="number" placeholder="0" className="bg-transparent text-2xl outline-none flex-1" />
            <div className="flex items-center ml-4">
              <span className="text-lg">{fromCurrency}</span>
            </div>
          </div>
        </div>
        <button className="switch-button" onClick={handleSwitch}>⇅</button>
        <div className="mb-4">
          <div className="flex items-center bg-gray-800 p-3 rounded">
            <input type="number" placeholder="0" className="bg-transparent text-2xl outline-none flex-1" />
            <div className="flex items-center ml-4">
              <span className="text-lg">{toCurrency}</span>
            </div>
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-xl p-3 rounded-lg" onClick={handleButtonClick}>{
        toCurrency == "TUSD" ? 'Stake' : 'Unstake'}</button>
      </div>
    </div>
  );
};

export default Swap;
