// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract ReceivePremium {

    mapping(address => uint256) public premiums;
    address[] public insureds;
    mapping(address => bool) private hasPaid;

    function payPremium() external payable {
        require(msg.value > 0, "Must send ETH");
        premiums[msg.sender] += msg.value;
        if (!hasPaid[msg.sender]) {
            insureds.push(msg.sender);
            hasPaid[msg.sender] = true;
        }
    }
}
