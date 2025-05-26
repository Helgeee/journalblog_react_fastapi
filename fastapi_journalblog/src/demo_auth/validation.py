from fastapi import Depends, HTTPException, Form
from fastapi.security import OAuth2PasswordBearer
from jwt import InvalidTokenError
from starlette import status
from sqlalchemy.ext.asyncio import AsyncSession

from src.api_v1.schemas.user_schema import UserCreateSchema, UserSchema
from src.auth import utils as auth_utils
from src.demo_auth.crud import get_user_by_username
from src.demo_auth.helpers import (
    TOKEN_TYPE_FIELD,
    ACCESS_TOKEN_TYPE,
    REFRESH_TOKEN_TYPE,
)
from src.db.database import get_async_session


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/jwt/login")


def get_current_token_payload(
    token: str = Depends(
        oauth2_scheme
    ),  # здесь токен у нас сам автоматически по-новому обновляется
) -> UserCreateSchema:
    try:
        payload = auth_utils.decode_jwt(
            token=token,
        )  # этот payload мы декодим используя public key для проверки что он валидный и после этого возвращаем его
    except InvalidTokenError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"token invalid: {e}",
        )
    return payload


def validate_token_type(
    payload: dict,
    token_type: str,
) -> bool:
    current_token_type = payload.get(TOKEN_TYPE_FIELD)
    if current_token_type == token_type:
        return True
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail=f"token invalid type {current_token_type!r} expected {token_type!r}",
    )


async def get_user_by_token_sub(
    payload: dict,
    session: AsyncSession = Depends(get_async_session),
) -> UserCreateSchema:
    username: str | None = payload.get(
        "sub"
    )  # Его username в токене и берем от туда sub(то есть о ком вообще речь.
    # Там обычно ранится либо id, либо username у меня)
    if not username:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token missing 'sub' field",
        )

    user = await get_user_by_username(payload["username"], session)
    if not user:  # Если есть, вытаскиваем юзера из базы данных
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="token invalid(user not found)",
        )
    return user


def get_auth_user_from_token_of_type(token_type: str):
    async def get_auth_user_from_token(
        payload: dict = Depends(get_current_token_payload),
        session: AsyncSession = Depends(get_async_session),
    ) -> UserSchema:  # Получаем юзера находя
        validate_token_type(payload, token_type)
        return await get_user_by_token_sub(payload, session)

    return get_auth_user_from_token


class UserGetterFromToken:
    def __init__(self, token_type: str):
        self.token_type = token_type

    def __call__(
        self,
        payload: dict = Depends(get_current_token_payload),
        # session: AsyncSession = Depends(get_async_session),
    ):
        validate_token_type(payload, self.token_type)
        return get_user_by_token_sub(payload)  # session


get_current_auth_user = get_auth_user_from_token_of_type(ACCESS_TOKEN_TYPE)

get_current_auth_user_for_refresh = UserGetterFromToken(REFRESH_TOKEN_TYPE)


async def get_current_active_auth_user(
    user: UserSchema = Depends(get_current_auth_user),
):
    if user.active:
        return user
    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="user inactive",
    )


async def validate_auth_user(
    username: str = Form(),
    password: str = Form(),
    session: AsyncSession = Depends(get_async_session),
):
    unauth_exc = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="invali username or password",
    )

    user = await get_user_by_username(username, session)
    if not user:
        raise unauth_exc

    if not auth_utils.validate_password(
        password=password,
        hashed_password=user.password,
    ):
        raise unauth_exc

    if not user.active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="user inactive",
        )

    return user  # return UserCreateTest.model_validate(user)
