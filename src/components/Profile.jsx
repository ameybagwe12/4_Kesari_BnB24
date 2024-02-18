import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Web3 from "web3";

const Profile = () => {
  const [spendingCredits, setSpendingCredits] = useState(0);
  const [revenueCredits, setRevenueCredits] = useState(0);
  const [isArtist, setIsArtist] = useState(true);
  const [connectedAccount, setConnectedAccount] = useState("");

  useEffect(() => {
    const connectWallet = async () => {
      try {
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          await window.ethereum.request({ method: "eth_requestAccounts" });
          console.log("Wallet connected");
          const accounts = await web3.eth.getAccounts();
          setConnectedAccount(accounts[0]);
          console.log(connectedAccount); 
        }
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    };

    connectWallet();
  }, []);

  const handleShowRevenueCredits = () => {
    const revenueCreditsForArtist = 500;
    setRevenueCredits(revenueCreditsForArtist);
  };

  return (
    <div>
      <h1>Profile</h1>
      <p>Account Address: {connectedAccount}</p>
      <p>Spending Credits: {spendingCredits}</p>
      
      {isArtist && (
        <button onClick={handleShowRevenueCredits}>
          Show Revenue Credits
        </button>
      )}

      {isArtist && revenueCredits > 0 && (
        <p>Revenue Credits: {revenueCredits}</p>
      )}
    </div>
  );
};

export default Profile;
