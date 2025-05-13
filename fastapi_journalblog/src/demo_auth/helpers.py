from datetime import timedelta

from src.api_v1.schemas.user_schema import UserSchemaTest
from src.auth import utils as auth_utils
from config import settings

TOKEN_TYPE_FIELD = "type"
ACCESS_TOKEN_TYPE = "access"
REFRESH_TOKEN_TYPE = "refresh"


def create_jwt(
    token_type: str,
    token_data: dict,
    expire_minute: int = settings.auth_jwt.access_token_expired_minutes,
    expired_timedelta: timedelta | None = None,
) -> str:
    jwt_payload = {"type": token_type}
    jwt_payload.update(token_data)
    return auth_utils.encode_jwt(
        payload=jwt_payload,
        expired_minutes=expire_minute,
        expired_timedelta=expired_timedelta,
    )


def create_access_token(user: UserSchemaTest) -> str:
    jwt_payload = {
        "sub": user.username,
        "username": user.username,
        "email": user.email,
    }
    return create_jwt(
        token_type=ACCESS_TOKEN_TYPE,
        token_data=jwt_payload,
        expire_minute=settings.auth_jwt.access_token_expired_minutes,
    )


def create_refresh_token(user: UserSchemaTest) -> str:
    jwt_payload = {
        "sub": user.username,
    }
    return create_jwt(
        token_type=REFRESH_TOKEN_TYPE,
        token_data=jwt_payload,
        expired_timedelta=timedelta(days=settings.auth_jwt.refresh_token_expired_days),
    )
