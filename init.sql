-- Инициализация базы данных для Vibeton
-- Этот файл выполняется при первом запуске PostgreSQL контейнера

-- Создаем схему, если она не существует
CREATE SCHEMA IF NOT EXISTS public;

-- Устанавливаем права доступа
GRANT ALL PRIVILEGES ON SCHEMA public TO vibeton_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO vibeton_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO vibeton_user;

-- Создаем расширения, которые могут понадобиться
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Комментарий о назначении БД
COMMENT ON DATABASE vibeton_db IS 'База данных для приложения Vibeton';
