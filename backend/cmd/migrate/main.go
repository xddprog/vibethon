package main

import (
	"backend/internal/config"
	"backend/internal/database"
	"backend/internal/repository"
	"flag"
	"fmt"
	"log"
	"os"
)

func main() {
	var command = flag.String("command", "", "Command to execute: migrate, drop, seed")
	flag.Parse()

	if *command == "" {
		fmt.Println("Usage: go run cmd/migrate/main.go -command=<migrate|drop|seed>")
		os.Exit(1)
	}

	// Загружаем конфигурацию
	cfg := config.Load()

	// Подключаемся к базе данных
	db := database.NewDatabase(cfg)
	defer db.Close()

	userRepo := repository.NewUserRepository(db.DB)

	switch *command {
	case "migrate":
		if err := migrate(db, userRepo); err != nil {
			log.Fatalf("Failed to migrate: %v", err)
		}
		fmt.Println("Migration completed successfully!")

	case "drop":
		if err := drop(userRepo); err != nil {
			log.Fatalf("Failed to drop tables: %v", err)
		}
		fmt.Println("Tables dropped successfully!")

	case "seed":
		if err := seed(userRepo); err != nil {
			log.Fatalf("Failed to seed data: %v", err)
		}
		fmt.Println("Data seeded successfully!")

	default:
		fmt.Printf("Unknown command: %s\n", *command)
		fmt.Println("Available commands: migrate, drop, seed")
		os.Exit(1)
	}
}

func migrate(db *database.Database, userRepo repository.UserRepository) error {
	// Выполняем автоматическую миграцию через GORM
	if err := db.Migrate(); err != nil {
		return fmt.Errorf("failed to auto migrate: %v", err)
	}

	// Создаем таблицы через репозиторий (если нужно)
	if err := userRepo.CreateTables(); err != nil {
		return fmt.Errorf("failed to create tables: %v", err)
	}

	return nil
}

func drop(userRepo repository.UserRepository) error {
	return userRepo.DropTables()
}

func seed(userRepo repository.UserRepository) error {
	// Здесь можно добавить тестовые данные
	fmt.Println("Seeding test data...")

	// Примеры создания тестовых пользователей можно добавить здесь
	// Но для этого нужно будет импортировать business слой

	return nil
}
