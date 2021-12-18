const hre = require("hardhat");
const fs = require('fs');

async function main() {
  // Deploying NFT Minter One Contract
  const MinterOne = await hre.ethers.getContractFactory("NFTMinterOne");
  const minter1 = await MinterOne.deploy();
  await minter1.deployed();
  console.log("NFT Minter One deployed to:", minter1.address);
  // Deploying NFT Minter Two Contract
  const MinterTwo = await hre.ethers.getContractFactory("NFTMinterTwo");
  const minter2 = await MinterTwo.deploy();
  await minter2.deployed();
  console.log("NFT Minter Two deployed to:", minter2.address);
  // Getting Market & NFT Contract Addresses
  let config = `
  export const NFTMinterOneAddress = "${minter1.address}"
  export const NFTMinterTwoAddress = "${minter2.address}"
  `
  // Generating 'config.js' file that contain NFT Market & NFT  Addresses
  let data = JSON.stringify(config)
  fs.writeFileSync('config.js', JSON.parse(data))
}

// We recommend this pattern to be able to use async/await everywhere and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });