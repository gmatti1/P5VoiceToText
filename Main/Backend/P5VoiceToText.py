from flask import Flask
from flask import jsonify

app = Flask(__name__)

@app.route("/")
@app.route("/home")
def home():
	return "Home Page"

@app.route("/about")
def about():
	return "About Page"

@app.route("/convertVoice")
def convertVoice():
	text = "Dummy Voice to Text Converted Text"
	return jsonify(text)

@app.route("/categorizeText")
def categorizeText():
	text = "Dummy Text classified into IMIST-AMBO categories"
	return jsonify(text)

if __name__=='__main__':
	app.run(debug=True)