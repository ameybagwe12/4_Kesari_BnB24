import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Web3 from "web3";
import './Profile.css'; 
const Profile = () => {
  const [spendingCredits, setSpendingCredits] = useState(0);
  const [revenueCredits, setRevenueCredits] = useState(0);
  const [isArtist, setIsArtist] = useState(true);
  const [connectedAccount, setConnectedAccount] = useState("");
  const [borderColor, setborderColor] = useState('borderAnimation1');
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
  
     

      <div   className="verify-parent-container"  >
  <div className="verify-a"  style={{animation: `${borderColor} 2s linear infinite`}}> 
  <h2 className='h-style' > PROFILE</h2>
        


    <div>
      <p className='p-status' style={{ color: "#fff;", textAlign: "left" }}><b>Address :</b>{connectedAccount} <br /><b>Spend :</b> {spendingCredits} </p>
      {isArtist && (
        <div style={{    position: "absolute",
            top: "205px",
            
        }}>
          <button onClick={handleShowRevenueCredits}>
            Show Revenue Credits
          </button>
    
          {revenueCredits > 0 && (
            <p className='p-status' style={{ color: "#fff;", textAlign: "left" ,    width: "200%",
            position: "absolute",
            top: "35px"
        }}>Revenue Credits: {revenueCredits}</p>
          )}
        </div>
      )}
      </div>
  </div>

  <div className="verify-b">
  
  <div className='verify-container'>
  <h2 className='h-style' > BUY TOKEN</h2>
  <img src='https://i.imgur.com/FfImHx2.png'style={{width: "51%"}} alt="buy token"/>
  <input type="number" className='input' name='message' id="message" ></input>
  <button className='button' >Buy</button>

</div>
  </div>
</div>


  );
};

export default Profile;

