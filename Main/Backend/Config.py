import os

UPLOAD_FOLDER = os.path.abspath(os.path.dirname(__file__))+'/resources/VoiceUploads/'
ALLOWED_EXTENSIONS = {'txt', 'mp3'}

DEV_IP = 'localhost'
STG_IP = ''
PROD_IP = ''