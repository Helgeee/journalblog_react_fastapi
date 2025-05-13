from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload, joinedload

from src.db.models import User, Article, Tag, Category, CheckAuthor


async def create_user(
    username: str,
    email: str,
    password: str,
    session: AsyncSession,
) -> User:
    user = User(
        username=username,
        email=email,
        password=password,
    )

    session.add(user)
    await session.commit()
    return user


async def create_article(
    title: str,
    content: str,
    category_id: int,
    session: AsyncSession,
) -> Article:
    article = Article(
        title=title,
        content=content,
        category_id=category_id,
    )

    session.add(article)
    await session.commit()
    return article


async def create_tag(
    name: str,
    session: AsyncSession,
) -> Tag:
    tag = Tag(
        name=name,
    )

    session.add(tag)
    await session.commit()
    return tag


async def create_category(
    name: str,
    session: AsyncSession,
) -> Category:
    category = Category(
        name=name,
    )

    session.add(category)
    await session.commit()
    return category


async def main_relations(
    session: AsyncSession,
):
    user_1 = await create_user("john", "danpavkznm@mail.ru", "qwerty", session)
    user_2 = await create_user("sam", "qaloto@mail.ru", "secret", session)

    category_1 = await create_category("Дороги", session)
    category_2 = await create_category("ПГС", session)

    tag_1 = await create_tag("it в строительстве", session)
    tag_2 = await create_tag("Сопромат", session)

    article_1 = await create_article(
        "Автодороги",
        "road road road road",
        category_id=category_1.id,
        session=session,
    )
    article_2 = await create_article(
        "Мосты",
        "Мосты Мосты Мосты Мосты",
        category_id=category_2.id,
        session=session,
    )

    user_1 = await session.scalar(
        select(User)
        .where(User.id == user_1.id)
        .options(
            selectinload(User.article),
        ),
    )
    user_2 = await session.scalar(
        select(User)
        .where(User.id == user_2.id)
        .options(
            selectinload(User.article),
        ),
    )

    article_1 = await session.scalar(
        select(Article)
        .where(Article.id == article_1.id)
        .options(
            selectinload(Article.tag),
            selectinload(Article.category),
        ),
    )
    article_2 = await session.scalar(
        select(Article)
        .where(Article.id == article_2.id)
        .options(
            selectinload(Article.tag),
            selectinload(Article.category),
        ),
    )

    article_1.tag.append(tag_1)
    article_1.tag.append(tag_2)
    article_2.tag.append(tag_1)

    # article_1.category_id = category_1.id
    # article_2.category_id = category_2.id

    user_1.article.append(article_1)
    user_2.article.append(article_1)
    user_2.article.append(article_2)

    await session.commit()


async def get_users_with_articles(session: AsyncSession) -> list[User]:
    stmt = (
        select(User)
        .options(
            selectinload(User.article),
        )
        .order_by(User.id)
    )
    data = await session.scalars(stmt)
    return list(data)


# async def get_articles_full(session: AsyncSession) -> list[Article]:
#     stmt = (
#         select(Article)
#         .options(
#             selectinload(Article.tag),
#             joinedload(Article.category),
#         )
#         .order_by(Article.id)
#     )
#     data = await session.scalars(stmt)
#     return list(data)


async def get_articles_full_with_users(session: AsyncSession) -> list[Article]:
    stmt = (
        select(Article)
        .options(
            selectinload(Article.tag),
            selectinload(Article.user),
            joinedload(Article.category),
        )
        .order_by(Article.id)
    )
    data = await session.scalars(stmt)
    return list(data)
    # articles = await session.execute(
    #     (
    #         select(Article)
    #         .options(
    #             selectinload(Article.tag),
    #             selectinload(Article.user),
    #             joinedload(Article.category),
    #         )
    #         .offset(offset)
    #         .limit(limit)
    #         .order_by(Article.id)
    #     )
    # )
    # return articles.scalars().all()


# async def demo_m2m(
#     session: AsyncSession,
# ):
#     # await main_relations(session)
#     users = await get_users_with_articles(session)
#     for i, user in enumerate(users):
#         print(
#             f"{i+1}. username: {user.username}, email: {user.email}, авторство: {user.is_author.value}, articles:",
#         )
#         for article in user.article:
#             print(
#                 "-",
#                 f"Заголовок - {article.title},",  # контент - {article.content}, {article.tag},{article.category},{article.created_at}",
#             )
#     articles = await get_articles_full(session)
#     for i, article in enumerate(articles):
#         print(
#             f"{i+1}. Пост: {article.title}, Теги: {";".join(tag.name for tag in article.tag)}, Категории: {article.category.name}"
#         )
