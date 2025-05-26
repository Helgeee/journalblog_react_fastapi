from pydantic import BaseModel

from src.api_v1.schemas.category_schema import CategorySchema
from src.api_v1.schemas.tag_schema import TagSchema
from src.api_v1.schemas.user_schema import UserSchema
from src.db.models import IsPublished


class ArticleCreateSchema(BaseModel):
    title: str
    content: str
    category_id: int
    tag_ids: list[int] = []


class ArticleSchema(BaseModel):
    id: int
    title: str
    content: str

    category: CategorySchema = None
    user: list[UserSchema] = []
    tag: list[TagSchema] = []
    is_published: IsPublished

    class Config:
        from_attributes = True
