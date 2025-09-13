# syntax=docker/dockerfile:1
FROM golang:1.24-alpine AS builder

WORKDIR /app

# Настраиваем Go для оптимальной работы
ENV CGO_ENABLED=0
ENV GOOS=linux
ENV GOPROXY=https://proxy.golang.org,direct

# Копируем только файлы зависимостей
COPY go.mod go.sum ./

# Используем кэш-маунты для ускорения сборки
RUN --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    go mod download

# Копируем исходный код
COPY . .

# Собираем с кэш-маунтами
RUN --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    go build -o main cmd/api/main.go

# Финальный образ - используем distroless для Go
FROM gcr.io/distroless/static-debian12

WORKDIR /app

# Копируем бинарный файл
COPY --from=builder /app/main .

# Копируем папку с документацией Swagger
COPY --from=builder /app/docs ./docs

EXPOSE 8000

CMD ["./main"]