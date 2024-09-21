import React from 'react';

const Swap = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-4">1 USDT ≈ 1 WUSD</h1>
      <p className="mb-6">
        Hold WUSD in your own wallet to get <span className="text-green-500">5% rewards</span>
      </p>
      
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-4">
          <label className="block text-sm mb-2">From</label>
          <div className="flex items-center bg-gray-800 p-3 rounded">
            <input type="number" placeholder="0" className="bg-transparent text-2xl outline-none flex-1" />
            <div className="flex items-center ml-4">
              <span className="text-lg">USDT</span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2">To</label>
          <div className="flex items-center bg-gray-800 p-3 rounded">
            <input type="number" placeholder="0" className="bg-transparent text-2xl outline-none flex-1" />
            <div className="flex items-center ml-4">
              <span className="text-lg">WUSD</span>
            </div>
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-xl p-3 rounded-lg">Stake</button>
      </div>
    </div>
  );
};

export default Swap;
