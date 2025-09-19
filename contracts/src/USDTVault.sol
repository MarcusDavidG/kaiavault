// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
}

contract USDTVault {
    IERC20 public usdt;
    mapping(address => uint256) public balances;
    uint256 public totalDeposits;

    constructor(address _usdt) {
        usdt = IERC20(_usdt);
    }

    function deposit(uint256 amount) external {
        require(amount > 0, "Amount must be > 0");
        require(usdt.transferFrom(msg.sender, address(this), amount), "USDT transfer failed");
        balances[msg.sender] += amount;
        totalDeposits += amount;
    }

    function withdraw(uint256 amount) external {
        require(amount > 0, "Amount must be > 0");
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        totalDeposits -= amount;
        require(usdt.transfer(msg.sender, amount), "USDT transfer failed");
    }

    function getBalance(address user) external view returns (uint256) {
        return balances[user];
    }
}
