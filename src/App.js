import React from "react";
import { Switch, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CreateNFT from "./components/CreateNFT";
import Explore from "./components/Explore";
import Guide from "./components/Guide";
// wallets
import WalletConnectProvider from "@walletconnect/web3-provider";
import DcentProvider from "dcent-provider";
import Fortmatic from "fortmatic";
// --
import { ethers } from "ethers";
import Web3Modal from "web3modal";

function App() {
  let signer = null;
  // Connect Wallet
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "bcbc76eeffa9478994444b1339f73039", // required "Infura ID"
      },
    },
    dcentwallet: {
      package: DcentProvider, // required
      options: {
        rpcUrl: "https://rinkeby.infura.io/v3/bcbc76eeffa9478994444b1339f73039", // required "INSERT_RPC_URL"
      },
    },
    fortmatic: {
      package: Fortmatic, // required
      options: {
        key: "pk_test_BC2070C05288F45E", // required "FORTMATIC_KEY"
      },
    },
  };

  const handleConnectWallet = async (wallet) => {
    try {
      if (wallet === "metamask") {
        const web3Modal = new Web3Modal({});
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        signer = signer = provider.getSigner();
      } else {
        const web3Modal = new Web3Modal({ providerOptions });
        const provider = await web3Modal.connectTo(wallet);
        signer = provider.getSigner();
      }
    } catch (error) {
      console.log("error:", error);
    }
    console.log(wallet);
    console.log("Signer:", signer);
  };

  return (
    <React.Fragment>
      <Header connectWallet={handleConnectWallet} signer={signer} />
      <Switch>
        <Route path="/create" component={CreateNFT} signer={signer} />
        <Route path="/guide" component={Guide} />
        <Route path="/" component={Explore} />
      </Switch>
      <Footer />
    </React.Fragment>
  );
}

export default App;
