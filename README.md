# Запуск приложения

## Быстрый старт

```bash
# Запустить все сервисы
docker compose up --build

# Запустить в фоновом режиме
docker compose up -d --build
```

## Доступные сервисы

- **Backend API**: http://localhost:8000
- **Swagger UI**: http://localhost:8080
- **PostgreSQL**: localhost:5432

## Остановка

```bash
docker compose down
```

## Очистка данных

```bash
docker compose down -v
```
