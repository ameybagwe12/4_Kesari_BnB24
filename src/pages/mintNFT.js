import React from 'react'
import axios from 'axios';
import { useState } from 'react';

import key from '../key.json'
import { useEffect } from 'react';
import './mintNFT.css'

function MintNFT({ nfts, setNfts }) {

    const [nftFile, setNftFile] = useState('');

    useEffect(() => {
        console.log(nfts);
    }, [nfts]);

    useEffect(() => {
        console.log("NFT file: ", nftFile);
        if(nftFile.type){
            if(nftFile.type.startsWith('audio/')){
                // newNFT.mediaType = 'audio';
                console.log("audio file");
            } else if (nftFile.type.startsWith('video/')){
                // newNFT.mediaType = 'video';
                console.log("video file");
            } else {
                alert("Invalid file type! Please upload an audio or video file.");
            }
        }
        const thumbnail = `../thumbnails/${(nfts.length%7) + 1}.jpg`
        console.log(thumbnail);
    }, [nftFile]);

    const handleUpload = async (e) => {
        const nftName = document.getElementById('nft-name').value;
        const nftDescription = document.getElementById('nft-description').value;
        const nftPrice = parseInt(document.getElementById('nft-price').value);
        if(!(nftName && nftDescription &&  nftPrice && nftFile)) {
            alert("Fill all the fields")
            return;
        }
        const start = performance.now();
        console.log("Uploading to IPFS...");
        e.preventDefault();
        try {
            const fileData = new FormData();
            fileData.append("file", nftFile);

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
            const fileUrl = "https://cyan-magnetic-rat-616.mypinata.cloud/ipfs/" + res.data.IpfsHash;
            console.log(fileUrl);
            const end = performance.now();
            console.log("Time taken to upload to IPFS: ", end - start);
            const nftUrl = fileUrl;
            const thumbnail = `${(nfts.length%7) + 1}.jpg`
            const newNFT = { nftName, nftDescription, nftPrice, thumbnail, nftUrl }
            newNFT.isSold = false;
            newNFT.isAdded = false;
            if(nftFile.type.startsWith('audio/')){
                newNFT.mediaType = 'audio';
            } else if (nftFile.type.startsWith('video/')){
                newNFT.mediaType = 'video';
            }

            setNfts([...nfts, newNFT])
            console.log(nfts);

        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
            <div className="mintForm">
                <div class="row justify-content-center mintForm-l">
                    <div class="col-sm-8 col-lg-6 col-xl-4 border border-5 rounded shadow p-3 mintForm-l2">
                        <h3 class="fw-bolder text-center">Mint Your NFT</h3>
                        <hr />
                        <div class="mt-2 mb-2">
                            <label htmlFor="nft-name" class="form-label fw-bold text-primary">
                                NFT Title
                            </label>
                            <input type="text" class="form-control" id="nft-name" placeholder="What should your NFT be called?"
                            />
                        </div>
                        <div class="mt-2 mb-2">
                            <label htmlFor="nft-description" class="form-label fw-bold text-primary">NFT description</label>
                            <textarea class="form-control" id="nft-description" rows="3" placeholder="Decribe your NFT"></textarea>
                        </div>
                        <div class="mt-2 mb-3">
                            <label htmlFor="nft-price" class="form-label fw-bold text-primary">NFT price (in BFT)</label>
                            <input type="number" class="form-control" id="nft-price" placeholder="1 BFT" min={1}/>
                        </div>
                        {/* <div className='mb-3'>
                            <label htmlFor="nft-image" class="form-label">
                                Upload thumbnail
                            </label>
                            <input class="form-control" type="file" accept="image/*" id="nft-image" onChange={(e) => { setNftImage(e.target.files[0]) }} />
                        </div> */}
                        <div>
                            <label htmlFor="nft-file" class="form-label fw-bold text-primary">
                                Upload File (.mp3/.mp4)
                            </label>
                            <input class="form-control" type="file" id="nft-file" accept="audio/*, video/*" onChange={(e) => { setNftFile(e.target.files[0]) }} />
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
