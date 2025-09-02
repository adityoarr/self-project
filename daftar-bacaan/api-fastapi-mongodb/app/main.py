from fastapi import FastAPI
from contextlib import asynccontextmanager
from .api.routers import items
from .core.database import mongodb


@asynccontextmanager
async def lifespan(app: FastAPI):    
    await mongodb.connect()
    yield
    await mongodb.disconnect()


app = FastAPI(lifespan=lifespan)

app.include_router(items.router)


@app.get("/")
def read_root():
    return {"message": "Reading List API with FastAPI"}
