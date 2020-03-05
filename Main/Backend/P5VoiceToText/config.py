import os

class Config:
	SECRET_KEY = os.urandom(24)
	CORS_HEADERS = ['Content-Type','Authorization']
	UPLOAD_FOLDER = os.path.abspath(os.path.dirname(__file__))+'/resources/VoiceUploads/'
	ALLOWED_EXTENSIONS = {'txt', 'mp3','wav'}

	DEV_IP = 'localhost'
	STG_IP = ''
	PROD_IP = ''

	MONGODB_SETTINGS = {
		'host': 'mongodb://localhost/P5VoiceToText'
	}