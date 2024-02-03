import re
from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from typing import Optional
from twilio.twiml.messaging_response import MessagingResponse
from twilio.rest import Client as TwilioClient

from config import *
from assets.model import SendMessage


router = APIRouter()

# Home
@router.post('/respond')
async def respond(request: Request):
    try:
        inMsg = request.values.get('Body', '').lower()
        phone = str(request.form.get('From')).replace('whatsapp:','')
        resp = MessagingResponse()
        msg = resp.message()
        if (re.match('^hi', inMsg) or re.match('^namaste', inMsg) or re.match('^hello', inMsg)):
            msg.body("Welcome to Finvest. If any doubts check out `.help`. How can I help you today?")
            return str(resp)
        elif (re.match('^help')):
            msg.body(
                ""
            )
            return str(resp)
        elif (re.match('^learn', inMsg)):
            msg.body(
                ""
            )
            return str(resp)
    except Exception as e:
        print("notify>respond(Error):", e)
        msg.body("Some place i went wrong.(Analysis)")
        return str(resp)
    
    
@router.post('/sendWA')
async def sendSMS(request: Request, sendMessage: SendMessage):
    try:
        client = TwilioClient(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
        client.messages.create(
            body=f"Dear Customer,\nYour Pot due of Rs.{sendMessage.due} for Pot code {sendMessage.pot} due on {sendMessage.date}.\n\nRegards,\nFinvest Team",
            from_=f'whatsapp:{TWILIO_PHONE_NO}',
            to=f'whatsapp:+91{sendMessage.phone}'
        )
        return { 'success': True, 'message': 'SMS sent successfully.' }
    except Exception as e:
        print("notify>respond(Error):", e)
        return { 'success': False, 'message': 'Something went wrong.' }


@router.post('/sendSMS')
async def sendSMS(request: Request, sendMessage: SendMessage):
    try:
        client = TwilioClient(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
        client.messages.create(
            body=f"Dear Customer,\nYour Pot due of Rs.{sendMessage.due} for Pot code {sendMessage.pot} due on {sendMessage.date}.\n\nRegards,\nFinvest Team",
            from_=f'whatsapp:{TWILIO_PHONE_NO}',
            to=f'whatsapp:+91{sendMessage.phone}'
        )
        return { 'success': True, 'message': 'SMS sent successfully.' }
    except Exception as e:
        print("notify>respond(Error):", e)
        return { 'success': False, 'message': 'Something went wrong.' }

