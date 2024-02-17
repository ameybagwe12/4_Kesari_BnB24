import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Web3 from "web3";

function Navbar({ player }) {
  const [connected, setConnected] = useState(false);
  const [connectedAccount, setConnectedAccount] = useState("");

  async function connectWallet() {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("Wallet connected");
        const accounts = await web3.eth.getAccounts();
        // connectedAccount = accounts[0];
        setConnectedAccount(accounts[0]);
        console.log(connectedAccount);
        setConnected(true);
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  }

  return (
    <nav style={{ backgroundColor: "#581845", height: 100 }} class="navbar ">
      <div class="container-fluid">
        <p class="d-inline-flex gap-1">
          <a
            style={{ color: "#DAF7A6" }}
            class="btn "
            data-bs-toggle="collapse"
            href="#collapseExample"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Connect Your Account
          </a>
        </p>
        {connectedAccount && (
          <div class="collapse" id="collapseExample">
            <div style={{ color: "white" }} class="card card-body">
              {connectedAccount}
            </div>
          </div>
        )}

        <NavLink to="/" style={{ textDecoration: "none" }}>
          <h1
            style={{
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Spoti.Fi
          </h1>
        </NavLink>

        <form class="d-flex" role="search">
          {!connected && (
            <button
              style={{ color: "#DAF7A6" }}
              class="btn m-2"
              type="button"
              onClick={connectWallet}
            >
              Connect wallet
            </button>
          )}
          {!player && (
            <NavLink to="mintNFT">
              <button
                style={{ color: "#DAF7A6" }}
                class="btn m-2"
                type="button"
              >
                Publish your song
              </button>
            </NavLink>
          )}
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
