package main

import (
	"errors"
	"log"

	"github.com/gofiber/fiber/v2"
)

type Server struct {
	port    string
	storage *Storage
	ipfs    *IPFSController
}

func NewServer(port string, firebaseUrl string) *Server {
	return &Server{
		port:    port,
		storage: NewStorage(firebaseUrl),
		ipfs:    NewIPFSController("./temp/"),
	}
}

func (s *Server) Run() {
	app := fiber.New()
	app.Get("/music", s.handleGetAllMusic)
	app.Get("/listen-music/:name", s.handleGetFile)
	log.Println("INFO: Server running on port " + s.port)
	if err := s.storage.ConnectToFirebase(); err != nil {
		log.Println("ERROR:", err)
	}
	if err := app.Listen(":8000"); err != nil {
		log.Panic(err)
	}

}

func (s *Server) handleGetAllMusic(c *fiber.Ctx) error {
	allMusic := s.storage.GetAllData()

	return c.Status(fiber.StatusOK).JSON(allMusic)
}

func (s *Server) handleGetMusicByName(name string) (*Music, error) {
	music := s.storage.GetData("music", "nftName", "==", name)
	if music == nil {
		return nil, errors.New("NOT FOUND")
	}
	return music, nil
}

func (s *Server) handleGetFile(c *fiber.Ctx) error {
	name := c.Params("name")
	log.Println("INFO: Name:", name)

	music, err := s.handleGetMusicByName(name)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).Send([]byte(err.Error()))
	}
	if music == nil {

		return c.Status(fiber.StatusBadRequest).Send([]byte("Not found"))
	}
	s.ipfs.GetFile(music.NftUrl, "1.mp3")

	return c.SendFile("./temp/1.mp3")
}

type MusicRequest struct {
	MusicId string `json:"music_id"`
}

type IPFSRequest struct {
	IpfsHash string `json:"hash"`
}

type Music struct {
	NftName        string `firestore:"nftName"`
	NftDescription string `firestore:"nftDescription"`
	NftPrice       int    `firestore:"price"`
	NftUrl         string `firestore:"nftUrl"`
	ThumbnailUrl   string `firestore:"thumbnailUrl"`
}
