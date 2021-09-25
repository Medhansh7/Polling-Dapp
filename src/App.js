import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
// import Particles from "react-particles-js";
// import ParticleBackground from "./ParticleBackground";

import Web3 from "web3";
import Routes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const [account, setAccount] = useState("0x0");
  const [loading, setLoading] = useState(true);

  let loadweb3 = async () => {
    setLoading(true);
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("No ethereum browser detected");
    }
  };

  const loadblockchainData = async () => {
    const web3 = window.web3;
    const account = await web3.eth.getAccounts();
    setAccount(account[0]);
    const networkId = await web3.eth.net.getId();
  };

  useEffect(() => {
    loadweb3();
    loadblockchainData();
    setLoading(false);
  }, []);

  return (
    <Router>
      
      {loading ? (
        <h2>Data is Loading...</h2>
      ) : (
        <>
    <Navbar account={account} />
        <div className="App">
          <header className="App-header">
            <Routes />
          </header>
        </div>
        </>
        
      )}
    </Router>
  );
}

export default App;
