// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/USDTVault.sol";

contract MockUSDT {
    mapping(address => uint256) public balanceOf;

    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        require(balanceOf[from] >= amount, "Not enough balance");
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        return true;
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        require(balanceOf[msg.sender] >= amount, "Not enough balance");
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        return true;
    }

    function mint(address to, uint256 amount) external {
        balanceOf[to] += amount;
    }
}

contract USDTVaultTest is Test {
    USDTVault vault;
    MockUSDT usdt;

    address user = address(0x123);

    function setUp() public {
        usdt = new MockUSDT();
        vault = new USDTVault(address(usdt));
        usdt.mint(user, 1000e6);
    }

    function testDepositWithdraw() public {
        vm.startPrank(user);

        usdt.transferFrom(user, address(vault), 500e6);
        vault.deposit(500e6);

        assertEq(vault.getBalance(user), 500e6);
        assertEq(vault.totalDeposits(), 500e6);

        vault.withdraw(200e6);
        assertEq(vault.getBalance(user), 300e6);

        vm.stopPrank();
    }
}
