# Vibethon

Vibethon — это современное fullstack-приложение, включающее backend на Go, frontend на React + Vite и инфраструктуру на Docker Compose.

## Быстрый старт

```bash
# Запустить все сервисы
docker compose up --build

# Запустить в фоновом режиме
docker compose up -d --build
```

### Доступные сервисы

- **Backend API**: http://localhost:8000
- **Swagger UI**: http://localhost:8080
- **PostgreSQL**: localhost:5432

## Остановка и очистка

```bash
# Остановить сервисы
docker compose down

# Остановить и удалить данные
docker compose down -v
```

---

## Архитектура репозитория

```
vibethon/
├── backend/   # Go API + бизнес-логика + миграции
├── admin/     # Frontend на React + Vite
├── docker-compose.yml
└── README.md
```

- **Backend** — трехслойная архитектура: API, бизнес-логика, репозиторий (работа с БД).
- **Frontend** — современный React, быстрый старт через Vite.
- **Инфраструктура** — всё разворачивается одной командой через Docker Compose.

---

## Backend: основные команды

Перейдите в папку `backend/` для подробной документации и команд.

- `make up` — запуск backend и БД
- `make logs` — логи
- `make down` — остановка

### Запуск локально

```bash
make deps      # установить зависимости
make migrate   # применить миграции
make run       # старт приложения (Go)
```

### Работа с БД

```bash
make migrate      # миграции
make drop         # удалить таблицы
make seed         # тестовые данные
make db-connect   # подключение к БД
make db-backup    # бэкап
make db-restore file=backup_file.sql  # восстановление
```

---

## Примеры API

- `POST /api/v1/users` — создать пользователя
- `GET /api/v1/users` — получить список пользователей

```bash
curl -X POST http://localhost:8000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{"username":"john_doe","email":"john@example.com","password":"secure123"}'
```

---

## Переменные окружения (пример)

```env
SERVER_HOST=0.0.0.0
SERVER_PORT=8000
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=postgres
DB_SSLMODE=disable
```

---

## Frontend

- Шаблон React + Vite.
- Быстрый старт в папке `admin/`.

---

## Контакты и поддержка

Вопросы и предложения — в Issues или Pull Requests.

---

**Полная документация для backend и frontend находится в соответствующих папках!**
