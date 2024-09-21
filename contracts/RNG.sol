// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract RandomInRange {
    address constant public cadenceArch = 0x0000000000000000000000010000000000000001;

    event randomGenerator(address[] stakers, uint64[] numbers);

    // Generate a list of unique random numbers between min and max
    function getRandomInRange(address[] memory _add, uint64 min, uint64 max) public returns (uint64[] memory) {
        require(max >= min, "Max must be greater than or equal to min");
        uint64 count = uint64(_add.length);
        require(count <= (max - min + 1), "Not enough unique numbers in the range");

        uint64[] memory ids = new uint64[](max - min + 1); 
        uint64[] memory randomNumbers = new uint64[](count);  

        for (uint64 i = 0; i <= (max - min); i++) {
            ids[i] = min + i;
        }

        for (uint64 i = 0; i < count; i++) {
            (bool ok, bytes memory data) = cadenceArch.staticcall(abi.encodeWithSignature("revertibleRandom()"));
            require(ok, "Failed to fetch a random number through Cadence Arch");
            
            uint64 randomNumber = abi.decode(data, (uint64));
            uint64 len = max - min + 1 - i;
            uint64 randomIndex = randomNumber % len;

            randomNumbers[i] = ids[randomIndex];

            ids[randomIndex] = ids[len - 1];
        }

        emit randomGenerator(_add, randomNumbers);
        return randomNumbers;
    }
}
