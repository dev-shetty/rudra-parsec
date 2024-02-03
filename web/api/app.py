
# (c) 2022-2023, Akkil M G (https://github.com/HeimanPictures)
# License: GNU General Public License v3.0


import uvicorn, io, requests
from fastapi import FastAPI
from fastapi.responses import JSONResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from typing import Optional
from PIL import Image, ImageDraw, ImageFont
from config import *

import router.app_router as app_router

app = FastAPI(
    title="Meme Maker API",
    description="This is an application as a service to create memes.",
    version="0.0.2",
    contact={
        "name": "Akkil M G",
        "url": "http://github.com/HeimanPictures",
    },
    license_info={
        "name": "GNU GENERAL PUBLIC License v3.0",
        "url": "https://www.gnu.org/licenses/gpl-3.0.en.html",
    },
    docs_url="/akkil/docs"
)

origins = [
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(app_router.router, prefix="/api/v1")

# Home
@app.get("/")
async def home():
    return JSONResponse(content={"message": "Welcome to Fin API!"}, status_code=200)

if __name__ == "__main__":
  uvicorn.run("app:app", host="0.0.0.0", port=8080, reload=True)