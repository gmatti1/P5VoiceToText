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
	try:
		classifyText = ClassifyText()
		if not classifyText.if_voice_file_exists(filename):
			message = {
				"message": "File not found in our records"
			}
			return jsonify(message), 404
		if not classifyText.if_converted_text_exists(filename):
			message = {
				"message": "Converted Text not found in our records"
			}
			return jsonify(message), 404

		if classifyText.if_categorized_text_exists(filename):
			print("Categorized Text already exists")
			text = classifyText.get_categorizedText_from_db(filename)
			return jsonify(text)

		text = classifyText.clean_and_classify()
		classifyText.save_categorizedText_in_db()
		return jsonify(text)
	except:
		message = {
			"message": "Internal Server Error, something went wrong"
		}
		return jsonify(message), 500


# When User selects a file, get Categorized Text from DB
@cross_origin(origin=cors_ip,headers=cors_header)
@categorizedText.route('/categorizedText/<filename>', methods = ['GET'])
def get_categorizedText(filename):
	try:
		classifyText = ClassifyText()
		if not classifyText.if_voice_file_exists(filename):
			message = {
				"message": "File not found in our records"
			}
			return jsonify(message), 404
		if not classifyText.if_categorized_text_exists(filename):
			message = {
				"message": "Categorized Text not found in our records"
			}
			return jsonify(message), 404
		text = classifyText.get_categorizedText_from_db(filename)
		return jsonify(text)
	except:
		message = {
			"message": "Internal Server Error, something went wrong"
		}
		return jsonify(message), 500


# @cross_origin(origin=cors_ip,headers=cors_header)
# @categorizedText.route('/categorizedText/add_imistambo', methods = ['POST'])
# def add_imistambot():
# 	classifyText = ClassifyText()
# 	classifyText.insert_into_imist_ambo_template()


# When User edits ConvertedText, CategorizationText is updated
@cross_origin(origin=cors_ip,headers=cors_header)
@categorizedText.route('/categorizedText/<filename>', methods = ['PUT'])
def update_categorizedText(filename):
	try:
		classifyText = ClassifyText()
		if not classifyText.if_voice_file_exists(filename):
			message = {
				"message": "File not found in our records"
			}
			return jsonify(message), 404
		if not classifyText.if_converted_text_exists(filename):
			message = {
				"message": "Converted Text not found in our records"
			}
			return jsonify(message), 404
		if not classifyText.if_categorized_text_exists(filename):
			message = {
				"message": "Categorized Text not found in our records"
			}
			return jsonify(message), 404

		text = classifyText.clean_and_classify()
		classifyText.save_categorizedText_in_db()
		return jsonify(text)
	except:
		message = {
			"message": "Internal Server Error, something went wrong"
		}
		return jsonify(message), 500