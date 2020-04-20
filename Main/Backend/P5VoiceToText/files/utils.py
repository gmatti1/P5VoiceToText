# -*- coding: utf-8 -*-

"""A utility for performing storing and retrieving information of the audio file

Provides a class 'AudioFile' that is responsible for storing the audio file and to track all
the required details for that file.

The hard copy of the audio file is stored in Amazon S3 and its metadata in the local mongoDB
document.
"""

from P5VoiceToText.models import Voice_files
from pydub import AudioSegment
from P5VoiceToText.config import Config
from datetime import date
import boto3
import os

__author__ = "Gangadhara Matti"
__copyright__ = "Copyright 2020, P5VoiceToText"
__credits__ = ["Gangadhara Matti"]
__version__ = "1.0"
__maintainer__ = ["Gangadhara Matti"]
__email__ = "gmatti1@asu.edu"
__status__ = "Production"

# AWS required
from botocore.exceptions import NoCredentialsError
from botocore.client import Config as ConfigAWS
aws_access_key_id = Config.ACCESS_KEY_ID
aws_access_secret_key = Config.ACCESS_SECRET_KEY
aws_bucket_name = Config.BUCKET_NAME

upload_folder = Config.UPLOAD_FOLDER


class AudioFile:
    """
    This is a class for storing the audio file.

    Attributes
    ----------
    filename : str
        name of the audio file
    s3link : str
        link to audio file store in Amazon S3
    """
    def __init__(self):
        self.filename = ""
        self.s3link = ""

    def save_audio_file(self):
        """The function saves the audio file in the "voice_files" document of
        MongoDB. It is performed on the object of the class and hence does not accept
        any parameters.

            Parameters
            ----------

            Returns
            -------
        """
        voice_file = Voice_files(filename=self.filename, s3link=self.s3link).save()

    def check_filename_exists(self):
        """The function checks if the audio file in the "voice_files" document of
        MongoDB exists. It is performed on the object of the class and hence does not accept
        any parameters.

        Parameters
        ----------

        Returns
        -------
        bool
            returns true if the text exists, otherwise false
        """
        voice_file = Voice_files.objects(filename__exact =self.filename)
        return len(voice_file) > 0

    def get_s3Link(self):
        """The function gets the S3 link of the given filename in DB.
        It is performed on the object of the class and hence does not accept
        any parameters.

        Parameters
        ----------

        Returns
        -------
        str
            S3 link of the filename
        """
        voice_file = Voice_files.objects(filename__exact=self.filename)
        self.s3link = voice_file[0].s3link

    def get_voice_file_from_db(self):
        """The function gets the voice file object ID for the given filename

        Parameters
        ----------

        Returns
        -------
        AudioFile
            S3 link if populated in the member variable of AudioFile object
        """
        return Voice_files.objects.filter(filename=self.filename)[0]

    def get_all_files_db(self):
        """The function gets all the files in voice_files document of MongoDB

        Parameters
        ----------

        Returns
        -------
        List
            List containing all the voice file objects
        """
        voice_files = Voice_files.objects.filter()
        return voice_files

    def change_media(self, complete_file_path):
        """The function changes the extension of the audio file
        to support AWS Transcribe

        Parameters
        ----------
        str
            complete relative path of the audio file stored

        Returns
        -------
        """
        wav_audio = AudioSegment.from_file(complete_file_path)
        newfilename = os.path.splitext(self.filename)[0]
        wav_audio.export(upload_folder + newfilename + ".wav", format="wav")
        self.filename = newfilename + ".wav"
        os.remove(complete_file_path)

    def store_file_aws(self, complete_file_path):
        """The function stores the audio file in the
        Amazon S3 and returns the link of its location

        Parameters
        ----------
        str
            complete relative path of the audio file stored

        Returns
        -------
        str
            S3 link of where the audio file is stored
        """
        # Store the file in AWS S3
        data = open(complete_file_path, 'rb')
        folder_name = date.today()

        s3 = boto3.resource(
            's3',
            aws_access_key_id=aws_access_key_id,
            aws_secret_access_key=aws_access_secret_key,
            config=ConfigAWS(signature_version='s3v4')
        )
        try:
            s3.Bucket(aws_bucket_name).upload_file(complete_file_path, '%s/%s' % (folder_name, self.filename))
            s3Link = "s3://" + aws_bucket_name + "/" + str(folder_name) + "/" + self.filename
            return s3Link
        except FileNotFoundError:
            print("Error: The file was not found")
            return ""
        except NoCredentialsError:
            print("Error: Credentials not available")
            return ""
