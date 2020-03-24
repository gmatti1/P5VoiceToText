from flask import request, flash, jsonify, Blueprint
from flask_cors import cross_origin
from P5VoiceToText.config import Config

import os
import time
from werkzeug.utils import secure_filename
from P5VoiceToText.main.utils import AudioFile

# Audio file conversion library
from pydub import AudioSegment

#AWS access imports
import boto3
from botocore.exceptions import NoCredentialsError
from botocore.client import Config as ConfigAWS

main = Blueprint('main', __name__)

# Import all config related variables
upload_folder = Config.UPLOAD_FOLDER
cors_ip = Config.DEV_IP
cors_header = Config.CORS_HEADERS
allowed_extensions = Config.ALLOWED_EXTENSIONS
aws_allowed_extensions = Config.AWS_ALLOWED_EXTENSIONS

aws_access_key_id = Config.ACCESS_KEY_ID
aws_access_secret_key = Config.ACCESS_SECRET_KEY
aws_bucket_name = Config.BUCKET_NAME

@main.route("/files", methods=['GET'])
def get_all_files():
	return "Not Implemented: Fetch all the files from AWS and return it"

@cross_origin(origin=cors_ip,headers=cors_header)
@main.route("/files", methods=['POST'])
def add_new_file():
	if 'file' not in request.files:
		return jsonify("File Not Found")

	file = request.files['file']
	filename = file.filename
	extension = os.path.splitext(filename)[1]

	if len(extension)>0 and extension[1:].lower() not in allowed_extensions:
		return "Not a right format " + extension

	dst = ''
	if file:
		if not os.path.isdir(upload_folder):
			os.mkdir(upload_folder)
		filename = secure_filename(file.filename)
		destination = "/".join([upload_folder, filename])
		file.save(destination)
		dst = destination

	print(time.strftime('%Y%m%d%H%M%S'))
	change_media(filename)
	# if len(extension)>0 and extension[1:].lower() not in aws_allowed_extensions:
	# 	change_media(upload_folder + filename)

	store_file_aws(filename)

	audio_file = AudioFile()
	audio_file.filename = "filename"
	audio_file.s3link = "s3Link"
	# audio_file.save_audio_file()
	audio_file.check_filename_exists()

	return dst

def change_media(filename):
	wav_audio = AudioSegment.from_file(upload_folder + "/" + filename)
	newfilename = os.path.splitext(filename)[0]
	wav_audio.export(upload_folder + "/" + newfilename+".wav", format="wav")

def store_file_aws(filename):
	# Step2: Store the file in AWS S3
	filename = upload_folder + "/" + filename

	data = open(filename, 'rb')

	s3 = boto3.resource(
		's3',
		aws_access_key_id=aws_access_key_id,
		aws_secret_access_key=aws_access_secret_key,
		config=ConfigAWS(signature_version='s3v4')
	)

	try:
		s3.Bucket(aws_bucket_name).put_object(Key=filename, Body=data)
	except FileNotFoundError:
		print("Error: The file was not found")
	except NoCredentialsError:
		print("Error: Credentials not available")

def fetch_all_files_db(filename):
	# Fetch and return the new name of the file
	return "new name"