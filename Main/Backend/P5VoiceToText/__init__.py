# -*- coding: utf-8 -*-

"""Creates the Flask app with DB, CORS and route configurations

It creates "db" object of MongoEngine class. The necessary configurations
including MongoDB configurations defined in config.py are loaded in app. 
The app initializes "db" object with it's loaded configurations. 

The app registers the routes of the three subpackages - files, convertedText 
and categorizedText, allowing to access their routes or APIs. 
"""

from flask import Flask
from flask import jsonify
from flask_cors import CORS, cross_origin
from flask_mongoengine import MongoEngine
import mongoengine as me
from P5VoiceToText.config import Config, app_config


__author__ = "Shefali Anand"
__copyright__ = "Copyright 2020, P5VoiceToText"
__credits__ = ["Shefali Anand"]
__version__ = "1.0"
__maintainer__ = ["Shefali Anand"]
__email__ = "sanand22@asu.edu"
__status__ = "Production"


db = MongoEngine()


def create_app(config_name):
	"""Creates Flask app

	Parameters
	----------
	Config : config.py
		all the necessary configurations required to setup app

	Return
	------
	Flask app
		Flask Project app
	"""

	# necessary configurations in config.py is loaded in app.
	app = Flask(__name__)
	app.config.from_object(app_config[config_name])
	app.config.from_pyfile('config.py')

	# registers app with CORS
	CORS(app, resources={r"/*": {"origins": "*"}})

	# initializes "db" object.
	db_config = DevelopmentConfig.MONGODB_SETTINGS
	connection = me.connect(**db_config)
	me.connection.disconnect()
	db.init_app(app)
	
	# routes in subpackages are registered in app
	from P5VoiceToText.files.routes import files
	from P5VoiceToText.convertedText.routes import convertedText
	from P5VoiceToText.categorizedText.routes import categorizedText
	app.register_blueprint(files)
	app.register_blueprint(convertedText)
	app.register_blueprint(categorizedText)

	return app