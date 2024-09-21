import { useState } from 'react';
import { ethers } from 'ethers';

const RNG = () => {
    const [randomNumber, setRandomNumber] = useState('');

    const generateRandomNumber = async () => {
        if (!window.ethereum) {
            alert("MetaMask is not installed!");
            return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const rngAddress = "YOUR_RNG_CONTRACT_ADDRESS";
        const rngABI = [
            "function getRandomNumber() public returns (uint256)",
            "event RandomNumberGenerated(uint256 randomNumber)"
        ];

        const rngContract = new ethers.Contract(rngAddress, rngABI, signer);

        try {
            const tx = await rngContract.getRandomNumber();
            const receipt = await tx.wait();

            // Using the contract's interface to decode the event
            const eventInterface = new ethers.Interface(rngABI);
            const eventLog = receipt.logs.find((log: ethers.Log) => {
                try {
                    // Try decoding the event
                    const parsedLog = eventInterface.parseLog(log);
                    // Ensure parsedLog is not null
                    return parsedLog && parsedLog.name === "RandomNumberGenerated";
                } catch (error) {
                    return false;
                }
            });

            if (eventLog) {
                const parsedEvent = eventInterface.parseLog(eventLog);
                // Ensure parsedEvent is not null
                if (parsedEvent && parsedEvent.args.randomNumber) {
                    const randomNum = parsedEvent.args.randomNumber.toString();
                    setRandomNumber(randomNum);
                } else {
                    alert("Failed to parse event log");
                }
            } else {
                alert("No event found for random number generation");
            }

        } catch (error) {
            console.error(error);
            alert("Random number generation failed!");
        }
    };

    return (
        <div>
            <h2>Generate Random Number</h2>
            <button onClick={generateRandomNumber}>Generate</button>
            {randomNumber && (
                <p>Random Number: {randomNumber}</p>
            )}
        </div>
    );
};

export default RNG;
