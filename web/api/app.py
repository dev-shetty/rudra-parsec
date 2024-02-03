
# (c) 2022-2023, Akkil M G (https://github.com/HeimanPictures)
# License: GNU General Public License v3.0


import uvicorn
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional

import router.app_router as app_router
# import router.fr_router as fr_router
import router.gmail_router as gmail_router
import router.newsgen_router as newsgen_router
import router.s2t_router as s2t_router

app = FastAPI(
    title="Finvest API",
    description="This is an application as a service related Financial. It provides awareness and educate the users.",
    version="0.0.1",    
    docs_url="/docs"
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
# app.include_router(fr_router.router, prefix="/api/v1/fr")
app.include_router(gmail_router.router, prefix="/api/v1/gmail")
app.include_router(newsgen_router.router, prefix="/api/v1/newsgen")
app.include_router(s2t_router.router, prefix="/api/v1/t2s")

# Home
@app.get("/")
async def home():
    return JSONResponse(content={"message": "Welcome to Fin API!"}, status_code=200)

if __name__ == "__main__":
  uvicorn.run("app:app", host="0.0.0.0", port=4000, reload=True)