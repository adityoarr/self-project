from typing import List, Dict
from bson import ObjectId

from ..schemas.item import Item, ItemCreate, ItemUpdate
from ..core.database import mongodb


async def get_items() -> List[Dict]:
    items = []
    async for item in mongodb.db.items.find():
        items.append(item)
    return items


async def create_items(items: List[ItemCreate]) -> List[Dict]:    
    item_dicts = [item.model_dump() for item in items]
    result = await mongodb.db.items.insert_many(item_dicts)
    for i, item_dict in enumerate(item_dicts):
        item_dict["_id"] = result.inserted_ids[i]
    return item_dicts


async def get_item(item_id: str) -> Dict | None:
    if not ObjectId.is_valid(item_id):
        return None
    item = await mongodb.db.items.find_one({"_id": ObjectId(item_id)})
    return item


async def update_item(item_id: str, item_update: ItemUpdate) -> Dict | None:    
    if not ObjectId.is_valid(item_id):
        return None

    update_data = item_update.model_dump(exclude_unset=True)
    result = await mongodb.db.items.update_one(
        {"_id": ObjectId(item_id)}, {"$set": update_data}
    )

    if result.matched_count == 0:
        return None

    return await get_item(item_id)


async def delete_item(item_id: str) -> Dict | None:    
    if not ObjectId.is_valid(item_id):
        return None

    item = await get_item(item_id)
    if not item:
        return None

    await mongodb.db.items.delete_one({"_id": ObjectId(item_id)})
    return item
