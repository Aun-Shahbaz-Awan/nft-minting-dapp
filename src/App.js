import React from "react";
import { Switch, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CreateNFT from "./components/CreateNFT";
import Explore from "./components/Explore";
import Guide from "./components/Guide";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="/create" component={CreateNFT} />
        <Route path="/guide" component={Guide}/>
        <Route path="/" component={Explore}/>
      </Switch>
      <Footer />
    </React.Fragment>
  );
}

export default App;
