import React from 'react'
import axios from 'axios';
import { useState } from 'react';

import key from '../key.json'
import { useEffect } from 'react';
import './mintNFT.css'

function MintNFT({ nfts, setNfts, connectedAccount }) {

    const [nftFile, setNftFile] = useState('');
    const [nftThumbnail, setNftThumbnail] = useState('');
    const [songId, setSongId] = useState(1);

    useEffect(() => {
        console.log(nfts);
    }, [nfts]);

    useEffect(() => {
        console.log("NFT file: ", nftFile);
        console.log("NFT thumbnail: ", nftThumbnail);
        // if(nftFile.type){
        //     if(nftFile.type.startsWith('audio/')){
        //         // newNFT.mediaType = 'audio';
        //         console.log("audio file");
        //     } else if (nftFile.type.startsWith('video/')){
        //         // newNFT.mediaType = 'video';
        //         console.log("video file");
        //     } else {
        //         alert("Invalid file type! Please upload an audio or video file.");
        //     }
        // }
        // const thumbnail = `../thumbnails/${(nfts.length%7) + 1}.jpg`
        // console.log(thumbnail);
    }, [nftFile, nftThumbnail]);

    const handleUpload = async (e) => {
        const nftName = document.getElementById('nft-name').value;
        const nftDescription = document.getElementById('nft-description').value;
        const nftId = songId;
        setSongId(songId+1);
        if(!(nftName && nftDescription &&  nftThumbnail && nftFile)) {
            alert("Fill all the fields")
            return;
        }
        if(!(nftFile.type.startsWith('audio/') && nftThumbnail.type.startsWith('image/'))){
            alert("Check the uploaded file types");
            return;
        }
        console.log("Uploading to IPFS...");
        e.preventDefault();
        try {
            const fileData = new FormData();
            fileData.append("file", nftFile);

            const fileThumbnail = new FormData();
            fileThumbnail.append("file", nftThumbnail);

            const res = await axios({
                method: "post",
                url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                data: fileData,
                headers: {
                    pinata_api_key: key.API_Key,
                    pinata_secret_api_key: key.API_Secret,
                    "Content-Type": "multipart/form-data"
                }
            });
            // https://cyan-magnetic-rat-616.mypinata.cloud/ipfs/Qmc1fus882uTZhJpvsY4xVYRMUV5NAAaqboNeJRomRtaBY
            // console.log(res);
            const fileUrl = "https://cyan-magnetic-rat-616.mypinata.cloud/ipfs/" + res.data.IpfsHash;
            // console.log(fileUrl);
            const nftUrl = fileUrl;

            const thum = await axios({
                method: "post",
                url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                data: fileThumbnail,
                headers: {
                    pinata_api_key: key.API_Key,
                    pinata_secret_api_key: key.API_Secret,
                    "Content-Type": "multipart/form-data"
                }
            });
            const thumUrl = "https://cyan-magnetic-rat-616.mypinata.cloud/ipfs/" + thum.data.IpfsHash;
            const nftOwner = connectedAccount;

            const newNFT = { nftId, nftName, nftDescription, thumUrl, nftUrl, nftOwner }
            setNfts([...nfts, newNFT])
            console.log("NFTS: ", nfts);

        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
            <div className="mintForm">
                <div class="row justify-content-center mintForm-l">
                    <div class="col-sm-8 col-lg-6 col-xl-4 border border-5 rounded shadow p-3 mintForm-l2">
                        <h3 class="fw-bolder text-center">Publish Your Song</h3>
                        <hr />
                        <div class="m-2">
                            <label htmlFor="nft-name" class="form-label fw-bold text-primary">
                                Song name
                            </label>
                            <input type="text" class="form-control" id="nft-name" placeholder="Autumn Scene"
                            />
                        </div>
                        <div class="m-2 mt-3">
                            <label htmlFor="nft-description" class="form-label fw-bold text-primary">Song Description</label>
                            <textarea class="form-control" id="nft-description" rows="3" placeholder="#soothing #nature #autumn"></textarea>
                        </div>
                        <div className='m-2 mt-3'>
                            <label htmlFor="nft-thumbnail" class="form-label fw-bold text-primary">
                                Upload Song thumbnail image
                            </label>
                            <input class="form-control" type="file" id="nft-thumbnail" accept="image/*" onChange={(e) => { setNftThumbnail(e.target.files[0]) }} />
                        </div>
                        <div className='m-2 mt-3'>
                            <label htmlFor="nft-file" class="form-label fw-bold text-primary">
                                Upload Song file (.mp3)
                            </label>
                            <input class="form-control" type="file" id="nft-file" accept="audio/*" onChange={(e) => { setNftFile(e.target.files[0]) }} />
                        </div>
                        <div class="mt-4 mb-3">
                            <button class="btn btn-primary mt-3 shadow" type="submit" id="mint-nft" onClick={handleUpload}> Mint my NFT </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default MintNFT
