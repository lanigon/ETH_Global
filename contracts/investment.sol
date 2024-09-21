// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract investment is AccessControl, ReentrancyGuard {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    
    IERC20 public asset;
    
    uint256 public totalInvested;
    uint256 public totalYield;
    
    address public vault;
    
    constructor(IERC20 _asset, address admin, address vault_) {
        require(address(_asset) != address(0), "Asset address cannot be zero");
        require(admin != address(0), "Admin address cannot be zero");
        require(vault_ != address(0), "Vault address cannot be zero");
        
        asset = _asset;
        vault = vault_;
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(ADMIN_ROLE, vault_);
    }

    event Invested(uint256 amount);
    event YieldGenerated(uint256 amount);
    event YieldWithdrawn(uint256 amount);
    
    function invest(uint256 amount) external onlyRole(ADMIN_ROLE)nonReentrant {
        require(asset.transferFrom(vault, address(this), amount), "Transfer failed");
        totalInvested += amount;
    }
    
    function withdrawYield(uint256 amount) external onlyRole(ADMIN_ROLE) nonReentrant{
        require(asset.transfer(vault, amount), "Transfer failed");
        totalYield -= amount;
    }
    
    function addYield(uint256 amount) public {
        require(asset.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        totalYield += amount;
        emit YieldGenerated(amount);
    }
}