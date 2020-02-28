import boto3
from botocore.exceptions import NoCredentialsError

ACCESS_KEY = 'your_aws_access_key_id'
SECRET_KEY = 'your_aws_secret_key_id'


def upload_to_aws(local_file, bucket, s3_file):
    s3 = boto3.client('s3', aws_access_key_id=ACCESS_KEY,
                      aws_secret_access_key=SECRET_KEY)

    try:
        s3.upload_file(local_file, bucket, s3_file)
        print("Upload Successful")
        return True
    except FileNotFoundError:
        print("The file was not found")
        return False
    except NoCredentialsError:
        print("Credentials not available")
        return False

#Need to use this URL to COnvert voice to text
url_s3_audio_file = 'https://voicetotextsourcefile.s3-us-west-2.amazonaws.com/' + 'recoding.wav'

uploaded = upload_to_aws('recording.wav', 'VoiceToTextAudioFiles', 'recording.wav')