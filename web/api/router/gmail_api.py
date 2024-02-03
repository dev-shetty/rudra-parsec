from flask import Flask, request, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)

def send_email(subject, body, to_email):
    smtp_server = 'smtp.gmail.com'
    smtp_port = 587 
    smtp_username = 'srujanrai17@gmail.com'
    smtp_password = 'yufs dyox opvs bezv'

    sender_email = 'srujanrai17@gmail.com'
    recipient_email = to_email

    message = MIMEMultipart()
    message['From'] = sender_email
    message['To'] = recipient_email
    message['Subject'] = subject
    message.attach(MIMEText(body, 'plain'))

    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls() 
        server.login(smtp_username, smtp_password)
        server.send_message(message)
    print("Message has been sent")

@app.route('/send_email', methods=['POST'])
def send_email_api():
    try:
        data = request.get_json()

        to_email = data.get('to_email', '')
        message = data.get('message', '')
        subject = 'Greetings from rudra'

        if to_email and message:
            send_email(subject, message, to_email)
            return jsonify({'success': True, 'message': 'Email sent successfully'})
        else:
            return jsonify({'success': False, 'message': 'Missing required parameters'})
    except Exception as e:
        return jsonify({'success': False, 'message': f'Error: {str(e)}'})

if __name__ == '__main__':
    app.run(debug=True)
