from datetime import datetime, timedelta
import hashlib
import hmac
from urllib.parse import parse_qsl

from fastapi.security import HTTPAuthorizationCredentials
from jwt import InvalidTokenError, encode, decode
from passlib.context import CryptContext

from backend.core.dto.auth_dto import LoginForm, RegisterForm
from backend.core.dto.user_dto import BaseUserModel
from backend.core.repositories.user_repository import UserRepository
from backend.infrastructure.config.loads import JWT_CONFIG
from backend.infrastructure.database.models.user import User
from backend.infrastructure.errors.auth_errors import InvalidLoginData, InvalidToken, UserAlreadyNotRegister, UserAlreadyRegister


class AuthService:
    def __init__(self, repository: UserRepository) -> None:
        self.repository = repository
        self.context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    
    async def get_user_by_tg_id(self, tg_id: str) -> User | None:
        user = await self.repository.get_by_attribute("tg_id", tg_id)
        return None if not user else user[0]
    
    async def hash_password(self, password: str) -> str:
        return self.context.hash(password)
    
    async def verify_password(self, password: str, hashed_password: str) -> bool:
        return self.context.verify(password, hashed_password)

    async def authenticate_user(self, form: LoginForm) -> User:
        user = await self.get_user_by_tg_id(form.tg_id)
        if not user:
            raise UserAlreadyNotRegister
        if not await self.verify_password(form.password, user.password):
            raise InvalidLoginData
        return user

    async def create_access_token(self, tg_id: int) -> str:
        expire = datetime.now() + timedelta(minutes=JWT_CONFIG.JWT_ACCESS_TOKEN_TIME)
        data = {"exp": expire, "sub": str(tg_id)}
        token = encode(
            data,
            JWT_CONFIG.JWT_SECRET, 
            algorithm=JWT_CONFIG.JWT_ALGORITHM
        )
        return {"token": token}
    
    async def verify_token(self, token: HTTPAuthorizationCredentials | str) -> BaseUserModel:
        if not token:
            raise InvalidToken
        try:
            payload = decode(
                token if isinstance(token, str) else token.credentials,
                JWT_CONFIG.JWT_SECRET,
                algorithms=[JWT_CONFIG.JWT_ALGORITHM],
            )
            tg_id = int(payload.get("sub"))
            if not tg_id:
                raise InvalidToken
            
            user = await self.get_user_by_tg_id(tg_id)
            if not user:
                raise InvalidToken
            return BaseUserModel.model_validate(user, from_attributes=True)
        except (InvalidTokenError, AttributeError) as e:
            raise InvalidToken

    async def register_user(self, form: RegisterForm) -> User:
        form = form.model_dump()
        init_data = form.pop("init_data")
        # tg_id = await self.verify_init_data(form.init_data, JWT_CONFIG.BOT_TOKEN)
        tg_id = 123
        user = await self.get_user_by_tg_id(tg_id)
        if user:
            raise UserAlreadyRegister
        new_user = await self.repository.add_item(**form, tg_id=tg_id)
        return BaseUserModel.model_validate(new_user, from_attributes=True)

    def verify_init_data(init_data: str, bot_token: str) -> dict:
        parts = parse_qsl(init_data, keep_blank_values=True)
        data = {k: v for k, v in parts if k != "hash"}
        sorted_data = sorted([f"{k}={v}" for k, v in data.items()])
        data_check_string = "\n".join(sorted_data)
        
        secret_key = hashlib.sha256(bot_token.encode()).digest()
        computed_hash = hmac.new(secret_key, data_check_string.encode(), hashlib.sha256).hexdigest()

        received_hash = dict(parts).get("hash")
        if not hmac.compare_digest(computed_hash, received_hash):
            raise InvalidToken
        return data.get("id")