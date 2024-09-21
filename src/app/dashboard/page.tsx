import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Wallet Info */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-gray-400">Wallet Balance</p>
              <p className="text-3xl">0 W</p>
            </div>
            <button className="bg-blue-500 px-4 py-2 rounded">Import Token</button>
          </div>
          <div className="flex justify-between items-center">
            <p>Address: 0xF4...56bB</p>
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
            <p>24H: <span className="text-green-500">+0</span></p>
            <p>Monthly: <span className="text-green-500">+0</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
