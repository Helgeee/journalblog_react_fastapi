from fastapi import APIRouter, Depends, Request
from fastapi.security import (
    HTTPBearer,
)
from fastapi.responses import HTMLResponse
from src.api_v1.schemas.user_schema import UserSchemaTest
from pydantic import BaseModel

# from src.core.config import templates
from src.demo_auth.helpers import (
    create_access_token,
    create_refresh_token,
)
from src.demo_auth.validation import (
    get_current_token_payload,
    get_current_auth_user_for_refresh,
    get_current_active_auth_user,
    validate_auth_user,
)

http_bearer = HTTPBearer(auto_error=False)


class TokenInfo(BaseModel):
    access_token: str
    refresh_token: str | None = None
    token_type: str = "Bearer"


router = APIRouter(
    prefix="/jwt",
    tags=["JWT"],
    dependencies=[Depends(http_bearer)],
)


@router.get(
    "/login",
    response_class=HTMLResponse,
)
def get_login_page(
    request: Request,
):
    pass  # templates.TemplateResponse("login.html", {"request": request})


@router.post(
    "/login",
    response_model=TokenInfo,
)
def auth_user_issue_jwt(
    user: UserSchemaTest = Depends(validate_auth_user),
):
    access_token = create_access_token(user)
    refresh_token = create_refresh_token(user)
    return TokenInfo(
        access_token=access_token,
        refresh_token=refresh_token,
    )


@router.post(
    "/refresh",
    response_model=TokenInfo,
    response_model_exclude_none=True,
)
def auth_refresh_jwt(
    user: UserSchemaTest = Depends(get_current_auth_user_for_refresh),
):
    access_token = create_access_token(user)
    return TokenInfo(
        access_token=access_token,
    )


@router.get("/users/me")  # Проверка информации о текущем пользователе
def auth_user_check_self_info(
    payload: dict = Depends(get_current_token_payload),
    user: UserSchemaTest = Depends(
        get_current_active_auth_user
    ),  # проверка, что такой-то пользователь
):
    iat = payload.get("iat")
    return {
        "username": user.username,
        "email": user.email,
        "logged_in_at": iat,
    }
