import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Web3 from "web3";
import contractData from "../contract.json";


const Profile = ({connectedAccount}) => {
  const [spendingCredits, setSpendingCredits] = useState(0);
  const [revenueCredits, setRevenueCredits] = useState(0);
  const [isArtist, setIsArtist] = useState(false);
  
  // const [connectedAccount, setConnectedAccount] = useState("");
  const [userData, setUserData] = useState(null);
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

          const contract = new web3.eth.Contract(contractData.contractABI, contractData.contractAddress);

          await contract.methods.users(connectedAccount).call()
          .then((userData) => {
            setUserData(userData);
            // setSpendingCredits(userData.spendingCredits);
            console.log(userData[2]); // This will contain the User object for the given address
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

  return (
    // <></>
    <div>
      <h1>Profile</h1>
      {connectedAccount && <>
        <p>Account Address: {connectedAccount}</p>
        {/* <p>Spending Credits: {Number(userData[2])}</p> */}
      </>}
      {/* <p>Revenue Credits: {Number(userData[3])}</p> */}
      {/* <p>Spending Credits: {spendingCredits ? spendingCredits : 0 }</p> */}
      
      {/* {isArtist && (
        // <button onClick={handleShowRevenueCredits}>
        //   Show Revenue Credits : 
        // </button>
        <button>
          Show Revenue Credits : {userData.revenueCredits}
        </button>
      )} */}

      {/* {isArtist && revenueCredits > 0 && (
        <p>Revenue Credits: {userData.revenueCredits}</p>
        )} */}
        {/* <p>Revenue Credits: {userData.revenueCredits ? userData.revenueCredits : 0}</p> */}
    </div>
  );
};

export default Profile;
