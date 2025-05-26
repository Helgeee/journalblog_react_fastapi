import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.api_v1.routers import router as main_router

from src.db.database import db_moves


app = FastAPI()

app.add_middleware(
     CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(main_router)


@app.get("/")
async def root():
    return {"info": "journalblog"}


@app.get("/db-recreate")
async def db_recreate():
    stmt = await db_moves()
    return {"status": "success"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=4000, reload=True)
