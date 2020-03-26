from flask import request, flash, jsonify, Blueprint
from flask_cors import cross_origin

from P5VoiceToText.config import Config
from P5VoiceToText.uploadOrSelectFiles.utils import allowed_extensions, allowed_file

import os
from werkzeug.utils import secure_filename

uploadOrSelectFiles = Blueprint('uploadOrSelectFiles', __name__)

upload_folder = Config.UPLOAD_FOLDER
cors_ip = Config.DEV_IP
cors_header = Config.CORS_HEADERS

@cross_origin(origin=cors_ip,headers=cors_header)
@uploadOrSelectFiles.route("/uploadVoiceFile" , methods=['GET','POST'])
def uploadVoiceFile():
    if not os.path.isdir(upload_folder):
    	os.mkdir(upload_folder)

    if 'file' not in request.files:
        return jsonify("File Not Found")
    
    response = False

    file = request.files['file'] 
    
    if file and allowed_file(file.filename):
    	filename = secure_filename(file.filename)
    	destination="/".join([upload_folder, filename])
    	file.save(destination)

    	if os.path.exists(destination):
    		response = True 

    return response