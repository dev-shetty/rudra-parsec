

import requests
from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from typing import Optional

router = APIRouter()


# Home
# @router.get("/")
# async def home(request: Request):
#     return {'Finvest': 'Welcome to Finvest API', 'ping': True}