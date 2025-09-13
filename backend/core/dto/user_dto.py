from datetime import datetime
from pydantic import BaseModel

from backend.core.dto.university_dto import UniversityModel
from backend.utils.enums import GenderTypes, RoleTypes


class BaseUserModel(BaseModel):
    id: int
    tg_id: int
    email: str | None = None
    name: str
    surname: str
    middlename: str
    gender: GenderTypes
    role: RoleTypes
    birdthdate: datetime
    university: UniversityModel