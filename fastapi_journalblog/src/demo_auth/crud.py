from fastapi import Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.db.models import User
from src.db.database import get_async_session

session: AsyncSession = (Depends(get_async_session),)


async def get_user_by_username(
    username: str,
    session: AsyncSession,
) -> User | None:
    user = await session.execute(select(User).where(User.username == username))
    if not user:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    return user.scalars().first()
