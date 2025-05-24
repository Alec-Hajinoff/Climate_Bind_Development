// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./ReceivePremiums.sol";

contract Payouts {

    mapping(address => uint256) public pendingPayouts;

    ReceivePremiums private premiumContract;

    constructor(address _premiumContract) {
        premiumContract = ReceivePremiums(_premiumContract);
    }

    function registerPayout(address insured, uint256 amount) external {
        require(amount > 0, "Payout must be greater than zero");
        pendingPayouts[insured] += amount;
    }

    function claimPayout() external {
        uint256 payoutAmount = pendingPayouts[msg.sender];
        require(payoutAmount > 0, "No pending payouts");
        uint256 premiumBalance = premiumContract.getBalance();
        require(premiumBalance >= payoutAmount, "Insufficient funds in ReceivePremiums");
        pendingPayouts[msg.sender] = 0;
        payable(msg.sender).transfer(payoutAmount);
    }

    receive() external payable {} // Enables the contract to receive Ether for payouts
}
