# Vibeton - Инструкции по запуску

## Быстрый старт

### 1. Запуск всего приложения
```bash
docker compose up --build
```

### 2. Запуск в фоновом режиме
```bash
docker compose up -d --build
```

### 3. Остановка приложения
```bash
docker compose down
```

### 4. Остановка с удалением volumes (очистка БД)
```bash
docker compose down -v
```

## Доступные сервисы

- **Backend API**: http://localhost:8000
- **Swagger UI**: http://localhost:8000/swagger/index.html
- **PostgreSQL**: localhost:5432

## Использование Makefile

Для удобства разработки используйте команды Makefile:

```bash
# Показать все доступные команды
make help

# Генерировать Swagger документацию
make swagger

# Запустить приложение локально (с генерацией Swagger)
make run

# Запустить только PostgreSQL для разработки
make dev-db

# Собрать Docker образ
make docker-build

# Запустить с Docker Compose
make docker-run

# Остановить Docker Compose
make docker-stop
```

## API Документация

После запуска приложения документация API доступна по адресу:
- **Swagger UI**: http://localhost:8000/swagger/index.html

Документация автоматически генерируется из аннотаций в коде и включает:
- Описание всех endpoints
- Модели данных
- Примеры запросов и ответов
- Возможность тестирования API прямо в браузере

## Переменные окружения

Вы можете изменить настройки в файле `docker-compose.yml`:

### Сервер
- `SERVER_HOST`: Хост сервера (по умолчанию: 0.0.0.0)
- `SERVER_PORT`: Порт сервера (по умолчанию: 8000)

### База данных
- `DB_HOST`: Хост БД (по умолчанию: postgres)
- `DB_PORT`: Порт БД (по умолчанию: 5432)
- `DB_USER`: Пользователь БД (по умолчанию: vibeton_user)
- `DB_PASS`: Пароль БД (по умолчанию: vibeton_password)
- `DB_NAME`: Имя БД (по умолчанию: vibeton_db)

## Разработка

### Локальная разработка
```bash
# 1. Запустить только PostgreSQL
make dev-db

# 2. Установить инструменты для разработки
make install-tools

# 3. Запустить приложение локально
make run
```

### Добавление новых API endpoints

1. Добавьте методы в соответствующий handler
2. Добавьте Swagger аннотации в комментариях:
```go
// CreateUser создает нового пользователя
// @Summary Создать пользователя
// @Description Создает нового пользователя в системе
// @Tags users
// @Accept json
// @Produce json
// @Param user body models.CreateUserRequest true "Данные пользователя"
// @Success 201 {object} models.UserResponse
// @Failure 400 {object} ErrorResponse
// @Router /users [post]
func (h *UserHandler) CreateUser(c *gin.Context) {
    // реализация
}
```
3. Перегенерируйте документацию: `make swagger`

## Полезные команды

### Просмотр логов
```bash
# Логи всех сервисов
docker compose logs

# Логи конкретного сервиса
docker compose logs backend
docker compose logs postgres

# Логи в реальном времени
make docker-logs
```

### Выполнение команд в контейнере
```bash
# Подключение к контейнеру с приложением
docker compose exec backend sh

# Подключение к PostgreSQL
docker compose exec postgres psql -U vibeton_user -d vibeton_db
```

## Troubleshooting

### Проблемы с Swagger
- Убедитесь, что установлен swag CLI: `make install-tools`
- Перегенерируйте документацию: `make swagger`
- Проверьте корректность аннотаций в коде

### Проблемы с подключением к БД
- Убедитесь, что PostgreSQL запущен и готов к подключениям
- Проверьте логи: `docker compose logs postgres`

### Очистка всех данных
```bash
make docker-clean
```
