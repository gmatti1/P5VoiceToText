from flask import request, flash, jsonify, Blueprint, render_template
from P5VoiceToText.config import Config
from P5VoiceToText.convertedText.utils import VoiceText
from P5VoiceToText.files.utils import AudioFile

convertedText = Blueprint('convertedText', __name__)

# When User uploads the file, Voice to Text Conversion is done
@convertedText.route("/api/convertedText/<filename>", methods=['POST'])
def voiceToTextConversion(filename):
	audiofile = AudioFile()
	voice_text = VoiceText()
	audiofile.filename = filename
	# try:
	if audiofile.check_filename_exists():
		voice_text.get_voice_text_from_db(filename)
		if len(voice_text.converted_text) > 0:
			print("The entry is already present")
			message = {
				"text": voice_text.converted_text,
				"stats": voice_text.text_stats
			}
			return jsonify(message), 200

		# perform voice to text AWS and store it in DB
		audiofile.get_s3Link()
		# audiofile has s3Link and filename
		voice_text.aws_voice_to_text(audiofile)
		message = {
			"text": voice_text.converted_text,
			"stats": voice_text.text_stats
		}
		voice_text.store_voice_text(filename)
		return jsonify(message), 200
	else:
		message = {
			"message": "File not found in our records"
		}
		return jsonify(message), 404
	# except:
	# 	message = {
	# 		"message": "Internal Server Error, something went wrong"
	# 	}
	# 	return jsonify(message), 500


# When User selects the file, get Converted Text from DB
@convertedText.route("/api/convertedText/<filename>", methods=['GET'])
def get_convertedText(filename):
	audiofile = AudioFile()
	voice_text = VoiceText()
	audiofile.filename = filename
	try:
		if audiofile.check_filename_exists():
			voice_text.get_voice_text_from_db(filename)
			if len(voice_text.converted_text) > 0:
				message = {
					"text": voice_text.converted_text,
					"stats": voice_text.text_stats
				}
				return jsonify(message), 200

			else:
				message = {
					"message": "Text for this Voice File, not found"
				}
				return jsonify(message), 404
		else:
			message = {
				"message": "File not found in our records"
			}
			return jsonify(message), 404
	except:
		message = {
			"message": "Internal Server Error, something went wrong"
		}
		return jsonify(message), 500


# When User Edits ConvertedText Textbox, update Converted Text in DB
@convertedText.route("/api/convertedText/<filename>", methods=['PUT'])
def update_convertedText(filename):
	content = request.json
	if content and 'text' not in content:
		print("In here")
		message = {
			"message": "text is not present in the request"
		}
		return jsonify(message), 400

	audio_file = AudioFile()
	audio_file.filename = filename
	if not audio_file.check_filename_exists():
		message = {
			"message": "File not fount in our records"
		}
		return jsonify(message), 404

	voice_text = VoiceText()
	if not voice_text.check_voice_text_exists(filename):
		message = {
			"message": "Text not found in our records"
		}
		return jsonify(message), 404
	voice_text.converted_text = content['text']
	voice_text.update_voice_text(filename)

	return '', 200
