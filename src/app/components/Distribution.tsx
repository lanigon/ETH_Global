import { useState } from 'react';
import { ethers } from 'ethers';

const Distribution = () => {
    const [transactionHash, setTransactionHash] = useState('');

    const handleDistribute = async () => {
        if (!window.ethereum) {
            alert("MetaMask is not installed!");
            return;
        }

        // Use BrowserProvider for ethers.js v6.x
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const distributionAddress = "YOUR_DISTRIBUTION_CONTRACT_ADDRESS";
        const distributionABI = [
            "function distributePrize() public"
        ];

        const distributionContract = new ethers.Contract(distributionAddress, distributionABI, signer);

        try {
            const tx = await distributionContract.distributePrize();
            setTransactionHash(tx.hash);
        } catch (error: unknown) {
            // Safe type assertion
            if (error instanceof Error) {
                console.error(error);
                alert("Distribution failed! " + error.message);
            } else {
                alert("An unknown error occurred.");
            }
        }
    };

    return (
        <div>
            <h2>Distribute Prize</h2>
            <button onClick={handleDistribute}>Distribute</button>
            {transactionHash && (
                <p>Transaction hash: {transactionHash}</p>
            )}
        </div>
    );
};

export default Distribution;
