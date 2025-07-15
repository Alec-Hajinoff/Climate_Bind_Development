// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

contract InsuranceFund {
    mapping(address => uint256) public premiums; // Mapping address-to-integer to store premiums for each insured
    mapping(address => uint256) public pendingPayouts;
    mapping(address => bool) private hasPaid;
    address[] public insureds; // Array to keep track of insured addresses

    event PremiumPaid(address indexed insured, uint256 amount); // Event emitted when a premium is paid
    event PayoutRegistered(address indexed insured, uint256 amount);
    event PayoutClaimed(address indexed insured, uint256 amount);

    function payPremium() external payable {
        // Function to pay premium and register insured
        require(msg.value > 0, "Must send ETH");
        premiums[msg.sender] += msg.value;

        if (!hasPaid[msg.sender]) {
            insureds.push(msg.sender);
            hasPaid[msg.sender] = true;
        }

        emit PremiumPaid(msg.sender, msg.value);
    }

    function registerPayout(address insured, uint256 amount) external {
        // Function to register a pending payout for an insured address
        require(amount > 0, "Payout must be greater than zero");
        require(premiums[insured] > 0, "Insured has no premiums");
        pendingPayouts[insured] += amount; // 'insured' is the function parameter, it's not related to the 'insureds' array

        emit PayoutRegistered(insured, amount);
    }

    function claimPayout(address insured) external {
        // Function to claim a registered payout
        uint256 payoutAmount = pendingPayouts[insured];
        require(payoutAmount > 0, "No pending payout");
        require(address(this).balance >= payoutAmount, "Insufficient funds"); // 'this' is the contract itself

        pendingPayouts[insured] = 0;
        payable(insured).transfer(payoutAmount);

        emit PayoutClaimed(insured, payoutAmount);
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}

/*
pragma solidity ^0.8.0;

contract InsuranceFund {
    mapping(address => uint256) public premiums; // Mapping address-to-integer to store premiums for each insured
    mapping(address => uint256) public pendingPayouts;
    mapping(address => bool) private hasPaid;
    address[] public insureds; // Array to keep track of insured addresses

    event PremiumPaid(address indexed insured, uint256 amount); // Event emitted when a premium is paid
    event PayoutRegistered(address indexed insured, uint256 amount);
    event PayoutClaimed(address indexed insured, uint256 amount);

    function payPremium() external payable { // Function to pay premium and register insured
        require(msg.value > 0, "Must send ETH");
        premiums[msg.sender] += msg.value;

        if (!hasPaid[msg.sender]) {
            insureds.push(msg.sender);
            hasPaid[msg.sender] = true;
        }

        emit PremiumPaid(msg.sender, msg.value);
    }

    function registerPayout(address insured, uint256 amount) external { // Function to register a pending payout for an insured address
        require(amount > 0, "Payout must be greater than zero");
        require(premiums[insured] > 0, "Insured has no premiums");
        pendingPayouts[insured] += amount; // 'insured' is the function parameter, it's not related to the 'insureds' array

        emit PayoutRegistered(insured, amount);
    }

    function claimPayout() external { // Function to claim a registered payout
        uint256 payoutAmount = pendingPayouts[msg.sender];
        require(payoutAmount > 0, "No pending payouts");
        require(
            address(this).balance >= payoutAmount, // 'this' is the contract itself
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
*/
