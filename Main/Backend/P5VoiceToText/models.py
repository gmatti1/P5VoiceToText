from P5VoiceToText import db

class Imist_ambo_template(db.Document):
	keyword = db.StringField(required=True, unique=True)
	category = db.StringField(required=True)

