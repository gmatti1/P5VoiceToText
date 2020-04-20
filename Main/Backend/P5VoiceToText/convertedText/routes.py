# -*- coding: utf-8 -*-

"""This file contains all the APIs for audio files

All the audio files are physically stored in Amazon S3, and a copy of
filename, along with the S3 link for that file is stored in local MongoDB
document named "voice_files". In S3 the files are store in the sub-folders,
and these folders are arranged and "MM-DD-YYYY" format of their submission date.

For each audio file, it should be first be called with a POST /api/files and
the body containing the actual file in JSON format. This does 3 operations
1. Check if the file name already exists in the system, if yes rename it by appending
timestamp at the end of the file or else proceed.
2. If the audio file extension is supported by AWS, else convert it to the format
which AWS Transcribe expects.
3. Store the file in AWS S3 and add an entry into "voice_files".



For every voice file, voice-to-text conversion takes place which gives us
convertedText. The sentences of every convertedText, needs to be classified
into imist-ambo categories. The classification results are called
categorizedTexts. This file provides POST, PUT and GET request APIs for
categorizedTexts.

The classification into IMIST-AMBO categories depends on IMIST-AMBO Glossary
which is saved into the database as Imist_ambo_template. This Glossary contains
keyword-category pairs. If a word in a sentence, matches with a keyword in
Imist_ambo_template, then that sentence will belong to the corresponding
category of the keyword-category pair. This file provides, POST and GET request
APIs for IMIST-AMBO Glossary.
"""

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
