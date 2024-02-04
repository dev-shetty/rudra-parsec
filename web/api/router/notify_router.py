import re
from datetime import datetime
from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from typing import Optional
from twilio.twiml.messaging_response import MessagingResponse
from twilio.rest import Client as TwilioClient
from newsapi import NewsApiClient
from dotenv import dotenv_values

env = dotenv_values('.env')
from assets.model import SendMessage

newsapi = NewsApiClient(api_key=env.get('PUBLIC_NEWS_API_KEY'))

router = APIRouter()

# Home
@router.post('/respond')
async def respondWA(request: Request):
    try:
        data = await request.form()
        phone = data["From"].replace('whatsapp:','')
        inMsg = data["Body"]
        if (re.match('^hi', inMsg) or re.match('^namaste', inMsg) or re.match('^hello', inMsg)):
            await sendMessages(phone, "Welcome to Finvest. If any doubts check out `.help`. How can I help you today?")
            return None
        elif (re.match('^.help', inMsg)):
            await sendMessages(
                phone, "1. `.learn` - Learn about Finvest."
            )
            return None
        elif (re.match('^.learn', inMsg)):
            result = newsapi.get_top_headlines(q='stock', language='en', country='in')
            if result['status'] == 'ok':
                message = 'The article of the day are:\n'
                for article in result['articles']:
                    message += f"\n*{article['title']}*\n" \
                            f"{article['description']}\n" \
                            f"{article['url']}\n\n"
                await sendMessages(phone, message)
            else:
                await sendMessages(phone, 'Some other time.')
            return None
        return None
    except Exception as e:
        print("notify>respond(Error):", e)
        return str(MessagingResponse().message().body('Something went wrong.'))
    
@router.post('/sendWA')
async def sendWA(request: Request, sendMessage: SendMessage):
    try:
        client = TwilioClient(env.get('TWILIO_ACCOUNT_SID'), env.get('TWILIO_AUTH_TOKEN'))
        client.messages.create(
            body=f"Dear Customer,\nYour Pot due of Rs.{sendMessage.due} for Pot code {sendMessage.pot} due on 11/{datetime.now().month}.\n\nRegards,\nFinvest Team",
            from_=f"whatsapp:{env.get('TWILIO_PHONE_NO')}",
            to=f'whatsapp:+91{sendMessage.phone}'
        )
        return { 'success': True, 'message': 'SMS sent successfully.' }
    except Exception as e:
        print("notify>respond(Error):", e)
        return { 'success': False, 'message': 'Something went wrong.' }


@router.post('/sendSMS')
async def sendSMS(request: Request, sendMessage: SendMessage):
    try:
        client = TwilioClient(env.get('TWILIO_ACCOUNT_SID'), env.get('TWILIO_AUTH_TOKEN'))
        client.messages.create(
            body=f"Dear Customer,\nYour Pot due of Rs.{sendMessage.due} for Pot code {sendMessage.pot} due on 11/{datetime.now().month}.\n\nRegards,\nFinvest Team",
            from_=env.get('TWILIO_PHONE_NO'),
            to=f'+91{sendMessage.phone}'
        )
        return { 'success': True, 'message': 'SMS sent successfully.' }
    except Exception as e:
        print("notify>respond(Error):", e)
        return { 'success': False, 'message': 'Something went wrong.' }



async def sendMessages(phone: str, message: str):
    client = TwilioClient(env.get('TWILIO_ACCOUNT_SID'), env.get('TWILIO_AUTH_TOKEN'))
    client.messages.create(
        body=message,
        from_=f"whatsapp:{env.get('TWILIO_PHONE_NO')}",
        to=f'whatsapp:{phone}'
    )