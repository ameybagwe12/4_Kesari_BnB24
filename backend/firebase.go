package main

import (
	"context"
	"log"

	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
)

type Storage struct {
	FireBaseUrl string
	App         *firebase.App
}

func NewStorage(firebaseUrl string) *Storage {
	return &Storage{
		FireBaseUrl: firebaseUrl,
	}
}

func (s *Storage) ConnectToFirebase() error {
	ctx := context.Background()

	opt := option.WithCredentialsFile(s.FireBaseUrl)
	app, err := firebase.NewApp(ctx, nil, opt)
	if err != nil {
		log.Fatalf("error initializing app: %v\n", err)
		return err
	}
	s.App = app
	log.Println("Connected to firebase")
	return nil
}

func (s *Storage) GetAllData() []*Music {
	ctx := context.Background()
	client, err := s.App.Firestore(ctx)
	if err != nil {
		log.Println("ERROR:", err)
	}
	defer client.Close()

	docs, err := client.Collection("music").Documents(ctx).GetAll()
	if err != nil {
		log.Println("ERROR:", err)
	}
	var allMusic []*Music
	for _, doc := range docs {
		var data Music
		if err := doc.DataTo(&data); err != nil {
			log.Println("ERROR:", err)
		}
		allMusic = append(allMusic, &data)
	}
	return allMusic
}
func (s *Storage) GetData(collectionName string, column string, condition string, value any) *Music {
	ctx := context.Background()
	firestoreClient, err := s.App.Firestore(ctx)
	if err != nil {
		log.Fatal(err)
	}
	defer firestoreClient.Close()

	iter := firestoreClient.Collection(collectionName).Where(column, condition, value).Documents(ctx)
	defer iter.Stop()

	doc, err := iter.Next()
	if err != nil {
		log.Println("ERROR:", err)
		return nil
	}

	music := new(Music)
	if err := doc.DataTo(music); err != nil {
		log.Println("ERROR:", err)
	}
	return music
}
