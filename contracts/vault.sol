// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { IERC4626 } from "@openzeppelin/contracts/interfaces/IERC4626.sol";
import { ERC4626} from "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import { ERC20, IERC20, IERC20Metadata } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";
import {investment} from "./investment.sol";
import {distribution} from "./distribution.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract PrizeVault is ERC4626, AccessControl{
    using Math for uint256;
    using SafeERC20 for IERC20;

    event DistributionSet(address indexed investmentManager, address indexed rewardDistributor);
    
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    
    investment public investmentManager;
    distribution public rewardDistributor;
    
    IERC20 public usdc;
    
    constructor(IERC20 _usdc, address admin, string memory name_, string memory symbol_) ERC4626(_usdc)ERC20(name_,
    symbol_) {
        usdc = _usdc;
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(ADMIN_ROLE, admin);
    }

    function setDistribution(investment _invest, distribution _distribution)public onlyRole(ADMIN_ROLE) {
        require(address(_invest) != address(0), "Investment manager address cannot be zero");
        require(address(_distribution) != address(0), "Reward distributor address cannot be zero");
        investmentManager = _invest;
        rewardDistributor = _distribution;
        emit DistributionSet(address(_invest), address(_distribution));
    }

    function deposit(uint256 assets, address receiver) public virtual override returns (uint256) {
        require(receiver != address(0), "Receiver address cannot be zero");

        uint256 shares = previewDeposit(assets);
        _deposit(_msgSender(), receiver, assets, shares);

        if (address(investmentManager) != address(0)) {
            usdc.approve(address(investmentManager), assets);
            investmentManager.invest(assets);
        }

        return shares;
    }

    function withdraw(uint256 assets, address receiver, address owner) public virtual override returns (uint256) {
        require(receiver != address(0), "Receiver address cannot be zero");
        require(owner != address(0), "Owner address cannot be zero");

        uint256 shares = previewWithdraw(assets);
        _withdraw(_msgSender(), receiver, owner, assets, shares);

        if (address(investmentManager) != address(0)) {
            investmentManager.withdrawYield(assets);
            usdc.safeTransfer(receiver, assets);
        } else {
            usdc.safeTransfer(receiver, assets);
        }

        return shares;
    }

    function redeem(uint256 shares, address receiver, address owner) public virtual override returns (uint256) {
        require(receiver != address(0), "Receiver address cannot be zero");
        require(owner != address(0), "Owner address cannot be zero");

        uint256 assets = previewRedeem(shares);
        _withdraw(_msgSender(), receiver, owner, assets, shares);

        if (address(investmentManager) != address(0)) {
            investmentManager.withdrawYield(assets);
            usdc.safeTransfer(receiver, assets);
        } else {
            usdc.safeTransfer(receiver, assets);
        }

        return assets;
    }

    function mint(uint256 shares, address receiver) public virtual override returns (uint256) {
        require(receiver != address(0), "Receiver address cannot be zero");

        uint256 assets = previewMint(shares);
        _deposit(_msgSender(), receiver, assets, shares);

        if (address(investmentManager) != address(0)) {
            usdc.approve(address(investmentManager), assets);
            investmentManager.invest(assets);
        }

        return shares;
    }

    function _deposit(address caller, address receiver, uint256 assets, uint256 shares) internal override {
        usdc.safeTransferFrom(caller, address(this), assets);
        _mint(receiver, shares);

        emit Deposit(caller, receiver, assets, shares);
    }

    function _withdraw(
        address caller,
        address receiver,
        address owner,
        uint256 assets,
        uint256 shares
    ) internal override {
        if (caller != owner) {
            uint256 allowed = allowance(owner, caller);
            require(allowed >= shares, "Allowance exceeded");
            _approve(owner, caller, allowed - shares);
        }

        _burn(owner, shares);

        emit Withdraw(caller, receiver, owner, assets, shares);
    }

}