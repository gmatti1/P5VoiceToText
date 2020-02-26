import os
from Config import *
from flask import Flask, flash, request
from flask import jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import speech_recognition as sr

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/")
@app.route("/home")
def home():
	return "home page"
    


@app.route("/about")
def about():
	return "About Page"

@cross_origin(origin=DEV_IP,headers=['Content- Type','Authorization'])
@app.route("/convertVoice",methods=['GET','POST'])
def convertVoice():
	
	recording = sr.Recognizer()
	harvard = sr.AudioFile('resources/VoiceUploads/Recording.wav')

	with harvard as source:
		audio = recording.record(source, duration=6)
		
	
	return jsonify({"data": recording.recognize_google(audio)})


@app.route('/categorizeText')
def categorizeText():
	text = "Dummy Text classified into IMIST-AMBO categories"
	return jsonify(text)


@cross_origin(origin=DEV_IP,headers=['Content- Type','Authorization'])
@app.route("/uploadVoiceFile" , methods=['GET','POST'])
def uploadVoiceFile():
    if not os.path.isdir(UPLOAD_FOLDER):
        os.mkdir(UPLOAD_FOLDER)

    response = False
    if 'file' not in request.files:
        flash('No file part')
        return jsonify("File Not Found")
    
    file = request.files['file'] 
    
    if file and allowed_file(file.filename):
    	filename = secure_filename(file.filename)
    	destination="/".join([UPLOAD_FOLDER, filename])
    	file.save(destination)

    	if os.path.exists(destination):
    		response = True 

    return "got it"


if __name__=='__main__':
	app.secret_key = os.urandom(24)
	app.run()