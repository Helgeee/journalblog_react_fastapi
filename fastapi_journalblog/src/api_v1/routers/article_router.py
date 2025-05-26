from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Annotated

from sqlalchemy import select
from sqlalchemy.orm import selectinload, joinedload

from src.db.models import Article, Category, Tag
from src.db.database import get_async_session
from sqlalchemy.ext.asyncio import AsyncSession

from src.api_v1.schemas.article_schema import (
    ArticleCreateSchema,
    ArticleSchema,
)

router = APIRouter(prefix="/articles", tags=["Посты"])


@router.post("", summary="Создание поста")
async def create_article(
    article_data: Annotated[ArticleCreateSchema, Depends()],
    session: AsyncSession = Depends(get_async_session),
):
    category = await session.execute(
        select(Category).where(Category.id == article_data.category_id)
    )
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")

    # Получаем теги
    tags = []
    if article_data.tag_ids:
        tags = (
            (await session.execute(select(Tag).where(Tag.id.in_(article_data.tag_ids))))
            .scalars()
            .all()
        )

        if len(tags) != len(article_data.tag_ids):
            raise HTTPException(status_code=400, detail="Some tags not found")

    # Создаём статью
    article = Article(
        title=article_data.title,
        content=article_data.content,
        category_id=article_data.category_id,
        tag=tags,
    )

    session.add(article)
    await session.commit()
    await session.refresh(article)

    return {"success": True, "article": article}


@router.get("", response_model=list[ArticleSchema], summary="Получение всех постов")
async def get_all_articles(
    session: AsyncSession = Depends(get_async_session),
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
):
    articles = await session.execute(
        (
            select(Article)
            .options(
                selectinload(Article.tag),
                selectinload(Article.user),
                joinedload(Article.category),
            )
            .offset(offset)
            .limit(limit)
            .order_by(Article.id)
        )
    )
    return articles.scalars().all()


@router.get(
    "/{article_id}", response_model=ArticleSchema, summary="Получение одного поста"
)
async def get_article(
    article_id: int, session: AsyncSession = Depends(get_async_session)
):
    article = await session.scalar(
        select(Article)
        .where(Article.id == article_id)
        .options(
            selectinload(Article.tag),
            selectinload(Article.category),
            selectinload(Article.user),
        )
    )

    if not article:
        raise HTTPException(status_code=404, detail="Пост не найден")
    return article


@router.delete("/{article_id}", summary="Удаление поста")
async def delete_article(
    article_id: int, session: AsyncSession = Depends(get_async_session)
):
    article = await session.get(Article, article_id)

    if article is None:
        raise HTTPException(status_code=404, detail="Пост не найден")
    await session.delete(article)
    await session.commit()
    return {"succes_delete": True}


# @router.patch(
#     "/{article_id}", response_model=ArticleBaseSchema, summary="Изменение поста"
# )
# async def update_article_name(
#     article_id: int,
#     article_update: ArticleBaseSchema,
#     session: AsyncSession = Depends(get_async_session),
# ):
#     article = await session.get(Article, article_id)
#
#     if article == None:
#         raise HTTPException(status_code=404, detail="Пост не найден")
#
#     article_data = article_update.model_dump(exclude_unset=True)
#     for key, value in article_data.items():
#         setattr(article, key, value)
#
#     await session.commit()
#     await session.refresh(article)
#     return {"new_article_set": True, "article": article}
