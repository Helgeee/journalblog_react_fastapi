from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Annotated
from sqlalchemy import select
from sqlalchemy.orm import selectinload, joinedload
from sqlalchemy.ext.asyncio import AsyncSession

from src.demo_auth.crud import get_user_by_username
from src.api_v1.schemas.user_schema import (
    UserCreateSchema,
    UserSecretSchema,
    UserSchema,
)

from src.db.models import User
from src.db.database import get_async_session
from src.auth.utils import hash_password

router = APIRouter(prefix="/users", tags=["Пользователи"])


@router.post("", summary="Создание пользователя")
async def create_user(
    user: Annotated[UserSecretSchema, Depends()],
    session: AsyncSession = Depends(get_async_session),
):
    user_dict: dict = user.model_dump()
    pass_to_change = user_dict["password"]
    user_dict["password"] = hash_password(pass_to_change)

    user_model = User(**user_dict)
    session.add(user_model)
    await session.commit()

    return {"success": True, "user": user_dict["username"]}


@router.get("", response_model=list[UserSchema], summary="Получение всех пользователей")
async def get_all_users(
    session: AsyncSession = Depends(get_async_session),
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
):
    users = await session.execute(select(User).offset(offset).limit(limit))
    return users.scalars().all()


@router.get(
    "/{user_id}", response_model=UserSchema, summary="Получение одного пользователя"
)
async def get_user(user_id: int, session: AsyncSession = Depends(get_async_session)):
    user = await session.get(User, user_id)

    if not user:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    return user


@router.get(
    "/{username}",
    response_model=UserCreateSchema,
    summary="Поиск пользователя по имени",
)
async def get_user(
    username: int,
    session: AsyncSession = Depends(get_async_session),
):
    user = get_user_by_username(username, session)
    return user


@router.delete("/{user_id}", summary="Удаление пользователя")
async def delete_user(
    user_id: int,
    session: AsyncSession = Depends(get_async_session),
):
    user = await session.get(User, user_id)

    if user is None:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    await session.delete(user)
    await session.commit()
    return {"success_delete": True}


@router.get(
    "/{user_id}/articles",
    response_model=UserSchema,
    summary="Получение пользователя и его постов",
)
async def get_user_with_articles(
    user_id: int,
    session: AsyncSession = Depends(get_async_session),
):  #  -> list[User]
    user_and_artciles = await session.scalar(
        select(User)
        .where(User.id == user_id)
        .options(
            selectinload(User.article),
        )
    )
    # data = await session.scalars(user_and_artciles)
    # return list(data)

    if not user_and_artciles:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    return user_and_artciles


# @router.patch("/{user_id}/update-password", summary="Изменение пароля пользователя")
# async def update_user_password(
#     user_id: int, new_pass: str, session: AsyncSession = Depends(get_async_session)
# ):
#     user = await session.get(User, user_id)
#
#     if user is None:
#         raise HTTPException(status_code=404, detail="Пользователь не найден")
#     user.hashed_password = hash_password(new_pass)
#     await session.commit()
#     return {"new_password_set": True}
