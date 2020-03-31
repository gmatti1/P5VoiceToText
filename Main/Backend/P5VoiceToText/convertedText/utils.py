import boto3
import time
import requests

from P5VoiceToText.models import Voice_text_conversion
from P5VoiceToText.files.utils import AudioFile

from P5VoiceToText.config import Config

# AWS required
from botocore.exceptions import NoCredentialsError
from botocore.client import Config as ConfigAWS
aws_access_key_id = Config.ACCESS_KEY_ID
aws_access_secret_key = Config.ACCESS_SECRET_KEY
aws_bucket_name = Config.BUCKET_NAME


class VoiceText:
    def __init__(self):
        self.voice_file = None
        self.converted_text = ""
        self.text_stats = []

    # test_gangadhar1.mp3
    def get_voice_text_from_db(self, filename):
        audio_file = AudioFile()
        audio_file.filename = filename
        self.voice_file = audio_file.get_voice_file_from_db()
        text = Voice_text_conversion.objects.filter(voiceFile=self.voice_file)
        if len(text) == 0:
            self.voice_file = None
            self.converted_text = ""
            return
        self.converted_text = text[0].converted_text
        self.text_stats = text[0].text_stats


    def check_voice_text_exists(self, filename):
        audio_file = AudioFile()
        audio_file.filename = filename
        self.voice_file = audio_file.get_voice_file_from_db()
        text = Voice_text_conversion.objects.filter(voiceFile=self.voice_file)
        return len(text) > 0

    def update_voice_text(self, filename):
        audio_file = AudioFile()
        audio_file.filename = filename
        self.voice_file = audio_file.get_voice_file_from_db()
        text = Voice_text_conversion.objects.filter(voiceFile=self.voice_file)[0]
        text.converted_text = self.converted_text
        text.save()

    def store_voice_text(self, filename):
        audio_file = AudioFile()
        audio_file.filename = filename
        self.voice_file = audio_file.get_voice_file_from_db()
        voice_text_conversion = Voice_text_conversion(voiceFile=self.voice_file, converted_text=self.converted_text,
                                                      text_stats=self.text_stats).save()

    def aws_voice_to_text(self, audiofile):
        transcribe = boto3.client(
            'transcribe',
            region_name="us-west-2",
            aws_access_key_id=aws_access_key_id,
            aws_secret_access_key=aws_access_secret_key
        )

        JOB_NAME = audiofile.filename

        transcribe.start_transcription_job(
            TranscriptionJobName=JOB_NAME,
            Media={'MediaFileUri': audiofile.s3link},
            MediaFormat='wav',
            LanguageCode='en-US'
        )
        while True:
            status = transcribe.get_transcription_job(TranscriptionJobName=JOB_NAME)
            if status['TranscriptionJob']['TranscriptionJobStatus'] in ['COMPLETED', 'FAILED']:
                break
            time.sleep(5)

        text_uri = status.get("TranscriptionJob").get("Transcript").get("TranscriptFileUri")

        # Step4: Retrieve the text
        audio_text = requests.get(url=text_uri)
        data = audio_text.json()

        # Voice to text -> can display in frontend
        self.text_stats = data['results']['items']
        self.converted_text = data['results']['transcripts'][0]['transcript']