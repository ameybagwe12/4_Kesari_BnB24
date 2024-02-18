import React from "react";
import Card1 from "../components/Card1";
import SongTab from "./song-tab";
import "./home.css";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

function Home({ nfts, nfts1, handlePayment, player, currentNft, setPlayer }) {
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
                height: 800,
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
