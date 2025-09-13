package main

import (
	"backend/internal/api"
	"backend/internal/business"
	"backend/internal/config"
	"backend/internal/database"
	"backend/internal/repository"
	"fmt"
	"log"

	_ "backend/docs" // Импорт для Swagger документации
)

// @title Vibeton API
// @version 1.0
// @description API для приложения Vibeton - коворкинг платформа
// @termsOfService http://swagger.io/terms/

// @contact.name API Support
// @contact.url http://www.swagger.io/support
// @contact.email support@swagger.io

// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html

// @host localhost:8000
// @BasePath /api/v1
// @schemes http
func main() {
	// Загружаем конфигурацию
	cfg := config.Load()

	// Подключаемся к базе данных
	db := database.NewDatabase(cfg)
	defer db.Close()

	// Выполняем миграции
	if err := db.Migrate(); err != nil {
		log.Fatalf("Failed to migrate database: %v", err)
	}

	// Инициализируем слои
	userRepo := repository.NewUserRepository(db.DB)
	userService := business.NewUserService(userRepo)

	// Создаем и запускаем сервер
	server := api.NewServer(userService)

	addr := fmt.Sprintf("%s:%s", cfg.Server.Host, cfg.Server.Port)
	log.Printf("Server starting on %s", addr)

	if err := server.Run(addr); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
