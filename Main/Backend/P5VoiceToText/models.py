from P5VoiceToText import db

class Imist_ambo_template(db.Document):
	keyword = db.StringField(required=True, unique=True)
	category = db.StringField(required=True)
	
class ConvertedText(db.Document):
    file_name = db.StringField(required=True, unique=True)
    s3_link = db.StringField(required=True)
    convertedText = db.StringField(required=True)
    categorizedText=db.StringField( required=True)

