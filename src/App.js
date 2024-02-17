import { useEffect, useState } from "react";
import "./App.css";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Web3 from "web3";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import MintNFT from "./pages/mintNFT";
import contractData from "./contract.json";
import SongTab from "./pages/song-tab";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [connectedAccount, setConnectedAccount] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [currentNft, setCurrentNft] = useState(null);
  const [player, setPlayer] = useState(false);

  const [nfts1, setNfts1] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection("music").get();
      setNfts1(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      console.log(nfts1)
    };
    fetchData();
  }, []);

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
    if (netId !== 355113) {
      alert("Please change network to Bitfinity");
      return;
    }
    try {
      if (window.ethereum) {
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
      setCurrentNft(nft);
      setPlayer(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
    <Router>
      <div className="App">
        <Navbar connectedAccount={connectedAccount} player={player} />
        {player && (
          <SongTab nft={currentNft} setPlayer={setPlayer} className='m-4'/>
        )}
        <Routes>
          <Route
            index
            element={
              <Home
                nfts={nfts}
                handlePayment={handlePayment}
                player={player}
              />
            }
          />
          <Route
            path="/mintNFT"
            element={
              <MintNFT
                nfts={nfts}
                setNfts={setNfts}
                connectedAccount={connectedAccount}
              />
            }
          />
        
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
