FROM python:3.9-slim
WORKDIR /code
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir --upgrade -r requirements.txt
COPY . /code
EXPOSE 8000 
CMD ["python", "contract.py"]