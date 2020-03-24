from flask import request, flash, jsonify, Blueprint
from flask_cors import cross_origin

from P5VoiceToText.config import Config
from P5VoiceToText.textClassification.utils import ClassifyText

textClassification = Blueprint('textClassification', __name__)

cors_ip = Config.DEV_IP
cors_header = Config.CORS_HEADERS

@cross_origin(origin=cors_ip,headers=cors_header)
@textClassification.route('/categorizeText', methods = ['GET', 'POST'])
def categorizeText():
	filename = request.get_json()['filename']
	classifyText = ClassifyText()
	#classifyText.test_db()
	classifyText.get_voice_text_from_db(filename)
	text = classifyText.clean_and_classify()
	classifyText.save_categorizedText_in_db()
	return jsonify(text)

@cross_origin(origin=cors_ip,headers=cors_header)
@textClassification.route('/savedCategorizeText', methods = ['GET', 'POST'])
def get_categorizeText_from_selected_file():
	filename = request.get_json()['filename']
	classifyText = ClassifyText()
	text = classifyText.get_categorizedText_from_db(filename)
	return jsonify(text)