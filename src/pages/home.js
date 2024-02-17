import React from 'react'
import Card from '../components/card'
import './home.css'

function Home({ nfts, handlePayment, player }) {
  return (
    <div className='home'>
      <div className="nft-list">
        {nfts.length ? (nfts.map(
          (nft, index) =>
            !nft.isSold && (
              <Card
                key={nft.id}
                nft={nft}
                handlePayment={handlePayment}
                player={player}
              />
            )
        )) : <div className='no-nfts'><h1>No NFTs to display</h1></div>}
      </div>
    </div>
  )
}

export default Home
