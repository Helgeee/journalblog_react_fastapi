from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Annotated
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.api_v1.schemas.user_schema import UserCreateSchema, UserSchema

from src.db.models import User
from src.db.database import get_async_session
from src.auth.utils import hash_password

router = APIRouter(prefix="/users", tags=["Пользователи"])


@router.post("", summary="Создание пользователя")
async def create_user(
    user: Annotated[UserCreateSchema, Depends()],
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
