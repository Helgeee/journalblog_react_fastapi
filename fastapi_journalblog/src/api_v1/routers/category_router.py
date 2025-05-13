from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Annotated

from sqlalchemy import select
from src.api_v1.schemas.category_schema import CategoryCreateSchema, CategorySchema
from src.db.database import get_async_session
from sqlalchemy.ext.asyncio import AsyncSession


from src.db.models import Category

router = APIRouter(prefix="/categories", tags=["Категории"])


@router.post("", summary="Создание категории")
async def create_category(
    category: Annotated[CategoryCreateSchema, Depends()],
    session: AsyncSession = Depends(get_async_session),
):
    category_dict = category.model_dump()

    category_model = Category(**category_dict)
    session.add(category_model)
    await session.commit()

    return {"success": True, "category": category.name}


@router.get("", response_model=list[CategorySchema], summary="Получение всех категорий")
async def get_all_categories(
    session: AsyncSession = Depends(get_async_session),
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
):
    categories = await session.execute(select(Category).offset(offset).limit(limit))
    return categories.scalars().all()


@router.get(
    "/{category_id}", response_model=CategorySchema, summary="Получение одной категории"
)
async def get_category(
    category_id: int, session: AsyncSession = Depends(get_async_session)
):
    category = await session.get(Category, category_id)

    if not category:
        raise HTTPException(status_code=404, detail="Категория не найдена")
    return category


# @router.patch("/{category_id}", summary="Изменить имя категории")
# async def update_category_name(
#     category_id: int, new_name: str, session: AsyncSession = Depends(get_async_session)
# ):
#     category = await session.get(Category, category_id)
#
#     if category == None:
#         raise HTTPException(status_code=404, detail="Категория не найден")
#     category.name = new_name
#     await session.commit()
#     return {"new_category_set": True, "category": category}


@router.delete("/{category_id}", summary="Удалить категории")
async def delete_category(
    category_id: int, session: AsyncSession = Depends(get_async_session)
):
    category = await session.get(Category, category_id)

    if category is None:
        raise HTTPException(status_code=404, detail="Категория не найдена")
    await session.delete(category)
    await session.commit()
    return {"success_delete": True}
