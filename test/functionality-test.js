describe("NFT Minting DAPP", function () {
  it("Should Mint and Return Token URI", async function () {
    /* Deploy Minter One Contract */
    const M1 = await ethers.getContractFactory("NFTMinterOne");
    const m1 = await M1.deploy();
    await m1.deployed();
    const MinterOneAddress = m1.address;
    console.log("Minter One Address:", MinterOneAddress)

    /* Deploy Minter Two Contract */
    const M2 = await ethers.getContractFactory("NFTMinterTwo");
    const m2 = await M2.deploy();
    await m2.deployed();
    const MinterTwoAddress = m2.address;
    console.log("Minter Two Address:", MinterTwoAddress);

    /* Create Two Tokens */
    await m1.createToken(
      "https://ipfs.moralis.io:2053/ipfs/QmYGCPJ3w79CmVTyxP1gX5XcBto65SiCbzTCvoJS37nVYE"
    );
    await m2.createToken(
      "https://ipfs.moralis.io:2053/ipfs/QmaqywEa4ehkybUTb653oQgeJTQoDQqJbKoS2tNVDngMwy"
    );

    /* Getting Both Tokens*/
    const tokenOne = await m1.tokenURI(1);
    const tokenTwo = await m2.tokenURI(1);

    /*Display both Tokens*/
    console.log("Token From Minter 1: ", tokenOne);
    console.log("Token From Minter 2: ", tokenTwo);
  });
});
