from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
import nltk
import re, requests, datetime
from gtts import gTTS
import google.generativeai as palm
from config import *
from assets.model import NewsGen

palm.configure(api_key='AIzaSyC5ybtTFJqL05pyHffcdr6PJ4OTms0fNaA') #PALM_API_KEY)

models = [m for m in palm.list_models() if 'generateText' in m.supported_generation_methods]
model = models[0].name

finance_keywords = [
    'investment', 'portfolio', 'stocks', 'bonds', 'dividends', 'assets',
    'liabilities', 'equity', 'mutual funds', 'retirement', 'savings', 'budget',
    'income', 'expenses', 'taxes', 'credit', 'debit', 'interest rates',
    'financial planning', 'wealth management', 'cash flow', 'inflation',
    'crypto', 'derivatives', 'capital', 'risk management', 'insurance',
    'real estate', 'forex', 'exchange rates', 'financial markets', 'trading',
    'stock market', 'market analysis', 'financial statements', 'hedge funds',
    'venture capital', 'private equity', 'financial literacy', 'fintech',
    'financial advisor', '401(k)', 'IRA', 'credit score', 'budgeting',
    'commodities', 'economic indicators'
]

router = APIRouter()


@router.post('/process')
async def process(request: Request, newsGen: NewsGen):
    result = text_to_speech(chatWithAI(newsGen))
    return JSONResponse(result)

def genResp(text):
    completion = palm.generate_text(
        model=model,
        prompt=text,
        temperature=0,
        max_output_tokens=400 
    )
    if isinstance(completion.result, str):
        return completion.result
    else:
        return str(completion.result)

def chatWithAI(language):
    today_date = datetime.datetime.now().strftime('%Y-%m-%d')
    question = f"What is the Latest news on {language} in {today_date}: "
    tokens = nltk.word_tokenize(question)
    for word in tokens:
        if word in finance_keywords:
            language = word
            question = f"What is the Latest news on {language} in {today_date}:"
            break
    if language in finance_keywords:
        res = re.sub(r"\n", "<br>", genResp(question))
        return res
    else:
        res = re.sub(r"\n", "<br>", genResp(question))
        return res

def text_to_speech(text):
    newText = text
    stars = ['**', '*']
    for star in stars:
        newText = newText.replace(star, '')
    icons = ['<br>', '<h2>', '<p>', '</br>', '</h2>', '</p>', '**', '*']
    for icon in icons:
        text = text.replace(icon, '')
    tts = gTTS(text=text, lang='en', slow=False)
    filename = "assets/speech.mp3"
    tts.save(filename)
    response = requests.post("https://picdb.izaries.workers.dev/upload", files={'file': ('speech.mp3', open('speech.mp3', 'rb'))})
    if response.status_code == 200 and response.json()['success']:
        return { 'success': True, 'audio': response.json()["download"], 'text': text }
    else:
        return { 'success': False, 'message': response.json()["message"] }
