const { expect } = require("chai");
const { ethers } = require("hardhat");

let nftContract;
let stContract;

let owner, addr1, otheraccounts;


describe("STG Contract Testing", function () {

  beforeEach(async () => {
    
    [owner, addr1, ...otheraccounts] = await ethers.getSigners();      
    
    const ogSt = await ethers.getContractFactory('Skulltoons');
    stContract = await ogSt.deploy();    
    await stContract.deployed();        

    const nftContractFactory = await ethers.getContractFactory('SkulltoonsGenesis');    
    console.log(stContract.address);
    nftContract = await nftContractFactory.deploy('asdf', 'asdf',stContract.address);            
  });

  describe("MerkleTree Testing", async () => {
    it("tests addy in merkle with proof", async () => {
      await nftContract.setCurrentPhase(1);    
      await nftContract.setWlRoot("0xf902197f07496ac21eade8628c038d2652b6253db2a177eb13b0cfbdebdc8a3a");
      await nftContract.setSlRoot("0xf97cdd0310fcf9c087fd9a5223ff78089451ddd56f22169f8b849e21e478545c");
      await nftContract.preSaleMint(        
        ["0xcc1b7dd97017f719aa1f5d7ee59402f58cbb9ab1499e6e62cdddc6b382414878"],
        ["0xc721f244f97210c21991f058c556eee3c7a57e8b0971954398aa42cab76a60bb"]
      );
      const owner1Balance = await nftContract.balanceOf(owner.address);
      expect(owner1Balance).to.equal(2);
    })
  })
  // describe("Phase testing", () => {
  //   it("Sets phase to not active", async function () {
  //     await nftContract.setCurrentPhase(0);              
  //     expect(await nftContract.getCurrentPhase()).to.equal("NOT_ACTIVE");
  
  //   });

  //   it("Sets phase to pre-sale", async function () {
  //     await nftContract.setCurrentPhase(1);              
  //     expect(await nftContract.getCurrentPhase()).to.equal("PRE_SALE");
  
  //   });

  //   it("Sets phase to token holders sale", async function () {      
  //     await nftContract.setCurrentPhase(2);              
  //     expect(await nftContract.getCurrentPhase()).to.equal("SKULL_TOON_HOLDERS_MINT");  
  //   });


  //   it("Sets phase to public sale", async function () {      
  //     await nftContract.setCurrentPhase(3);              
  //     expect(await nftContract.getCurrentPhase()).to.equal("PUBLIC");  
  //   });


  //   it("Should not let you presale mint because the phase is not in presale", async () => {      
  //     await nftContract.setCurrentPhase(0);
  //     await expect(nftContract.preMint(2, test_proof)).to.be.revertedWith('Cannot premint - contract is not in premint phase');  
  //   });

  //   it("Should not let you token required mint because the phase is not in token holders", async () => {      
  //     await nftContract.setCurrentPhase(0);
  //     await expect(nftContract.tokenRequiredMint()).to.be.revertedWith('Cannot call tokenRequiredMint - phase is not set to token holders mint');  
  //   });

  //   it("Should not let you public mint because the phase is not in public", async () => {      
  //     await nftContract.setCurrentPhase(0);
  //     await expect(nftContract.publicMint(1)).to.be.revertedWith('Cannot call PublicMint - phase is not set to public mint');  
  //   });
  // });
    
  // describe("Presale Mint testing", async () => {
  //   beforeEach(async () => {
  //     await nftContract.setCurrentPhase(1);
  //   });

  //   it("Should fail to mint zero SkulltoonsGenesis token quantity", async () => {      
  //     await expect(nftContract.connect(addr1).preMint(0, test_proof)).to.be.revertedWith('MintZeroQuantity');   
  //   });

  //   it("Should mint 1 SkulltoonsGenesis token - wallet has 5 skulltoons - not on whitelist, not on special list", async () => {
  //     await stContract.connect(addr1).mint(5);

  //     await nftContract.connect(addr1).preMint(1, test_proof);
  //     const addr1Balance = await nftContract.balanceOf(addr1.address);
  //     expect(addr1Balance).to.equal(1);
  //   });

  //   it("Should mint 2 SkulltoonsGenesis token - wallet has 10 skulltoons - not on whitelist, not on special list", async () => {
  //     await stContract.connect(addr1).mint(10);

  //     await nftContract.connect(addr1).preMint(2, test_proof);
  //     const addr1Balance = await nftContract.balanceOf(addr1.address);
  //     expect(addr1Balance).to.equal(2);
  //   });

  //   it("Should fail to mint 2 SkulltoonsGenesis token - wallet has 5 skulltoons - not on whitelist, not on special list", async () => {
  //     await stContract.connect(addr1).mint(5);
  //     await expect(nftContract.connect(addr1).preMint(2, test_proof)).to.be.revertedWith('This address cannot mint quantity requested');      
  //   });

  //   it("Should fail to mint 3 SkulltoonsGenesis token - wallet has 10 skulltoons - not on whitelist, not on special list", async () => {
  //     await stContract.connect(addr1).mint(10);
  //     await expect(nftContract.connect(addr1).preMint(3, test_proof)).to.be.revertedWith('This address cannot mint quantity requested');      
  //   });
  // });

  // describe("Token Mint testing", async () => {
  //   beforeEach(async () => {
  //     await nftContract.setCurrentPhase(2);
  //   });
    
  //   it("Should mint 1 SkulltoonsGenesis token", async () => {
  //     await stContract.connect(addr1).mint(5);

  //     await nftContract.connect(addr1).tokenRequiredMint();
  //     const addr1Balance = await nftContract.balanceOf(addr1.address);
  //     expect(addr1Balance).to.equal(1);
  //   });

  //   it("Should fail to mint SkulltoonsGenesis token - no skulltoon tokens in wallet", async () => {      
  //     await expect(nftContract.connect(addr1).tokenRequiredMint()).to.be.revertedWith("Cannot Mint - no skulltoon token found at wallet address");      
  //   });

  //   it("Should fail to mint SkulltoonsGenesis token - already minted", async () => {      
  //     await stContract.connect(addr1).mint(1);
  //     await nftContract.connect(addr1).tokenRequiredMint();
  //     await expect(nftContract.connect(addr1).tokenRequiredMint()).to.be.revertedWith("This address cannot mint quantity requested");      
  //   });
  // })

  // describe("Public Mint testing", async () => {
  //   beforeEach(async () => {
  //     await nftContract.setCurrentPhase(3);
  //   });
    
  //   it("Should mint 1 SkulltoonsGenesis token", async () => {
  //     await nftContract.connect(addr1).publicMint(1);
  //     const addr1Balance = await nftContract.balanceOf(addr1.address);
  //     expect(addr1Balance).to.equal(1);
  //   });

  //   it("Should fail to mint SkulltoonsGenesis token - larger than public mint amount", async () => {      
  //     await nftContract.connect(addr1).publicMint(1);            
  //     await expect(nftContract.connect(addr1).publicMint(1)).to.be.revertedWith("Cannot mint more than Max Mint Count");      
  //   });    
  // })
  

});
