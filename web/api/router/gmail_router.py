from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from assets.model import Email
from dotenv import dotenv_values
env = dotenv_values('.env')

router = APIRouter()

async def send_email(subject, body, to_email):
    try:
        smtp_server = 'smtp.gmail.com'
        smtp_port = 587 
        smtp_username = 'srujanrai17@gmail.com'
        smtp_password = env.get('EMAIL_PASS')
        recipient_email = to_email

        message = MIMEMultipart()
        message['From'] = 'srujanrai17@gmail.com'
        message['To'] = recipient_email
        message['Subject'] = subject
        message.attach(MIMEText(body, 'plain'))

        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls() 
            server.login(smtp_username, smtp_password)
            server.send_message(message)
            return True
    except Exception as e:
        print(e)
        return False

@router.post('/send_email')
async def send_email_api(request: Request, data: Email):
    try:
        # data = await request.json()
        mail = data.email
        message = data.message
        subject = 'Greetings from rudra'
        if mail and message:
            response= await send_email(subject, message, mail)
            if response==True:
                return JSONResponse({'success': True, 'message': 'Email sent successfully'}, status_code=200)
            else:
                return JSONResponse({'success': False, 'message': 'Email was not successfully'}, status_code=300)
        else:
            return JSONResponse({'success': False, 'message': 'Missing required parameters'}, status_code=300)
    except Exception as e:
        return JSONResponse({'success': False, 'message': f'Error: {str(e)}'}, status_code=500)
