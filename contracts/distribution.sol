// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract distribution is AccessControl{
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    
    IERC20 public rewardToken;
    address public vault;

    struct User{
        address add;
        uint256 amount;
    }
    
    mapping(uint256 => address) public requestIdToUser;
    
    event RewardDistributed(address indexed user, uint256 amount);
    
    constructor(
        IERC20 _rewardToken,
        address _vault,
        address admin
    ) {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(ADMIN_ROLE, admin);
        rewardToken = _rewardToken;
        vault = _vault;
    }
    
    function initialize(
        IERC20 _rewardToken,
        address vault_
    ) public onlyRole(ADMIN_ROLE){
        rewardToken = _rewardToken;
        vault = vault_;
    }
    
     function distributeRewards(User[] memory users) external onlyRole(ADMIN_ROLE) {
        uint256 length = users.length;
        for (uint64 i = 0; i < length; i++) {
            address userAddress = users[i].add;
            uint256 rewardAmount = users[i].amount;
            require(rewardAmount > 0, "Reward amount must be greater than zero");
            
            require(
                rewardToken.transferFrom(vault, userAddress, rewardAmount),
                "Transfer failed"
            );
            
            emit RewardDistributed(userAddress, rewardAmount); 
        }
    }
    
}