import { useEffect, useState } from "react";
import "./App.css";

import Web3 from "web3";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Player from "./components/player";
import Home from "./pages/home";
import MintNFT from "./pages/mintNFT";
import contractData from "./contract.json";


function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [connectedAccount, setConnectedAccount] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [currentNft, setCurrentNft] = useState(null)
  const [player, setPlayer] = useState(false);
  useEffect(() => {
    console.log("Account: ", connectedAccount);
  }, [connectedAccount]);
  

  useEffect(() => {
    async function connectToMetaMask() {
      try {
        if (window.ethereum) {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          console.log("Accounts: ", accounts);

          if (accounts.length > 0) {
            setIsConnected(true);
            console.log("MetaMask connected!");
            setConnectedAccount(accounts[0]);
            setConnectedAccount(accounts[0]);
          } else {
            console.log("No accounts found in MetaMask");
          }
        } else {
          console.log("Please install MetaMask");
        }
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    }
    connectToMetaMask();
  }, []);

  const handlePayment = async (nft) => {
    const web3 = new Web3(window.ethereum);
    var netId = await web3.eth.net.getId(); // Ensure network is loaded
    netId = parseInt(netId, 10);
    console.log(`network id : ${netId}`);
    // console.log(typeof(netId));
    if(netId !== 355113){
      alert("Please change network to Bitfinity");
      return;
    }
    try {
      if (window.ethereum) {
        // const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("Wallet connected");
        const accounts = await web3.eth.getAccounts();
        setConnectedAccount(accounts[0]);
        console.log(connectedAccount);
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
    const amount = nft.nftPrice;
    const receiverAddress = contractData.owner;
    try {
      const trxnObj = {
        from: connectedAccount,
        to: receiverAddress,
        value: amount,
        gas: "30000",
      };
      const trxn = await web3.eth.sendTransaction(trxnObj);
      const trxnHash = trxn.transactionHash;
      console.log("Transaction sent.\n Hash: ", trxnHash);
      alert("Transaction successful!");
      console.log(nft);
      let currNft = nft;
      console.log("Curr nft: ", currNft);
      setCurrentNft(nft);
      setPlayer(true);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="App">
        <BrowserRouter>
          <Navbar connectedAccount={connectedAccount} player={player}/>
          {player && (
            <Player
              nft={currentNft}
              setPlayer={setPlayer}
              setCurrentNft={setCurrentNft}
            />
          )}
          <div>
            <Routes>
              <Route index element={<Home nfts={nfts} handlePayment={handlePayment} player={player}/>} />
              {!player && (
                <Route
                  path="/mintNFT"
                  element={<MintNFT nfts={nfts} setNfts={setNfts} />}
                />
              )}
            </Routes>
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
