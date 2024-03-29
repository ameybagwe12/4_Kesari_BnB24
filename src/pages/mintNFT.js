import React, { useState } from "react";
import axios from "axios";
import db from "../firebase.js";
import key from "../key.json";
import "./mintNFT.css";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import Web3 from 'web3';
import contractData from '../contract.json'

function MintNFT({ nfts, setNfts, connectedAccount }) {
  const [nftFile, setNftFile] = useState("");
  const [nftThumbnail, setNftThumbnail] = useState("");
  const [songId, setSongId] = useState(1);

  const web3 = new Web3(window.ethereum); 
  const contract = new web3.eth.Contract(contractData.contractABI, contractData.contractAddress);
  contract.methods.addArtist().send({
    from: connectedAccount, // Use the address that wants to become an artist
    gas: 210000, // Adjust gas limit if needed
  })
  .then((tx) => {
    console.log('Transaction hash:', tx.transactionHash);
  })
  .catch((error) => {
    console.error('Error calling addArtist:', error);
  });

  const handleUpload = async (e) => {
    e.preventDefault();
    const nftName = document.getElementById("nft-name").value;
    const nftDescription = document.getElementById("nft-description").value;
    const nftId = songId;

    setSongId(songId + 1);
    if (!(nftName && nftDescription && nftThumbnail && nftFile)) {
      alert("Please fill in all fields");
      return;
    }
    if (
      !nftFile.type.startsWith("audio/") ||
      !nftThumbnail.type.startsWith("image/")
    ) {
      alert(
        "Invalid file types. Please upload an audio file and an image thumbnail."
      );
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", nftFile);

      const thumbnailData = new FormData();
      thumbnailData.append("file", nftThumbnail);

      const res = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: key.API_Key,
          pinata_secret_api_key: key.API_Secret,
          "Content-Type": "multipart/form-data",
        },
      });

      const fileUrl = `https://cyan-magnetic-rat-616.mypinata.cloud/ipfs/${res.data.IpfsHash}`;

      const thumbnailRes = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: thumbnailData,
        headers: {
          pinata_api_key: key.API_Key,
          pinata_secret_api_key: key.API_Secret,
          "Content-Type": "multipart/form-data",
        },
      });

      const thumbnailUrl = `https://cyan-magnetic-rat-616.mypinata.cloud/ipfs/${thumbnailRes.data.IpfsHash}`;

      const newNFT = {
        nftId,
        nftName,
        nftDescription,
        thumbnailUrl,
        nftUrl: fileUrl,
        nftOwner: connectedAccount,
      };

      setNfts([...nfts, newNFT]);

      db.collection("music")
        .add({
          nftDescription,
          nftName,
          nftUrl: fileUrl,
          nftOwner: connectedAccount,
          thumbnailUrl,
          nftId,
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#C40BDB",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div
        className="card"
        style={{
          backgroundColor: "#F493A8",
          width: "500px",
          height: "600px",
          marginTop: 60,
          marginLeft: 100,
          borderColor: "white",
          borderWidth: 2,
        }}
      >
        <div className="card-body">
          <h3 style={{ color: "white" }} className="card-title mb-4">
            Publish Your Song
          </h3>
          <form onSubmit={handleUpload}>
            <div className="mb-3">
              <label
                style={{ color: "white" }}
                htmlFor="nft-name"
                className="form-label"
              >
                Song Name
              </label>
              <input
                type="text"
                className="form-control"
                id="nft-name"
                placeholder="Enter song name"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="nft-description"
                style={{ color: "white" }}
                className="form-label"
              >
                Song Description
              </label>
              <textarea
                className="form-control"
                id="nft-description"
                rows="3"
                placeholder="Enter song description"
              ></textarea>
            </div>
            <div className="mb-3">
              <label
                style={{ color: "white" }}
                htmlFor="nft-thumbnail"
                className="form-label"
              >
                Upload Song Thumbnail Image
              </label>
              <input
                type="file"
                className="form-control"
                id="nft-thumbnail"
                accept="image/*"
                onChange={(e) => setNftThumbnail(e.target.files[0])}
              />
            </div>
            <div className="mb-3">
              <label
                style={{ color: "white" }}
                htmlFor="nft-file"
                className="form-label"
              >
                Upload Song File (.mp3)
              </label>
              <input
                type="file"
                className="form-control"
                id="nft-file"
                accept="audio/*"
                onChange={(e) => setNftFile(e.target.files[0])}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Publish
            </button>
          </form>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "white",
          width: 400,
          height: 400,
          marginLeft: 500,
          marginTop: 200,
        }}
      >
        <Player
          autoplay
          loop
          src={require("../Block.json")}
          style={{ height: "400px", width: "400px" }}
        >
          <Controls />
        </Player>
      </div>
    </div>
  );
}

export default MintNFT;
