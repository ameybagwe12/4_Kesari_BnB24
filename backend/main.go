package main

func main() {
	server := NewServer(":8000", "./cred.json")
	server.Run()
}
