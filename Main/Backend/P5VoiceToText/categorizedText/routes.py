from flask import request, flash, jsonify, Blueprint
from flask_cors import cross_origin

from P5VoiceToText.config import Config
from P5VoiceToText.categorizedText.utils import ClassifyText

categorizedText = Blueprint('categorizedText', __name__)

cors_ip = Config.DEV_IP
cors_header = Config.CORS_HEADERS

# When User uploads the file, Categorization is done
@cross_origin(origin=cors_ip,headers=cors_header)
@categorizedText.route('/categorizedText/<filename>', methods = ['POST'])
def textCategorization(filename):
	classifyText = ClassifyText()
	classifyText.get_voice_text_from_db(filename)
	text = classifyText.clean_and_classify()
	classifyText.save_categorizedText_in_db()
	return jsonify(text)

# When User selects a file, get Categorized Text from DB
@cross_origin(origin=cors_ip,headers=cors_header)
@categorizedText.route('/categorizedText/<filename>', methods = ['GET'])
def get_categorizedText(filename):
	classifyText = ClassifyText()
	text = classifyText.get_categorizedText_from_db(filename)
	return jsonify(text)