import { useState } from 'react';
import { ethers } from 'ethers';

const Investment = () => {
    const [amount, setAmount] = useState('');
    const [transactionHash, setTransactionHash] = useState('');

    const handleInvest = async () => {
        if (!window.ethereum) {
            alert("MetaMask is not installed!");
            return;
        }

        // Using BrowserProvider for ethers.js v6.x
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const investmentAddress = "YOUR_INVESTMENT_CONTRACT_ADDRESS";
        const investmentABI = [
            "function invest(uint amount) public",
            "function withdraw(uint amount) public"
        ];

        const investmentContract = new ethers.Contract(investmentAddress, investmentABI, signer);

        try {
            // Using ethers.parseUnits for ethers.js v6.x
            const tx = await investmentContract.invest(ethers.parseUnits(amount, 18));
            setTransactionHash(tx.hash);
        } catch (error) {
            console.error(error);
            alert("Investment failed!");
        }
    };

    const handleWithdraw = async () => {
        if (!window.ethereum) {
            alert("MetaMask is not installed!");
            return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const investmentAddress = "YOUR_INVESTMENT_CONTRACT_ADDRESS";
        const investmentABI = [
            "function invest(uint amount) public",
            "function withdraw(uint amount) public"
        ];

        const investmentContract = new ethers.Contract(investmentAddress, investmentABI, signer);

        try {
            const tx = await investmentContract.withdraw(ethers.parseUnits(amount, 18));
            setTransactionHash(tx.hash);
        } catch (error) {
            console.error(error);
            alert("Withdraw failed!");
        }
    };

    return (
        <div>
            <h2>Investment</h2>
            <input 
                type="text" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                placeholder="Amount" 
            />
            <button onClick={handleInvest}>Invest</button>
            <button onClick={handleWithdraw}>Withdraw</button>
            {transactionHash && (
                <p>Transaction hash: {transactionHash}</p>
            )}
        </div>
    );
};

export default Investment;
