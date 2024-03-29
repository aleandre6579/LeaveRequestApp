package app

import (
	"context"
	"fmt"
	"leave-request-app/config"
	"leave-request-app/db"
	"leave-request-app/db/models/leave"
	"leave-request-app/db/models/user"
	"net/http"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type App struct {
	Config   config.Config
	DBClient *gorm.DB
	router   http.Handler
}

func Init(config config.Config) *App {
	app := &App{
		Config: config,
	}
	return app
}

func (app *App) Start(ctx context.Context) error {
	fmt.Println("Starting backend...")

	if err := app.connectDB(ctx); err != nil {
		return err
	}

	fmt.Println("Connected to the db!")

	migrator := app.DBClient.Migrator()
	if !migrator.HasTable(&user.User{}) {
		if err := db.InitTable(app.DBClient, &user.User{}); err != nil {
			return err
		}
	}
	if !migrator.HasTable(&leave.Leave{}) {
		if err := db.InitTable(app.DBClient, &leave.Leave{}); err != nil {
			return err
		}
	}

	app.router = loadRoutes(app)

	http_server := &http.Server{
		Addr:    ":8080",
		Handler: app.router,
	}

	fmt.Println("Server started!")

	http_ch := make(chan error, 1)
	go func() {
		err := http_server.ListenAndServe()
		if err != nil {
			http_ch <- fmt.Errorf("failed to start http server: %w", err)
		}
		close(http_ch)
	}()

	select {
	case err := <-http_ch:
		return err
	}
}

func (app *App) connectDB(ctx context.Context) error {
	dsn := fmt.Sprintf(
		"%s:%s@tcp(%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		app.Config.DatabaseConfig.User,
		app.Config.DatabaseConfig.Password,
		app.Config.DatabaseConfig.Addr,
		app.Config.DatabaseConfig.DBName,
	)

	gorm, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		return err
	}

	app.DBClient = gorm
	return nil
}
