from pydantic import BaseModel, EmailStr

from src.db.models import CheckAuthor


class UserCreateSchema(BaseModel):
    username: str
    email: EmailStr


class UserSecretSchema(UserCreateSchema):
    password: str


class UserSchema(UserCreateSchema):
    id: int
    is_author: CheckAuthor
    active: bool = True
    # articles добавить для вывода постов пользователя мб

    class Config:
        from_attributes = True
