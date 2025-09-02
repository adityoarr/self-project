from pydantic import BaseModel, Field, BeforeValidator
from typing import Optional, Annotated
from bson import ObjectId

# This function is used to convert the ObjectId to a string
PyObjectId = Annotated[str, BeforeValidator(str)]


class ItemCreate(BaseModel):
    category: str
    name: str
    link: str


class ItemUpdate(BaseModel):
    category: str
    name: str
    link: str


class Item(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    category: str
    name: str
    link: str

    class Config:
        from_attributes = True
        populate_by_name = True
