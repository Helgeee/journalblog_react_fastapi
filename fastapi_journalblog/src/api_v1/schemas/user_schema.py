from pydantic import BaseModel, EmailStr

from src.db.models import CheckAuthor


class UserBaseSchema(BaseModel):
    username: str
    email: EmailStr

    class Config:
        from_attributes = True


class UserCreateSchema(UserBaseSchema):
    password: str


class UserSchema(UserBaseSchema):
    id: int
    is_author: CheckAuthor
    # articles добавить для вывода постов пользователя мб


class UserSchemaTest(BaseModel):
    username: str
    password: bytes
    email: EmailStr
    active: bool = True
