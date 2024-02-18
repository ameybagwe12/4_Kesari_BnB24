import React from 'react'
import Card from '../components/card'
import Card1 from '../components/Card1'
import './home.css'

function Home({ nfts,nfts1, handlePayment, player }) {
  console.log(`nfts is ${nfts1.length}`)
  return (<>
    <div className='animated-div'   >
    <div className='box'>
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
   
    <div className='home'>
    <div className='nft-list'>
      {nfts1.length ? (
        <div className='card-container'>
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
        <div className='no-nfts'>
          <h1 style={{ color: 'red' }}>No NFTs to display</h1>
        </div>
      )}
    </div>
  </div>


  </div>
  
  </>)
}

export default Home
