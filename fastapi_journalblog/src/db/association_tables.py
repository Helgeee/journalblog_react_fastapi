from sqlalchemy import ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column

from src.db.database import Base


class UserArticleAssociation(Base):
    __tablename__ = "user_article_association"
    table_name = (
        UniqueConstraint(
            "user_id",
            "article_id",
            name="idx_unique_user_article",
        ),
    )

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    article_id: Mapped[int] = mapped_column(ForeignKey("articles.id"))


class ArticleTagAssociation(Base):
    __tablename__ = "article_tag_association"
    table_name = (
        UniqueConstraint("article_id", "tag_id", name="idx_unique_article_tag"),
    )

    article_id: Mapped[int] = mapped_column(ForeignKey("articles.id"))
    tag_id: Mapped[int] = mapped_column(ForeignKey("tags.id"))


#
# class ArticleCategoryAssociation(Base):
#     __tablename__ = "article_category_association"
#     table_name = (
#         UniqueConstraint(
#             "article_id", "category_id", name="idx_unique_article_category"
#         ),
#     )
#
#     article_id: Mapped[int] = mapped_column(ForeignKey("articles.id"))
#     category_id: Mapped[int] = mapped_column(ForeignKey("categorys.id"))
