// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  await run("compile");
    // We get the contract to deploy
    const nftContractFactory = await ethers.getContractFactory('SkulltoonsGenesis');
    const nftContract = await nftContractFactory.deploy(
      'ipfs://QmPfRZHM5gvVdB7nJPwkoDoYnhRx3DyWfNeVZ5qRMkJ9az/', 
      'ipfs://QmUqUmvCNjS6hrkhxaV3QcXspL3Wohm84SCcnqHCXpv46c/hidden.json', 
      '0x2b841d4b7ca08D45Cc3DE814de08850dC3008c43',
      '0x579c2278892d1896a648043945c878af0f9c4282786b0064a24b51e81f86fd6b'
      );
    await nftContract.deployed();    
  
    console.log("Contract deployed to:", nftContract.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });