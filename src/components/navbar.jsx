import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Web3 from 'web3';

function Navbar({ player }) {

    const [connected, setConnected] = useState(false);
    const [connectedAccount, setConnectedAccount] = useState('');

    async function connectWallet() {
        try {
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                console.log("Wallet connected");
                const accounts = await web3.eth.getAccounts()
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
        <nav class="navbar bg-body-tertiary">
            <div class="container-fluid">
                <NavLink to="/" style={{ textDecoration: 'none' }}>
                    <h1 className='text-body-secondary'>Spoti.Fi</h1>
                </NavLink>
                <form class="d-flex" role="search">
                {!connected && <button class="btn btn-success m-2" type="button" onClick={connectWallet}>Connect wallet</button>}
                    {!player && <NavLink to="mintNFT">
                        <button class="btn btn-info m-2" type="button" >Publish your song</button>
                    </NavLink>}
                </form>
            </div>
            <p className='lead m-2'> <small className='text-body-secondary'>Connected account: </small><strong className='connected-account'>{connectedAccount}</strong></p>
        </nav>
    )
}

export default Navbar
