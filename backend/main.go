package main

import (
	"context"
	"leave-request-app/app"
	"leave-request-app/config"
)

func main() {
	game := app.Init(config.CreateConfig())
	game.Start(context.Background())
}
