from pydantic import BaseModel


class TagBaseSchema(BaseModel):
    name: str

    class Config:
        from_attributes = True


class TagCreateSchema(TagBaseSchema):
    pass


class TagSchema(TagBaseSchema):
    id: int
