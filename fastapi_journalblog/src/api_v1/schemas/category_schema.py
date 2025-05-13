from pydantic import BaseModel


class CategoryBaseSchema(BaseModel):
    name: str

    class Config:
        from_attributes = True


class CategoryCreateSchema(CategoryBaseSchema):
    pass


class CategorySchema(CategoryBaseSchema):
    id: int
