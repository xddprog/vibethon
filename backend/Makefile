.PHONY: help build run clean test swagger docker-build docker-run docker-clean

# Переменные
APP_NAME=vibeton-backend
DOCKER_IMAGE=vibeton/backend
SWAGGER_VERSION=latest

help: ## Показать справку
	@echo "Доступные команды:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

install-tools: ## Установить необходимые инструменты
	go install github.com/swaggo/swag/cmd/swag@latest

swagger: ## Генерировать Swagger документацию
	swag init -g cmd/api/main.go -o docs

build: swagger ## Собрать приложение
	go build -o bin/api cmd/api/main.go
	go build -o bin/migrate cmd/migrate/main.go

run: swagger ## Запустить приложение локально
	go run cmd/api/main.go

run-migrate: ## Запустить миграции
	go run cmd/migrate/main.go

test: ## Запустить тесты
	go test ./...

clean: ## Очистить артефакты сборки
	rm -rf bin/
	rm -rf docs/

# Docker команды
docker-build: ## Собрать Docker образ
	docker build -t $(DOCKER_IMAGE) .

docker-run: ## Запустить с Docker Compose
	docker compose up --build

docker-run-bg: ## Запустить в фоне с Docker Compose
	docker compose up -d --build

docker-stop: ## Остановить Docker Compose
	docker compose down

docker-clean: ## Очистить Docker ресурсы
	docker compose down -v
	docker system prune -f

docker-logs: ## Показать логи
	docker compose logs -f backend

# Разработка
dev-db: ## Запустить только базу данных для разработки
	docker compose up postgres -d

mod-tidy: ## Привести в порядок go.mod
	go mod tidy

fmt: ## Форматировать код
	go fmt ./...

lint: ## Проверить код линтером
	golangci-lint run
