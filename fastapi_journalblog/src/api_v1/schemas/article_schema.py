from pydantic import BaseModel

from src.api_v1.schemas.category_schema import CategoryBaseSchema
from src.api_v1.schemas.tag_schema import TagBaseSchema
from src.api_v1.schemas.user_schema import UserBaseSchema
from src.db.models import IsPublished


class ArticleBaseSchema(BaseModel):
    title: str
    content: str
    # category_id: int

    category: CategoryBaseSchema = None
    user: list[UserBaseSchema] = []
    tag: list[TagBaseSchema] = []

    class Config:
        from_attributes = True


class ArticleCreateSchema(ArticleBaseSchema):
    pass


class ArticleSchema(ArticleBaseSchema):
    id: int
    is_published: IsPublished
