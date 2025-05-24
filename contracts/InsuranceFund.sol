// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InsuranceFund {
    mapping(address => uint256) public premiums;
    mapping(address => uint256) public pendingPayouts;
    mapping(address => bool) private hasPaid;
    address[] public insureds;

    event PremiumPaid(address indexed insured, uint256 amount);
    event PayoutRegistered(address indexed insured, uint256 amount);
    event PayoutClaimed(address indexed insured, uint256 amount);

    function payPremium() external payable {
        require(msg.value > 0, "Must send ETH");
        premiums[msg.sender] += msg.value;

        if (!hasPaid[msg.sender]) {
            insureds.push(msg.sender);
            hasPaid[msg.sender] = true;
        }

        emit PremiumPaid(msg.sender, msg.value);
    }

    function registerPayout(address insured, uint256 amount) external {
        require(amount > 0, "Payout must be greater than zero");
        require(premiums[insured] > 0, "Insured has no premiums");
        pendingPayouts[insured] += amount;

        emit PayoutRegistered(insured, amount);
    }

    function claimPayout() external {
        uint256 payoutAmount = pendingPayouts[msg.sender];
        require(payoutAmount > 0, "No pending payouts");
        require(
            address(this).balance >= payoutAmount,
            "Insufficient contract funds"
        );

        pendingPayouts[msg.sender] = 0; // **State update first**
        payable(msg.sender).transfer(payoutAmount); // **ETH transfer last**

        emit PayoutClaimed(msg.sender, payoutAmount);
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
