from flask import request, flash, jsonify, Blueprint
from flask_cors import cross_origin

from P5VoiceToText.config import Config
from P5VoiceToText.textClassification.utils import ClassifyText

textClassification = Blueprint('textClassification', __name__)

cors_ip = Config.DEV_IP
cors_header = Config.CORS_HEADERS
import json

from P5VoiceToText import db
from P5VoiceToText.models import CatergorizedText


def CategorizedTextSave1(str):
	arr= [{"file_name": "convertfile"}, {"convText": str}]
	
    CatergorizedText.objects.insert(arr, load_bulk=False)



@cross_origin(origin=cors_ip,headers=cors_header)
@textClassification.route('/categorizeText')
def categorizeText():
	classifyText = ClassifyText()
	text = classifyText.clean_and_classify()
	CategorizedTextSave1(text);
	return jsonify(text)