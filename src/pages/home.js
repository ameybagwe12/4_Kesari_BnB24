import React from "react";
import Card1 from "../components/Card1";
import SongTab from "./song-tab";
import "./home.css";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { purple } from "@mui/material/colors";
import Web3 from 'web3';
import contractData from '../contract.json'

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

function Home({
  nfts,
  nfts1,
  handlePayment,
  player,
  currentNft,
  setPlayer,
  setCurrentNft,
  connectedAccount,
}) {
  const handleClose = async => {
    setPlayer(false); 
    setCurrentNft(null);
    const web3 = new Web3(window.ethereum); 
    const contract = new web3.eth.Contract(contractData.contractABI, contractData.contractAddress);
    contract.methods.playedSong(currentNft.nftOwner).send({
      from: connectedAccount, // Use the same user address as before
      gas: 210000, // Adjust gas limit if needed
    })
    .then((tx) => {
      console.log('Transaction hash:', tx.transactionHash);
    })
    .catch((error) => {
      console.error('Error calling playedSong:', error);
    });
    return
  }
  console.log(`nfts is ${nfts1.length}`);
  return (
    <>
      <div className="animated-div">
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div className="home">
          <div className="nft-list">
            {nfts1.length ? (
              <div className="card-container">
                {nfts1.map(
                  (nft, index) =>
                    !nft.isSold && (
                      <Card1
                        key={nft.id}
                        nft={nft}
                        handlePayment={handlePayment}
                        player={player}
                      />
                    )
                )}
              </div>
            ) : (
              <div className="no-nfts">
                <h1 style={{ color: "red" }}>No NFTs to display</h1>
              </div>
            )}
          </div>
          {player && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                height: 300,
                backgroundColor: "black",
                borderRadius: 20,
                marginTop: 10,
                marginLeft: 35,
              }}
            >
              <div>
                <Player
                  autoplay
                  loop
                  src={require("../Music.json")}
                  style={{ height: "300px", width: "300px" }}
                >
                  <Controls />
                </Player>
              </div>
              <div className="mt-5">
                <ColorButton
                  variant="contained"
                  onClick={() => {
                    setPlayer(false);
                    setCurrentNft(null);
                    handleClose();
                  }}
                >
                  Close
                </ColorButton>
              </div>
              <div style={{ marginTop: 50 }}>
                <SongTab
                  nft={currentNft}
                  setPlayer={setPlayer}
                  className="m-4"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
