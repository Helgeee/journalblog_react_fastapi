from datetime import datetime

from sqlalchemy import (
    func,
    ForeignKey,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship
import enum

from src.db.association_tables import (
    UserArticleAssociation,
    ArticleTagAssociation,
)
from src.db.database import Base


class CheckAuthor(str, enum.Enum):
    author = "author"
    not_author = "not author"


class User(Base):
    # __table_args__ = {"extend_existing": True}  # можно удалить при алембике вроде

    username: Mapped[str] = mapped_column(unique=True)
    email: Mapped[str] = mapped_column(unique=True)
    password: Mapped[str]
    is_author: Mapped[CheckAuthor] = mapped_column(default=CheckAuthor.not_author)

    article: Mapped[list["Article"]] = relationship(
        secondary="user_article_association",
        back_populates="user",
    )


class IsPublished(enum.Enum):
    published = "published"
    nonpublished = "nonpublished"


class Tag(Base):
    name: Mapped[str] = mapped_column(nullable=False, unique=True, index=True)

    article: Mapped[list["Article"]] = relationship(
        secondary="article_tag_association",
        back_populates="tag",
    )


class Category(Base):
    name: Mapped[str] = mapped_column(nullable=False, unique=True, index=True)

    article: Mapped[list["Article"]] = relationship(back_populates="category")


class Article(Base):
    # __table_args__ = {"extend_existing": True}  # можно удалить при алембике вроде

    title: Mapped[str] = mapped_column(index=True, nullable=False)
    content: Mapped[str] = mapped_column(nullable=False)
    is_published: Mapped[IsPublished] = mapped_column(default=IsPublished.nonpublished)
    created_at: Mapped[datetime] = mapped_column(
        server_default=func.now(), default=datetime.now()
    )

    user: Mapped[list["User"]] = relationship(
        secondary="user_article_association",
        back_populates="article",
    )

    category_id: Mapped[int] = mapped_column(
        ForeignKey("categorys.id"),
    )
    category: Mapped["Category"] = relationship(back_populates="article")

    tag: Mapped[list["Tag"]] = relationship(
        secondary="article_tag_association",
        back_populates="article",
    )
