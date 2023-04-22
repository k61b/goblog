package main

import "log"

func main() {
	store, err := NewPostgresStorage()
	if err != nil {
		log.Fatal(err)
	}

	if err := store.Migrate(); err != nil {
		log.Fatal(err)
	}

	server := NewAPIServer(":"+goDotEnvVariable("PORT"), store)
	server.Run()
}
