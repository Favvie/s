import { ethers } from "hardhat";

async function main() {
    const web3CXITokenAddress = "0x1b01a10519942D834059bD300A68811701c284a2";
    const web3CXI = await ethers.getContractAt("IERC20", web3CXITokenAddress);

    const saveERC20ContractAddress = "0x981b2553Db21f00CFC02d1Eb618b9bd9A31E5F91";
    const saveERC20 = await ethers.getContractAt("ISaveERC20", saveERC20ContractAddress);

    // Approve savings contract to spend token
    const approvalAmount = ethers.parseUnits("1000", 18);

    const approveTx = await web3CXI.approve(saveERC20, approvalAmount);
    approveTx.wait();

    const contractBalanceBeforeDeposit = await saveERC20.getContractBalance();
    console.log("Contract balance before :::", contractBalanceBeforeDeposit);

    const depositAmount = ethers.parseUnits("150", 18);
    const depositTx = await saveERC20.deposit(depositAmount);

    console.log(depositTx);

    depositTx.wait();

    const contractBalanceAfterDeposit = await saveERC20.getContractBalance();

    console.log("Contract balance after :::", contractBalanceAfterDeposit);



    // Withdrawal Interaction
    const withdrawAmount = ethers.parseUnits("75", 18);
    const withdrawTx = await saveERC20.withdraw(withdrawAmount);

    console.log(withdrawTx);
    withdrawTx.wait();


    const contractBalanceAfterWithdrawal = await saveERC20.getContractBalance();

    console.log("Contract balance after withdraw :::", contractBalanceAfterWithdrawal);


    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
