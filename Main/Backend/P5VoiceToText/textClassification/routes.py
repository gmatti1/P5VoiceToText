from flask import request, flash, jsonify, Blueprint
from flask_cors import cross_origin

from P5VoiceToText.config import Config
from P5VoiceToText.textClassification.utils import ClassifyText

textClassification = Blueprint('textClassification', __name__)

cors_ip = Config.DEV_IP
cors_header = Config.CORS_HEADERS

@cross_origin(origin=cors_ip,headers=cors_header)
@textClassification.route('/categorizeText')
def categorizeText():
	classifyText = ClassifyText()
	classifyText.get_voice_text_from_db("test_shefali1.mp3")
	text = classifyText.clean_and_classify()
	classifyText.save_categorizedText_in_db()
	return jsonify(text)