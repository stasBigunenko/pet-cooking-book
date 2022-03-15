package config

import "os"

type Config struct {
	// Http connection
	PortHTTP string

	// Postgres
	PostgresHost string
	PostgresPort string
	PostgresUser string
	PostgresPsw  string
	PostgresDB   string
	PostgresSSL  string
}

func SetConfig() *Config {
	var config Config

	config.PortHTTP = os.Getenv("PORT_HTTP")
	if config.PortHTTP == "" {
		config.PortHTTP = ":8082"
	}

	config.PostgresHost = os.Getenv("POSTGRES_HOST")
	if config.PostgresHost == "" {
		config.PostgresHost = "0.0.0.0"
	}

	config.PostgresPort = os.Getenv("POSTGRES_PORT")
	if config.PostgresPort == "" {
		config.PostgresPort = "5432"
	}

	config.PostgresUser = os.Getenv("POSTGRES_USER")
	if config.PostgresUser == "" {
		config.PostgresUser = "postgres_recipe"
	}

	config.PostgresPsw = os.Getenv("POSTGRES_PASSWORD")
	if config.PostgresPsw == "" {
		config.PostgresPsw = "qwerty"
	}

	config.PostgresDB = os.Getenv("POSTGRES_DB")
	if config.PostgresDB == "" {
		config.PostgresDB = "recipedb"
	}

	config.PostgresSSL = os.Getenv("POSTGRES_SSL")
	if config.PostgresSSL == "" {
		config.PostgresSSL = "disable"
	}

	return &Config{
		PortHTTP: config.PortHTTP,

		PostgresHost: config.PostgresHost,
		PostgresPort: config.PostgresPort,
		PostgresUser: config.PostgresUser,
		PostgresPsw:  config.PostgresPsw,
		PostgresDB:   config.PostgresDB,
		PostgresSSL:  config.PostgresSSL,
	}
}
