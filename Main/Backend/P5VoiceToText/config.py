import os

class Config:
	SECRET_KEY = os.urandom(24)
	CORS_HEADERS = ['Content-Type','Authorization']
	UPLOAD_FOLDER = os.path.abspath(os.path.dirname(__file__))+'/resources/VoiceUploads/'
	ALLOWED_EXTENSIONS = {'mp3', 'mp4','wav', 'flac', 'm4a', 'aac', 'm4b'}
	AWS_ALLOWED_EXTENSIONS = {'mp3', 'mp4','wav', 'flac'}

	DEV_IP = 'localhost'
	STG_IP = ''
	PROD_IP = ''

	#AWS credentials
	ACCESS_KEY_ID = 'AKIARH6IQHSVXUVLENNE'
	ACCESS_SECRET_KEY = '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'
	BUCKET_NAME = 'voicetotextsourcefile'

	MONGODB_SETTINGS = {
		'host': 'mongodb://localhost/P5VoiceToText'
	}