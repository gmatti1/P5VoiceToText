import os

class Config:
	SECRET_KEY = os.urandom(24)
	CORS_HEADERS = ['Content-Type','Authorization']
	UPLOAD_FOLDER = os.path.abspath(os.path.dirname(__file__))+'/resources/VoiceUploads/'
	ALLOWED_EXTENSIONS = {'mp3', 'mp4','wav', 'flac', 'm4a', 'aac', 'm4b'}
	AWS_ALLOWED_EXTENSIONS = {'wav'}

	DEV_IP = 'localhost'
	STG_IP = ''
	PROD_IP = ''

	#AWS credentials
	ACCESS_KEY_ID = 'AKIARH6IQHSVXUVLENNE'
	ACCESS_SECRET_KEY = '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'
	BUCKET_NAME = 'voicetotextsourcefile'

	#MongoDB DEV
	MONGODB_SETTINGS = {
		'host': 'mongodb://localhost/P5VoiceToText'
	}

	'''
	#MongoDB PROD
	MONGODB_SETTINGS = {
		'host': 'mongodb://54.214.166.253:27017/P5VoiceToText'
	}
	'''