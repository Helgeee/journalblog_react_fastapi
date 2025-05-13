from fastapi import Depends, HTTPException, Form
from fastapi.security import OAuth2PasswordBearer
from jwt import InvalidTokenError
from starlette import status

from src.api_v1.schemas.user_schema import UserSchemaTest
from src.auth import utils as auth_utils
from src.demo_auth.crud import users_db
from src.demo_auth.helpers import (
    TOKEN_TYPE_FIELD,
    ACCESS_TOKEN_TYPE,
    REFRESH_TOKEN_TYPE,
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/jwt/login")


def get_current_token_payload(  # функция для получения payload токена
    # credentials: HTTPAuthorizationCredentials = Depends(
    #     http_bearer
    # ),  # Мы берем payload токена из заголовков запроса вот от сюда "credentials"
    token: str = Depends(
        oauth2_scheme
    ),  # здесь токен у нас сам автоматически по-новому обновляется
) -> UserSchemaTest:
    # token = credentials.credentials
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


def get_user_by_token_sub(payload: dict) -> UserSchemaTest:
    username: str | None = payload.get(
        "sub"
    )  # Его username в токене и берем от туда sub(то есть о ком вообще речь.
    # Там обычно ранится либо id, либо username у меня)
    if user := users_db.get(username):  # Если есть, вытаскиваем юзера из базы данных
        return user
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="token invalid(user not found)",
    )


def get_auth_user_from_token_of_type(token_type: str):
    def get_auth_user_from_token(
        payload: dict = Depends(get_current_token_payload),
    ) -> UserSchemaTest:  # Получаем юзера находя
        validate_token_type(payload, token_type)
        return get_user_by_token_sub(payload)

    return get_auth_user_from_token


class UserGetterFromToken:
    def __init__(self, token_type: str):
        self.token_type = token_type

    def __call__(
        self,
        payload: dict = Depends(get_current_token_payload),
    ):
        validate_token_type(payload, self.token_type)
        return get_user_by_token_sub(payload)


get_current_auth_user = get_auth_user_from_token_of_type(ACCESS_TOKEN_TYPE)

get_current_auth_user_for_refresh = UserGetterFromToken(REFRESH_TOKEN_TYPE)


def get_current_active_auth_user(
    user: UserSchemaTest = Depends(get_current_auth_user),
):
    if user.active:
        return user
    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="user inactive",
    )


def validate_auth_user(
    username: str = Form(),
    password: str = Form(),
):
    unauth_exc = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="invali username or password",
    )
    if not (user := users_db.get(username)):
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

    return user
