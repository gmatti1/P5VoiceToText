from flask import request, flash, jsonify, Blueprint
from flask_cors import cross_origin

from P5VoiceToText.config import Config
import json

from P5VoiceToText import db
from P5VoiceToText.models import ConvertedText

import speech_recognition as sr

voiceToTextConversion = Blueprint('voiceToTextConversion', __name__)

upload_folder = Config.UPLOAD_FOLDER
cors_ip = Config.DEV_IP
cors_header = Config.CORS_HEADERS
def voicetoTextSave(str):
    arr= [{"file_name": "convertfile","convText": str}]
	
    ConvertedText.objects.insert(arr, load_bulk=False)



@cross_origin(origin=cors_ip,headers=cors_header)
@voiceToTextConversion.route("/convertVoice",methods=['GET','POST'])
def convertVoice():
	
	recording = sr.Recognizer()
	harvard = sr.AudioFile(upload_folder+'/Recording.wav')
    
	with harvard as source:
		audio = recording.record(source, duration=6)
	str1 = str(recording.recognize_google(audio))
	response= jsonify({"data": recording.recognize_google(audio)})
	response.headers.add('Access-Control-Allow-Origin', '*')
	voicetoTextSave(str1)
	return response