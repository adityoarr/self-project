from motor.motor_asyncio import AsyncIOMotorClient
from .config import settings


class MongoDB:
    def __init__(self):
        self.client = None
        self.db = None

    async def connect(self):
        try:
            self.client = AsyncIOMotorClient(settings.mongodb_url)
            self.db = self.client.get_database()
            print("Connected to MongoDB!")
        except Exception as e:
            print(f"Could not connect to MongoDB: {e}")

    async def disconnect(self):
        if self.client:
            self.client.close()
            print("Disconnected from MongoDB.")


mongodb = MongoDB()
