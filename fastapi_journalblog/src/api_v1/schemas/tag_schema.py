from pydantic import BaseModel


class TagCreateSchema(BaseModel):
    name: str


class TagSchema(TagCreateSchema):
    id: int

    class Config:
        from_attributes = True
