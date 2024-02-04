from pydantic import BaseModel

class Email(BaseModel):
    email: str
    message: str

class NewsGen(BaseModel):
    input: str

class SendMessage(BaseModel):
    due: str
    pot: str
    phone: str
