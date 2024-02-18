import React from 'react'
import './card.css'

function Card({ nft, handlePayment, player }) {
    return (
        // <div className='card m-5'>
        //     <div className="card-img">
        //         <img src={require(`../thumbnails/${nft.thumbnail}`)} className='card-img-top card-img' alt={nft.nftName} />
        //     </div>
        //     <div className="card-body">
        //         <h5 className='card-title'>{nft.nftName}</h5>
        //         <p className='card-text'>{nft.nftDescription}</p>
        //         <p className='card-text'>Price: {nft.nftPrice} BFT</p>
        //         {!player && (nft.mediaType === "audio" ? <button onClick={() => { console.log("hear me"); handlePayment(nft) }} className='btn btn-primary'>Hear Audio</button> : <button onClick={() => { console.log("watch me"); handlePayment(nft) }} className='btn btn-primary'>Watch video</button>)}
        //     </div>
        // </div>
        <div className="card">
            <img src={nft.thumbnailUrl} class="card-img-top" alt={nft.nftName}/>
            <div class="card-body">
                <h5 class="card-title">{nft.nftName}</h5>
                <p class="card-text">{nft.nftDescription}</p>
                <p class="card-text">Price: {nft.nftPrice} BFT</p>
                {!player && <button onClick={() => { console.log("hear me"); handlePayment(nft) }} className='btn btn-primary'>Play</button>}
                {/* {!player && (nft.mediaType === "audio" ? <button onClick={() => { console.log("hear me"); handlePayment(nft) }} className='btn btn-primary'>Hear Audio</button> : <button onClick={() => { console.log("watch me"); handlePayment(nft) }} className='btn btn-primary'>Watch video</button>)} */}
            </div>
        </div>
    )
}

export default Card
