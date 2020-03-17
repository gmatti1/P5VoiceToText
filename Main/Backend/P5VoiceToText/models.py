from P5VoiceToText import db

class Imist_ambo_template(db.Document):
	keyword = db.StringField(required=True, unique=True)
	category = db.StringField(required=True)

class Voice_files(db.Document):
	filename = db.StringField(required=True, unique=True)
	s3link = db.StringField(unique=True)

class Voice_text_conversion(db.Document):
	voiceFile = db.ReferenceField(Voice_files)
	converted_text = db.StringField(required=True, unique=True)

class Text_categorization(db.Document):
	voiceFile = db.ReferenceField(Voice_files)
	identification = db.ListField(db.StringField())
	mechanism = db.ListField(db.StringField())
	injury = db.ListField(db.StringField())
	signs = db.ListField(db.StringField())
	treatment = db.ListField(db.StringField())
	allergy = db.ListField(db.StringField())
	medication = db.ListField(db.StringField())
	background = db.ListField(db.StringField())
	other = db.ListField(db.StringField())

