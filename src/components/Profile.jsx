import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Web3 from "web3";
import contractData from "../contract.json";


const Profile = ({connectedAccount}) => {
import './Profile.css'; 
const Profile = () => {
  const [spendingCredits, setSpendingCredits] = useState(0);
  const [revenueCredits, setRevenueCredits] = useState(0);
  const [isArtist, setIsArtist] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [contract, setContract] = useState(null);
  
  // const [connectedAccount, setConnectedAccount] = useState("");
  const [userData, setUserData] = useState("");
  useEffect(() => {
    console.log("in useeffect",userData);
    // const userDataComponent = (<>
    // <div>
    //   <h1>Profile</h1>
    //   <p>Account Address: {connectedAccount}</p>
    //   <p>Spending Credits: {userData[2]}</p>
    //   {/* <p>Spending Credits: {spendingCredits ? spendingCredits : 0 }</p> */}
      
    //   {/* {isArtist && (
    //     // <button onClick={handleShowRevenueCredits}>
    //     //   Show Revenue Credits : 
    //     // </button>
    //     <button>
    //       Show Revenue Credits : {userData.revenueCredits}
    //     </button>
    //   )} */}

    //   {/* {isArtist && revenueCredits > 0 && (
    //     <p>Revenue Credits: {userData.revenueCredits}</p>
    //     )} */}
    //     {/* <p>Revenue Credits: {userData.revenueCredits ? userData.revenueCredits : 0}</p> */}
    // </div>
    // </>)
    
  },[userData]);

  console.log(userData);
  
  useEffect(() => {
    const connectWallet = async () => {
      try {
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          await window.ethereum.request({ method: "eth_requestAccounts" });
          console.log("Wallet connected");
          // const accounts = await web3.eth.getAccounts();
          // setConnectedAccount(accounts[0]);
          console.log(connectedAccount); 

          setContract(new web3.eth.Contract(contractData.contractABI, contractData.contractAddress))

          await contract.methods.users(connectedAccount).call()
          .then((userData) => {
            setUserData(userData);
            // setSpendingCredits(userData.spendingCredits);
            console.log(".......VSl "+userData[3]); // This will contain the User object for the given address
            setIsUser(userData[0]);
            setIsArtist(userData[1]);
            setSpendingCredits(userData[2]);
            setRevenueCredits(userData[3]);
          })
          .catch((error) => {
            console.error('Error retrieving user data:', error);
          });


        }
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    };

    connectWallet();
  }, []);

  // const handleShowRevenueCredits = () => {
  //   const revenueCreditsForArtist = userData.revenueCredits;
  //   setRevenueCredits(revenueCreditsForArtist);
  // };
  const handleBuyTokens = async => {
    const tokens = document.getElementById('buy-tokens').value;

    contract.methods.buyCredits(tokens).send({
      from: connectedAccount,
      value: tokens * 100000000000000000, // Multiply tokens by conversion factor
      gas: 300000, // Adjust gas limit as needed
    })
    .then((tx) => {
      console.log('Transaction hash:', tx.transactionHash);
    })
    .catch((error) => {
      console.error('Error calling buyCredits:', error);
    });
    console.log(userData);
  }  

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

