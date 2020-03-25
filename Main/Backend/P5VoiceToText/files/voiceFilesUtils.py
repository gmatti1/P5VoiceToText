from P5VoiceToText.models import Voice_files
from pydub import AudioSegment
from P5VoiceToText.config import Config
import boto3
import os

# AWS required
from botocore.exceptions import NoCredentialsError
from botocore.client import Config as ConfigAWS
aws_access_key_id = Config.ACCESS_KEY_ID
aws_access_secret_key = Config.ACCESS_SECRET_KEY
aws_bucket_name = Config.BUCKET_NAME

upload_folder = Config.UPLOAD_FOLDER


class AudioFile:
    def __init__(self):
        self.filename = ""
        self.s3link = ""

    def save_audio_file(self):
        voice_file = Voice_files(filename=self.filename, s3link=self.s3link).save()

    def check_filename_exists(self):
        voice_file = Voice_files.objects(filename__exact =self.filename)
        return len(voice_file) > 0

    def change_media(self, complete_file_path):
        wav_audio = AudioSegment.from_file(complete_file_path)
        newfilename = os.path.splitext(self.filename)[0]
        wav_audio.export(upload_folder + newfilename + ".wav", format="wav")
        self.filename = newfilename + ".wav"
        os.remove(complete_file_path)

    def store_file_aws(self, complete_file_path):
        # Step2: Store the file in AWS S3
        data = open(complete_file_path, 'rb')

        s3 = boto3.resource(
            's3',
            aws_access_key_id=aws_access_key_id,
            aws_secret_access_key=aws_access_secret_key,
            config=ConfigAWS(signature_version='s3v4')
        )
        try:
            s3.Bucket(aws_bucket_name).upload_file(complete_file_path, '%s' % (self.filename))
            s3Link = "s3://" + aws_bucket_name + "/" + self.filename
            return s3Link
        except FileNotFoundError:
            print("Error: The file was not found")
            return ""
        except NoCredentialsError:
            print("Error: Credentials not available")
            return ""
