import json

from P5VoiceToText import db
from P5VoiceToText.models import ConvertedText


def voicetoTextSave1(str):
	arr= [{"file_name": "convertfile"}, {"convText": str}]
	
    ConvertedText.objects.insert(arr, load_bulk=False)

