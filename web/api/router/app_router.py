

import requests
from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from typing import Optional

router = APIRouter()


# Home
@router.get("/")
async def test(request: Request):
    return None