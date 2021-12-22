import React from "react";

function Guide() {
  return (
    <React.Fragment>
      <div className="p-7 mx-3 my-7 md:mx-32 lg:mx-56 bg-secondary rounded-lg">
        <h1 className="text-2xl font-semibold mb-2">
          Create or Mint your NFT(Non-Fungible Tokens) with this Minter dApp
        </h1>
        <p className="text-lg mb-10">
          NFT minter dApp is a simple UI (user interface) where you can input
          information about your NFT or digital creation. For example, you can
          add a title, description, digital asset data to your NFT.
        </p>
        <h3 className="text-lg font-semibold">You should need:</h3>

        <p>
          Connect and Authenticate with <span className="">MetaMask</span>.{" "}
        </p>
      </div>
    </React.Fragment>
  );
}

export default Guide;
