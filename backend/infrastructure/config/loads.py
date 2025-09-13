from environs import Env
from fastapi.security import HTTPBearer

from backend.infrastructure.config.schemas import DatabaseConfig, JwtConfig, RedisConfig


env = Env()
env.read_env()


DB_CONFIG = DatabaseConfig(
    **{field: env.str(field.upper()) for field in DatabaseConfig.model_fields}
)
JWT_CONFIG = JwtConfig(
    **{field: env.str(field) for field in JwtConfig.model_fields}
)
REDIS_CONFIG = RedisConfig(
    **{field: env.str(field) for field in RedisConfig.model_fields}
)
AUTH_BEARER = HTTPBearer(auto_error=False)
UNIVERSITY_API_URL=env.str("UNIVERSITY_API_URL")
UNIVERSITY_API_KEY=env.str("UNIVERSITY_API_KEY")
BOT_TOKEN=env.str("BOT_TOKEN")