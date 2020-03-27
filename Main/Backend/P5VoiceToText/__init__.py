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
	from P5VoiceToText.convertedText.routes import convertedText
	from P5VoiceToText.categorizedText.routes import categorizedText

	app.register_blueprint(files)
	app.register_blueprint(convertedText)
	app.register_blueprint(categorizedText)

	return app