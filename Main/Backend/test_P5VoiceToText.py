import unittest
import os
import json
from io import BytesIO
from mongoengine import connect
from P5VoiceToText import create_app, db
import boto3
from P5VoiceToText.config import Config
import warnings

from botocore.client import Config as ConfigAWS
aws_access_key_id = Config.ACCESS_KEY_ID
aws_access_secret_key = Config.ACCESS_SECRET_KEY
aws_bucket_name = Config.BUCKET_NAME

class P5VoiceToTextTestCase(unittest.TestCase):
    
    def setUp(self):
        """Define test variables and initialize app."""
        self.app = create_app(config_name="testing")
        self.client = self.app.test_client 

    #_______________________________________Test Cases for files_______________________________________
    
    def test_upload_file(self):
        path = 'test.wav'
        contents = None
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        res = self.client().post('/api/files',data = {'file': (byteIO1, path)})
        self.assertEqual(res.status, '200 OK')
    
    def test_upload_duplicate_file(self):
        #uploading a audio file to test get single file and test duplicate file upload fuctionality in files
        path = 'test.wav'
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        res = self.client().post('/api/files',data = {'file': (byteIO1, path)})
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        res1 = self.client().post('/api/files',data = {'file': (byteIO1, path)})
        self.assertEqual(res1.status, '200 OK')
    
    def test_upload_file_with_not_allowed_extension(self):
        path = 'test.ogg'
        contents = None
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        res = self.client().post('/api/files',data = {'file': (byteIO1, path)})
        self.assertEqual(res.status, '400 BAD REQUEST')
    
    def test_upload_file_without_file(self):
        res = self.client().post('/api/files')
        self.assertEqual(res.status, '400 BAD REQUEST')

    def test_get_all_files(self):
        res = self.client().get('/api/files')
        self.assertEqual(res.status, '200 OK')
    
    def test_get_single_file(self):
        path = 'test.wav'
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        res = self.client().post('/api/files',data = {'file': (byteIO1, path)})

        res1 = self.client().get('/api/files/test.wav')
        self.assertEqual(res1.status, '200 OK')

    def test_get_single_file_without_file_in_database(self):
        res = self.client().get('/api/files/test.wav')
        self.assertEqual(res.status, '404 NOT FOUND')

    
    #_______________________________________Test Cases for convertedText_______________________________________

    def test_voice_to_text_conversion(self):
        path = 'test.wav'
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        res = self.client().post('/api/files',data = {'file': (byteIO1, path)})

        res1 = self.client().post('/api/convertedText/test.wav')
        self.assertEqual(res1.status, '200 OK')
    
    def test_voice_to_text_conversion_with_duplicate_file(self):
        path = 'test.wav'
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        res = self.client().post('/api/files',data = {'file': (byteIO1, path)})

        res1 = self.client().post('/api/convertedText/test.wav')
        
        res2 = self.client().post('/api/convertedText/test.wav')
        self.assertEqual(res2.status, '200 OK')

    def test_voice_to_text_conversion_without_file_in_database(self):
        res = self.client().post('/api/convertedText/test.wav')
        self.assertEqual(res.status, '404 NOT FOUND')
    
    def test_get_converted_text(self):
        path = 'test.wav'
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        res = self.client().post('/api/files',data = {'file': (byteIO1, path)})

        res1 = self.client().post('/api/convertedText/test.wav')
        
        res2 = self.client().get('/api/convertedText/test.wav')
        self.assertEqual(res2.status, '200 OK')

    def test_get_converted_text_without_converted_text_in_database(self):
        path = 'test.wav'
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        res = self.client().post('/api/files',data = {'file': (byteIO1, path)})

        res1 = self.client().get('/api/convertedText/test.wav')
        self.assertEqual(res1.status, '404 NOT FOUND')

    def test_get_converted_text_without_file_in_database(self):
        res = self.client().get('/api/convertedText/test.wav')
        self.assertEqual(res.status, '404 NOT FOUND')

    def test_update_converted_text(self):
        path = 'test.wav'
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        res = self.client().post('/api/files',data = {'file': (byteIO1, path)})

        res1 = self.client().post('/api/convertedText/test.wav')
        
        res2 = self.client().put('/api/convertedText/test.wav', json={'text':'Updated Text'})
        self.assertEqual(res2.status, '200 OK')
        
    
    def test_update_converted_text_without_body(self):
        path = 'test.wav'
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        res = self.client().post('/api/files',data = {'file': (byteIO1, path)})

        res1 = self.client().post('/api/convertedText/test.wav')

        res2 = self.client().put('/api/convertedText/test.wav', json = {})
        self.assertEqual(res2.status, '400 BAD REQUEST')
        

    def test_update_converted_text_without_file_in_database(self):
        res = self.client().put('/api/convertedText/test.wav', json={'text':'Updated Text'})
        self.assertEqual(res.status, '404 NOT FOUND')
        
    
    def test_update_converted_text_without_converted_text_in_database(self):
        path = 'test.wav'
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        res = self.client().post('/api/files',data = {'file': (byteIO1, path)})

        res1 = self.client().put('/api/convertedText/test2.wav', json={'text':'Updated Text'})
        self.assertEqual(res1.status, '404 NOT FOUND')
        

#_______________________________________Test Cases for categorizedText_______________________________________


    def test_text_categorization(self):
        path = 'test.wav'
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        res = self.client().post('/api/files',data = {'file': (byteIO1, path)})

        res1 = self.client().post('/api/convertedText/test.wav')
        
        res2 = self.client().post('/api/categorizedText/test.wav')
        self.assertEqual(res2.status, '201 CREATED')

    def test_text_categorization_if_categorized_text_exists(self):
        path = 'test.wav'
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        res = self.client().post('/api/files',data = {'file': (byteIO1, path)})

        res1 = self.client().post('/api/convertedText/test.wav')
        
        res2 = self.client().post('/api/categorizedText/test.wav')
        
        res3 = self.client().post('/api/categorizedText/test.wav')
        self.assertEqual(res3.status, '200 OK')

    def test_text_categorization_without_converted_text(self):
        path = 'test.wav'
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        res = self.client().post('/api/files',data = {'file': (byteIO1, path)})
        
        res1 = self.client().post('/api/categorizedText/test.wav')
        self.assertEqual(res1.status, '404 NOT FOUND')

    def test_text_categorization_without_file_in_database(self):      
        res = self.client().post('/api/categorizedText/test.wav')
        self.assertEqual(res.status, '404 NOT FOUND')

    def test_get_categorized_text(self):
        path = 'test.wav'
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        res = self.client().post('/api/files',data = {'file': (byteIO1, path)})

        res1 = self.client().post('/api/convertedText/test.wav')
        
        res2 = self.client().post('/api/categorizedText/test.wav')
        
        res3 = self.client().get('/api/categorizedText/test.wav')
        self.assertEqual(res3.status, '200 OK')
    
    def test_get_categorized_text_without_file_in_database(self):
        res = self.client().get('/api/categorizedText/test.wav')
        self.assertEqual(res.status, '404 NOT FOUND')

    def test_get_categorized_text_without_categorized_text_in_database(self):
        path = 'test.wav'
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        res = self.client().post('/api/files',data = {'file': (byteIO1, path)})

        res1 = self.client().post('/api/convertedText/test.wav')
    
        res2 = self.client().get('/api/categorizedText/test.wav')
        self.assertEqual(res2.status, '404 NOT FOUND')

    def test_update_categorized_text(self):
        path = 'test.wav'
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        res = self.client().post('/api/files',data = {'file': (byteIO1, path)})

        res1 = self.client().post('/api/convertedText/test.wav')

        res2 = self.client().post('api/categorizedText/test.wav')
        
        res3 = self.client().put('/api/convertedText/test.wav', json={'text':'Updated Text'})
        
        res4 = self.client().put('api/categorizedText/test.wav')
        self.assertEqual(res4.status, '200 OK')
    
    def test_update_categorized_text_without_file_in_database(self):
        res = self.client().put('api/categorizedText/test.wav')
        self.assertEqual(res.status, '404 NOT FOUND')

    def test_update_categorized_text_without_convertedText_in_database(self):
        path = 'test.wav'
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        res = self.client().post('/api/files',data = {'file': (byteIO1, path)})
        
        res1 = self.client().put('api/categorizedText/test.wav')
        self.assertEqual(res1.status, '404 NOT FOUND')

    def test_update_categorized_text_without_categorizedText_in_database(self):
        path = 'test.wav'
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        res = self.client().post('/api/files',data = {'file': (byteIO1, path)})

        res1 = self.client().post('/api/convertedText/test.wav')
        
        res3 = self.client().put('/api/convertedText/test.wav', json={'text':'Updated Text'})
        
        res4 = self.client().put('api/categorizedText/test.wav')
        self.assertEqual(res4.status, '404 NOT FOUND')
        

    def tearDown(self):
        """teardown all initialized variables."""
        with self.app.app_context():
            # drop all tables
            db.connection.drop_database('test_P5VoiceToText')
            #clear the s3 bucket
            s3 = boto3.resource(
                's3',
                aws_access_key_id=aws_access_key_id,
                aws_secret_access_key=aws_access_secret_key,
                config=ConfigAWS(signature_version='s3v4')
            )
            s3.Bucket('testvoicetotextbucket').objects.delete()


# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()