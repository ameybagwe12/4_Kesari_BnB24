package main

import (
	"io"
	"log"
	"net/http"
	"os"
)

type IPFSController struct {
	destinationPath string
}

func NewIPFSController(dstPath string) *IPFSController {
	return &IPFSController{
		destinationPath: dstPath,
	}
}

func (i *IPFSController) GetFile(ipfsHash string, fileName string) {
	outFile, err := os.Create(i.destinationPath + fileName)
	if err != nil {
		log.Fatal(err.Error())
	}
	defer outFile.Close()
	resp, err := http.Get(ipfsHash)
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		log.Println("ERROR: ", resp.StatusCode)
		return
	}

	_, err = io.Copy(outFile, resp.Body)
	if err != nil {
		log.Fatal(err)
	}

	log.Println("INFO: Downloaded File", ipfsHash)
}
