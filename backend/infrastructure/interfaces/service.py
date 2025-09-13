from abc import ABC, abstractmethod

from backend.infrastructure.interfaces.repository import RepositoryInterface


class DbModelServiceInterface[ModelType](ABC):
    def __init__(self, repository: RepositoryInterface[ModelType]):
        self.repository = repository
    
    @abstractmethod
    def get_one(self, item_id: str):
        raise NotImplementedError
    
    @abstractmethod
    def get_all(self):
        raise NotImplementedError
    
    @abstractmethod
    def create(self, item):
        raise NotImplementedError
    
    @abstractmethod
    def update(self, item_id: str, item):
        raise NotImplementedError
    
    @abstractmethod
    def delete(self, item_id: str):
        raise NotImplementedError
    
    @abstractmethod
    def delete_many(self, item_ids: list[int]):
        raise NotImplementedError