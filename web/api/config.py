from dotenv import dotenv_values
env = dotenv_values('.env')

EMAIL = 'srujanrai17@gmail.com'
EMAIL_PASS = env.get('EMAIL_PASS')
PALM_API_KEY = env.get('PALM_API_KEY')

TWILIO_ACCOUNT_SID = env.get('TWILIO_ACCOUNT_SID')
TWILIO_AUTH_TOKEN = env.get('TWILIO_AUTH_TOKEN')
TWILIO_PHONE_NO = env.get('TWILIO_PHONE_NO')

PUBLIC_NEWS_API_KEY = env.get('PUBLIC_NEWS_API_KEY')