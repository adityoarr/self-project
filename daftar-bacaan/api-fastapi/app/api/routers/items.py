from fastapi import APIRouter, HTTPException, status
from typing import List

from ...schemas.item import Item, ItemCreate, ItemUpdate
from ...crud import item as crud

router = APIRouter(
    prefix="/items",
    tags=["items"],
    responses={404: {"description": "Not found"}},
)


@router.get("/", response_model=List[Item])
async def read_items():
    return await crud.get_items()


@router.post("/", response_model=List[Item], status_code=status.HTTP_201_CREATED)
async def create_new_item(item: List[ItemCreate]):
    return await crud.create_items(item)


@router.get("/{item_id}", response_model=Item)
async def read_item(item_id: str):
    db_item = await crud.get_item(item_id)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item


@router.put("/{item_id}", response_model=Item)
async def update_existing_item(item_id: str, item: ItemUpdate):
    db_item = await crud.update_item(item_id, item)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item


@router.delete("/{item_id}", response_model=Item)
async def delete_existing_item(item_id: str):
    db_item = await crud.delete_item(item_id)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item
