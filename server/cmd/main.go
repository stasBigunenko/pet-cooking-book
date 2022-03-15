package main

import (
	"context"
	"github.com/gorilla/mux"
	"js/pet-cooking-book/server/cmd/config"
	"js/pet-cooking-book/server/pkg/handlers"
	"js/pet-cooking-book/server/pkg/services"
	"js/pet-cooking-book/server/pkg/storage"
	"log"
	"net/http"
	"os"
	"os/signal"
)

func main() {
	// set config for the API
	config := config.SetConfig()

	// create connection with postgreSQL storage
	db, _ := storage.NewPDB(config.PostgresHost, config.PostgresPort, config.PostgresUser, config.PostgresPsw, config.PostgresDB, config.PostgresSSL)

	services := services.NewServices(db)

	// create handler
	recipeRoutes := handlers.NewHandler(&services)

	r := mux.NewRouter()

	router := recipeRoutes.Routes(r)

	// http server config
	srv := http.Server{
		Addr:    config.PortHTTP,
		Handler: router,
	}

	c := make(chan os.Signal, 1)
	defer close(c)
	signal.Notify(c, os.Interrupt)

	go func() {
		<-c
		srv.Shutdown(context.Background())
	}()

	log.Printf("HTTP server started on port: %v\n", config.PortHTTP)
	//log.Printf("connect to http://localhost:%s/ for GraphQL playground", )

	if err := srv.ListenAndServe(); err != nil {
		log.Printf("failed to serve:+%v\n", err)
	}
}
