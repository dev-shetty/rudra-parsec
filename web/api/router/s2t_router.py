from fastapi import APIRouter, File, UploadFile
from fastapi.responses import JSONResponse
import speech_recognition as sr

router = APIRouter()

@router.post("/speech-to-text")
async def speech_to_text(file: UploadFile = File(...)):
    try:
        recognizer = sr.Recognizer()
        audio_data = recognizer.record(file.file)
        text = recognizer.recognize_google(audio_data)
        return {"text": text}
    except sr.UnknownValueError:
        return JSONResponse(content={"error": "Could not understand audio"}, status_code=400)

    except sr.RequestError as e:
        return JSONResponse(content={"error": f"Error fetching results: {e}"}, status_code=500)
