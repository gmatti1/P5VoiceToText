import boto3
import time
import requests
from botocore.client import Config
from pydub import AudioSegment
from botocore.exceptions import NoCredentialsError

# Step1: Convert the input file from AAC to WAV
wav_audio = AudioSegment.from_file("audioFile.aac")
wav_audio.export("audio1.wav", format="wav")

# AWS IAM User credentials
ACCESS_KEY_ID = 'AKIARH6IQHSVXUVLENNE'
ACCESS_SECRET_KEY = 'tGTLObhHlXXfu24Z/hXMM7EaPnsh7KfgYM1Wap3g'
BUCKET_NAME = 'voicetotextsourcefile'
FILE_NAME = 'audio1.wav' #Note: Replace this text with file name
S3_FILE_URL = ''
JOB_NAME = FILE_NAME + "new"

data = open(FILE_NAME, 'rb')

# Step2: Store the file in AWS S3
s3 = boto3.resource(
    's3',
    aws_access_key_id=ACCESS_KEY_ID,
    aws_secret_access_key=ACCESS_SECRET_KEY,
    config=Config(signature_version='s3v4')
)

try:
    s3.Bucket(BUCKET_NAME).put_object(Key=FILE_NAME, Body=data)
except FileNotFoundError:
    print("Error: The file was not found")
except NoCredentialsError:
    print("Error: Credentials not available")

S3_FILE_URL = "s3://" + BUCKET_NAME + "/" + FILE_NAME

# Step3: Convert voice to text
transcribe = boto3.client(
    'transcribe',
    region_name="us-west-2",
    aws_access_key_id=ACCESS_KEY_ID,
    aws_secret_access_key=ACCESS_SECRET_KEY
)

transcribe.start_transcription_job(
    TranscriptionJobName=JOB_NAME,
    Media={'MediaFileUri': S3_FILE_URL},
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
print(data['results']['transcripts'][0]['transcript'])
