# -*- coding: utf-8 -*-

"""Provides DB Collections in MongoDB

This file defines the DB Collections, for the data to be stored in MongoDB.
Here the schema of DB is given with the column names and their types.
"""

from datetime import datetime

from P5VoiceToText import db

__author__ = "Shefali Anand"
__copyright__ = "Copyright 2020, P5VoiceToText"
__credits__ = ["Shefali Anand", "Gangadhar Matti"]
__version__ = "1.0"
__maintainer__ = ["Shefali Anand", "Gangadhar Matti"]
__email__ = "sanand22@asu.edu"
__status__ = "Production"

class Imist_ambo_template(db.Document):
	"""Creates and defines imist_ambo_template db collection

	It's a glossary of IMIST-AMBO which contains category-keyword pairs.

	Attributes
	----------
	keyword : str
		helps to identify category of a sentence
	category : str
		specifies IMIST-AMBO category of the keyword
	"""
	keyword = db.StringField(required=True, unique=True)
	category = db.StringField(required=True)

class Voice_files(db.Document):
	"""Creates and defines voice_files db collection
	
	It is used to store meta-deta information of the voice files, uploaded by 
	users in our app.

	Attributes
	----------
	filename : str
		filename of the voice file, uploaded by user. If the DB already 
		contains same filename, then the filename is updated by a datetime
		suffix
	s3link : str
		link to the location where the file is stored in AWS S3 Bucket
	creation_date : str
		date when the file was uploaded
	"""
	filename = db.StringField(required=True, unique=True)
	s3link = db.StringField(unique=True)
	creation_date = db.DateTimeField(default=datetime.now())

class Voice_text_conversion(db.Document):
	"""Creates and defines voice_text_conversion db collection
	
	Stores the results of voice-to-text conversion,

	Attributes
	----------
	voiceFile : voice_files
		reference object pointing to a voice file
	converted_text : str
		stores text obtained after performing voice-to-text conversion of the 
		voice file stored above
	text_stats : dictionary
		stores statistics of every word obtained from the above converted_text 

	"""
	voiceFile = db.ReferenceField(Voice_files, unique=True)
	converted_text = db.StringField(required=True)
	text_stats = db.ListField(required=True)

class Text_categorization(db.Document):
	"""Creates and defines text_categorization db collection
	
	Stores categorization results of the converted_text.  

	Attributes
	----------
	voiceFile : voice_files
		reference object pointing to a voice file
	identification : list of str
		stores the list of sentences of the above file's converted_text, which 
		are categorized in 'identification'
	mechanism : list of str
		stores the list of sentences of the above file's converted_text, which 
		are categorized in 'mechanism'
	injury : list of str
		stores the list of sentences of the above file's converted_text, which 
		are categorized in 'injury'
	signs : list of str
		stores the list of sentences of the above file's converted_text, which 
		are categorized in 'signs'
	treatment : list of str
		stores the list of sentences of the above file's converted_text, which 
		are categorized in 'treatment'
	allergy : list of str
		stores the list of sentences of the above file's converted_text, which 
		are categorized in 'allergy'
	medication : list of str
		stores the list of sentences of the above file's converted_text, which 
		are categorized in 'medication'
	background : list of str
		stores the list of sentences of the above file's converted_text, which 
		are categorized in 'background'
	other : list of str
		stores the list of sentences of the above file's converted_text, which 
		are categorized in 'other'
	"""
	voiceFile = db.ReferenceField(Voice_files, unique=True)
	identification = db.ListField(db.StringField())
	mechanism = db.ListField(db.StringField())
	injury = db.ListField(db.StringField())
	signs = db.ListField(db.StringField())
	treatment = db.ListField(db.StringField())
	allergy = db.ListField(db.StringField())
	medication = db.ListField(db.StringField())
	background = db.ListField(db.StringField())
	other = db.ListField(db.StringField())
	