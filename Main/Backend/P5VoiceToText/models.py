from P5VoiceToText import db

class Imist_ambo_template(db.Document):
	keyword = db.StringField(required=True, unique=True)
	category = db.StringField(required=True)
	
class ConvertedText(db.Document):
    file_name = db.StringField(required=True, unique=True)
    convText=db.StringField( required=True)
class CatergorizedText(db.Document):
    file_name = db.StringField(required=True, unique=True)
    cateText=db.StringField( required=True)
	

