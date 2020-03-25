from flask import Flask
from flask import jsonify
from flask_cors import CORS, cross_origin
from P5VoiceToText.config import Config
from flask_mongoengine import MongoEngine


db = MongoEngine()


def create_app(config_class=Config):
	app = Flask(__name__)
	app.config.from_object(Config)
	CORS(app, resources={r"/*": {"origins": "*"}})

	db.init_app(app)

	from P5VoiceToText.files.routes import files
	from P5VoiceToText.uploadOrSelectFiles.routes import uploadOrSelectFiles
	from P5VoiceToText.voiceToTextConversion.routes import voiceToTextConversion
	from P5VoiceToText.textClassification.routes import textClassification

	app.register_blueprint(files)
	app.register_blueprint(uploadOrSelectFiles)
	app.register_blueprint(voiceToTextConversion)
	app.register_blueprint(textClassification)

	return app