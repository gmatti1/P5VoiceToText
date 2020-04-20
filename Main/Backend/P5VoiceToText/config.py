# -*- coding: utf-8 -*-

"""Provides all the necessary configurations needed to setup the Flask app.

It will contain all the variables which could be used anywhere in the project. 
This defines the "system properties", all the necessary variables, required
anywhere in the project, which has to be hardcoded should be initialized and 
defined here
"""

import os


__author__ = "Shefali Anand"
__copyright__ = "Copyright 2020, P5VoiceToText"
__credits__ = ["Shefali Anand", "Gangadhar Matti", "Surya Cherukuri"]
__version__ = "1.0"
__maintainer__ = ["Shefali Anand", "Gangadhar Matti", "Surya Cherukuri"]
__email__ = "sanand22@asu.edu"
__status__ = "Production"

class Config(object):
	"""Defines "System Property" variables

	Attributes
	----------
	SECRET_KEY : str
		To keep the client-side session secure
	CORS_HEADERS : list of str
		Cross Origin Resource Sharing Headers
	UPLOAD_FOLDER : str
		Path to the folder where the uploaded file is stored in backend server
	ALLOWED_EXTENSIONS : dictionary
		A dictionary of extensions of the voice files uploaded by user, which 
		will be allowed in our app.
	AWS_ALLOWED_EXTENSIONS : dictionary
		A dictionary of extensions of the voice files that will be allowed in 
		AWS for Voice-to-text conversion
	
	DEV_IP : str
		IP address for 'development' environment
	STG_IP : str
		IP address for 'staging' environment
	PROD_IP : str
		IP address for 'profuction' environment

	ACCESS_KEY_ID : str
		AWS Crediatial - required to access AWS
	ACCESS_SECRET_KEY : str
		AWS Crediatial - required to access AWS
	BUCKET_NAME : str
		AWS S3 Bucket

	MONGODB_SETTINGS : dictionary
		specifies where the MongoDB is hosted
	"""
	DEBUG = False
	SECRET_KEY = os.urandom(24)
	CORS_HEADERS = ['Content-Type','Authorization']
	UPLOAD_FOLDER = os.path.abspath(os.path.dirname(__file__)) \
	+'/resources/VoiceUploads/'
	ALLOWED_EXTENSIONS = {'mp3', 'mp4','wav', 'flac', 'm4a', 'aac', 'm4b'}
	AWS_ALLOWED_EXTENSIONS = {'wav'}

	DEV_IP = 'localhost'
	STG_IP = ''
	PROD_IP = '54.189.169.94'

	#AWS credentials
	ACCESS_KEY_ID = 'AKIARH6IQHSVXUVLENNE'
	ACCESS_SECRET_KEY = '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'
	BUCKET_NAME = 'voicetotextsourcefile'

	#MongoDB DEV
	MONGODB_SETTINGS = {
		'host': 'mongodb://localhost/P5VoiceToText'
	}


	
class DevelopmentConfig(Config):
	"""Configurations for Development"""
	DEBUG = True


class TestingConfig(Config):
	"""Configurations for Testing, with a separate test database."""
	TESTING = True
	MONGODB_SETTINGS = {
		'host': 'mongodb://localhost/test_P5VoiceToText'
	}
	Config.BUCKET_NAME = 'testvoicetotextbucket'
	DEBUG = True


class ProductionConfig(Config):
	"""Configurations for Testing, with a database hosted in Production Server."""
	TESTING = False
	#MongoDB PROD
	MONGODB_SETTINGS = {
		'host': 'mongodb://54.214.166.253:27017/P5VoiceToText'
	}
	DEBUG = False


app_config = {
	'development': DevelopmentConfig,
	'testing': TestingConfig,
	# 'staging': StagingConfig,
	'production': ProductionConfig,
}