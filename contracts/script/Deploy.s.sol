// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/USDTVault.sol";

contract DeployUSDTVault is Script {
    function run() external {
        vm.startBroadcast();

        // TODO: Replace with Kaia testnet USDT contract address
        address usdt = 0x0000000000000000000000000000000000000000;

        USDTVault vault = new USDTVault(usdt);

        console.log("USDTVault deployed at:", address(vault));

        vm.stopBroadcast();
    }
}
