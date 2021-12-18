import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CreateNFT from "./components/CreateNFT";

function App() {
  return (
    <React.Fragment>
      <Header />

        <CreateNFT />

      <Footer />
    </React.Fragment>
  );
}

export default App;
