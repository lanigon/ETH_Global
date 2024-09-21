import { useState } from 'react';
import { ethers } from 'ethers';

const Vault = () => {
    const [amount, setAmount] = useState('');
    const [transactionHash, setTransactionHash] = useState('');

    const handleDeposit = async () => {
        if (!window.ethereum) {
            alert("MetaMask is not installed!");
            return;
        }

        // Use BrowserProvider if you're using ethers.js v6
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const vaultAddress = "YOUR_VAULT_CONTRACT_ADDRESS";
        const vaultABI = [
            // Add necessary ABI definitions here
            "function deposit(uint amount) public",
            "function withdraw(uint amount) public"
        ];

        const vaultContract = new ethers.Contract(vaultAddress, vaultABI, signer);

        try {
            // Use ethers.parseUnits instead of ethers.utils.parseUnits
            const tx = await vaultContract.deposit(ethers.parseUnits(amount, 18));
            setTransactionHash(tx.hash);
        } catch (error) {
            console.error(error);
            alert("Deposit failed!");
        }
    };

    const handleWithdraw = async () => {
        // Similar to deposit but calling withdraw
    };

    return (
        <div>
            <h2>Vault</h2>
            <input 
                type="text" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                placeholder="Amount" 
            />
            <button onClick={handleDeposit}>Deposit</button>
            <button onClick={handleWithdraw}>Withdraw</button>
            {transactionHash && (
                <p>Transaction hash: {transactionHash}</p>
            )}
        </div>
    );
};

export default Vault;
