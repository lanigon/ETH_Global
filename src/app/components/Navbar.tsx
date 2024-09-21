import Link from 'next/link';
import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { IDKitWidget, VerificationLevel, ISuccessResult } from '@worldcoin/idkit'
const Navbar = () => {
  const handleVerify = async (proof: ISuccessResult) => {
    const res = await fetch("http://localhost:8080/Verify", { // route to your backend will depend on implementation
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(proof),
    })
    if (!res.ok) {
        throw new Error("Verification failed."); // IDKit will display the error message to the user in the modal
    }
  };
  const onSuccess = ()=>{}
  return (
    <nav className="bg-gray-900 border-b border-gray-800 p-4 text-white flex justify-between items-center">
      {/* 左侧Logo */}
      <div className="flex items-center space-x-2">
        <span className="text-xl font-bold">Fortuna</span>
      </div>

      {/* 中间的导航链接 */}
      <div className="flex space-x-8">
        <Link href="/" className="hover:text-green-400 text-lg">
          Stake
        </Link>
        <Link href="/dashboard" className="hover:text-green-400 text-lg">
          Dashboard
        </Link>
      </div>

      <div className="flex items-between space-x-4">
        <ConnectButton />
        <IDKitWidget
          app_id="app_staging_2ecf9dfe8fcb453c9d472d73291da087" // obtained from the Developer Portal
          action="Liu Chengxin" // obtained from the Developer Portal
          onSuccess={onSuccess} // callback when the modal is closed
          handleVerify={handleVerify} // callback when the proof is received
          verification_level={VerificationLevel.Orb}
        >
          {({ open }) => 
                // This is the button that will open the IDKit modal
                <button onClick={open}>Verify with World ID</button>
            }
        </IDKitWidget>
      </div>
      
    </nav>
  );
};

export default Navbar;
