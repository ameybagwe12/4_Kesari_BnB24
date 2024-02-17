import React from 'react'
// import AudioPlayerCard from './audioPlayer'
import ReactAudioPlayer from 'react-audio-player';
import './player.css'


function Player({ nft, setPlayer, setCurrentNft }) {
  return (
    <div className='player-div'>
      {/* {nft.mediaType === 'audio' ? <> */}
      {console.log(nft)}
      {/* <ReactAudioPlayer src={"https://cyan-magnetic-rat-616.mypinata.cloud/ipfs/QmTkVSetCMnf3d4n6WYgtq5GegfGDBcoFDsDRGjpmqnEqe"} autoPlay controls/>  */}
      {/* <ReactAudioPlayer src={nft.nftUrl} autoPlay controls/> */}
      {/* </> : {}} */}
      {nft.mediaType === 'audio' ? <div className="player-card">
            <img src={require(`../thumbnails/${nft.thumbnail}`)} class="card-img-top" alt={nft.nftName}/>
            <div class="card-body">
                <h5 class="card-title text-light">{nft.nftName}</h5>
                <p class="card-text"><ReactAudioPlayer src={nft.nftUrl} autoPlay controls/></p>
            </div>
        <button onClick={() => { setPlayer(false); setCurrentNft(null); return }} className="btn btn-danger m-2" >Close</button>
        </div>:<div className="player-card">
            <div class="card-body">
                <h5 class="card-title text-light">{nft.nftName}</h5>
                <video autoPlay controls width={500}>
                    <source src={nft.nftUrl} type="video/mp4" />
                </video>
            </div>
        <button onClick={() => { setPlayer(false); setCurrentNft(null); return }} className="btn btn-danger m-2" >Close</button>
        </div>}
    </div>
  )
}

export default Player
