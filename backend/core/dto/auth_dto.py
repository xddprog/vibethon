from datetime import datetime
from pydantic import BaseModel

from backend.utils.enums import GenderTypes, RoleTypes


class RegisterForm(BaseModel):
    init_data: str
    name: str
    surname: str
    gender: GenderTypes
    role: RoleTypes
    birdthdate: datetime
    university_id: int


class LoginForm(BaseModel):
    init_data: str
