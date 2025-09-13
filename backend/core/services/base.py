from typing import Any
from pydantic import BaseModel
from sqlalchemy.orm import MappedColumn
from backend.core.clients.redis_client import RedisClient
from backend.core.repositories.base import SqlAlchemyRepository
from backend.infrastructure.interfaces.repository import RepositoryInterface


class BaseDbModelService[ModelType]:
    def __init__(
        self, repository: RepositoryInterface[ModelType],
        redis_client: RedisClient = None,
    ):
        self.repository = repository
        self.redis_client = redis_client

    