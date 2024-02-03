from flask import Flask, request, render_template
import nltk
import re
import datetime
from gtts import gTTS
import google.generativeai as palm
from dotenv import load_dotenv

load_dotenv()

palm.configure(api_key='AIzaSyC5ybtTFJqL05pyHffcdr6PJ4OTms0fNaA')

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

app = Flask(__name__, static_folder='static')


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def process():
    user_input = request.form['user_input']
    result = text_to_speech(chatWithAI(user_input))
    return render_template('result.html', result=result)

def genResp(text):
    completion = palm.generate_text(
        model=model,
        prompt=text,
        temperature=0,
        max_output_tokens=400  # The maximum length of the response
    )
    # Ensure the result is a string
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
            break  # Stop checking further if a keyword is found

    # Check if the input is in the list of finance keywords
    if language in finance_keywords:
        # Generate response based on selected question
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

    # Remove HTML tags from the text
    icons = ['<br>', '<h2>', '<p>', '</br>', '</h2>', '</p>', '**', '*']
    for icon in icons:
        text = text.replace(icon, '')

    # Convert text to speech
    tts = gTTS(text=text, lang='en', slow=False)

    # Save the speech audio into a file
    filename = "static/speech.mp3"  # Save in the 'static' folder for Flask to serve
    tts.save(filename)

    return filename, newText


if __name__ == '__main__':
    app.run(debug=True)
