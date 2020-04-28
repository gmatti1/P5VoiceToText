# -*- coding: utf-8 -*-

"""Let's you test the all the backend Api's

Calls create_app() function to create Flask's app that once started or run, 
let's you access all the backend APIs. The app is launched here in testing
environment. 

The create_app() can be accessed in P5VoiceToText directory's __init__.py
"""

import unittest
import json
from io import BytesIO
from mongoengine import connect
from P5VoiceToText import create_app, db
import boto3
from P5VoiceToText.config import Config

from botocore.client import Config as ConfigAWS
aws_access_key_id = Config.ACCESS_KEY_ID
aws_access_secret_key = Config.ACCESS_SECRET_KEY
aws_bucket_name = Config.BUCKET_NAME


__author__ = "Surya Cherukuri"
__copyright__ = "Copyright 2020, P5VoiceToText"
__credits__ = ["Surya Cherukuri"]
__version__ = "1.0"
__maintainer__ = ["Surya Cherukuri"]
__email__ = "scheruk5@asu.edu"
__status__ = "Production"

class P5VoiceToTextTestCase(unittest.TestCase):

    """ 
    setUp() method to initialize our app and it's test client and 
    create our test database within the app's context. 
    """

    def setUp(self):
        """Define test variables and initialize app."""
        self.app = create_app(config_name="testing")
        self.client = self.app.test_client 

    #_______________________________________Test Cases for files_______________________________________

    """
    This is a case to test file upload api.

    Method : post
    Route : /api/files
    Returns : 200 OK
    """ 
    def test_upload_file(self):
        path = 'test.wav'
        contents = None
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        res = self.client().post('/api/files',data = {'file': (byteIO1, path)})
        self.assertEqual(res.status, '200 OK')
    
    """
    This is a case to test file upload api with duplicate file.

    Method : post
    Route : /api/files
    Returns : 200 OK
    """
    def test_upload_duplicate_file(self):
        #uploading a audio file to test duplicate file.
        path = 'test.wav'
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        res = self.client().post('/api/files',data = {'file': (byteIO1, path)})
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        res1 = self.client().post('/api/files',data = {'file': (byteIO1, path)})
        self.assertEqual(res1.status, '200 OK')
    
    """
    This is a case to test file upload api with duplicate file.

    Method : post
    Route : /api/files
    Returns : 400 BAD REQUEST
    """
    def test_upload_file_with_not_allowed_extension(self):
        path = 'test.ogg'
        contents = None
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        res = self.client().post('/api/files',data = {'file': (byteIO1, path)})
        self.assertEqual(res.status, '400 BAD REQUEST')
    
    """
    This is a case to test file upload api without body.

    Method : post
    Route : /api/files
    Returns : 400 BAD REQUEST
    """
    def test_upload_file_without_file(self):
        res = self.client().post('/api/files')
        self.assertEqual(res.status, '400 BAD REQUEST')

    """
    This is a case to test get all the files api.

    Method : get
    Route : /api/files
    Returns : 200 OK
    """
    def test_get_all_files(self):
        res = self.client().get('/api/files')
        self.assertEqual(res.status, '200 OK')
    
    """
    This is a case to test get single file api.

    Method : get
    Route : /api/files/<filename>
    Parameters : filename(str)
    Returns : 200 OK
    """
    def test_get_single_file(self):
        path = 'test.wav'
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        res = self.client().post('/api/files',data = {'file': (byteIO1, path)})

        res1 = self.client().get('/api/files/test.wav')
        self.assertEqual(res1.status, '200 OK')

    """
    This is a case to test get single file api which is not in database.

    Method : get
    Route : /api/files/<filename>
    Parameters : filename(str)
    Returns : 404 NOT FOUND
    """
    def test_get_single_file_without_file_in_database(self):
        res = self.client().get('/api/files/test.wav')
        self.assertEqual(res.status, '404 NOT FOUND')

    
    #_______________________________________Test Cases for convertedText_______________________________________

    """
    This is a case to test voice to text conversion api.

    Method : post
    Route : /api/convertedText/<filename>
    Parameters : filename(str)
    Returns : 200 OK
    """
    def test_voice_to_text_conversion(self):
        path = 'test.wav'
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        res = self.client().post('/api/files',data = {'file': (byteIO1, path)})

        res1 = self.client().post('/api/convertedText/test.wav')
        self.assertEqual(res1.status, '200 OK')
    
    """
    This is a case to test voice to text conversion api with duplicate filename.

    Method : post
    Route : /api/convertedText/<filename>
    Parameters : filename(str)
    Returns : 200 OK
    """
    def test_voice_to_text_conversion_with_duplicate_file(self):
        path = 'test.wav'
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        #uploading a audio file to test duplicate file.
        res = self.client().post('/api/files',data = {'file': (byteIO1, path)})

        res1 = self.client().post('/api/convertedText/test.wav')
        
        res2 = self.client().post('/api/convertedText/test.wav')
        self.assertEqual(res2.status, '200 OK')

    """
    This is a case to test voice to text conversion api without file in database.

    Method : post
    Route : /api/convertedText/<filename>
    Parameters : filename(str)
    Returns : 404 NOT FOUND
    """
    def test_voice_to_text_conversion_without_file_in_database(self):
        res = self.client().post('/api/convertedText/test.wav')
        self.assertEqual(res.status, '404 NOT FOUND')
    
    """
    This is a case to test get converted text api.

    Method : get
    Route : /api/convertedText/<filename>
    Parameters : filename(str)
    Returns : 200 OK
    """
    def test_get_converted_text(self):
        path = 'test.wav'
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        res = self.client().post('/api/files',data = {'file': (byteIO1, path)})

        res1 = self.client().post('/api/convertedText/test.wav')
        
        res2 = self.client().get('/api/convertedText/test.wav')
        self.assertEqual(res2.status, '200 OK')

    """
    This is a case to test get converted text api without converting the text.

    Method : get
    Route : /api/convertedText/<filename>
    Parameters : filename(str)
    Returns : 404 NOT FOUND
    """
    def test_get_converted_text_without_converted_text_in_database(self):
        path = 'test.wav'
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        res = self.client().post('/api/files',data = {'file': (byteIO1, path)})

        res1 = self.client().get('/api/convertedText/test.wav')
        self.assertEqual(res1.status, '404 NOT FOUND')

    """
    This is a case to test get converted text api without file in the database.

    Method : get
    Route : /api/convertedText/<filename>
    Parameters : filename(str)
    Returns : 404 NOT FOUND
    """
    def test_get_converted_text_without_file_in_database(self):
        res = self.client().get('/api/convertedText/test.wav')
        self.assertEqual(res.status, '404 NOT FOUND')

    """
    This is a case to test update converted text api.

    Method : put
    Route : /api/convertedText/<filename>
    Parameters : filename(str)
    Returns : 200 OK
    """
    def test_update_converted_text(self):
        path = 'test.wav'
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        res = self.client().post('/api/files',data = {'file': (byteIO1, path)})

        res1 = self.client().post('/api/convertedText/test.wav')
        
        res2 = self.client().put('/api/convertedText/test.wav', json={'text':'Updated Text'})
        self.assertEqual(res2.status, '200 OK')
        
    """
    This is a case to test update converted text api without body.

    Method : put
    Route : /api/convertedText/<filename>
    Parameters : filename(str)
    Returns : 400 BAD REQUEST
    """
    def test_update_converted_text_without_body(self):
        path = 'test.wav'
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        res = self.client().post('/api/files',data = {'file': (byteIO1, path)})

        res1 = self.client().post('/api/convertedText/test.wav')

        res2 = self.client().put('/api/convertedText/test.wav', json = {})
        self.assertEqual(res2.status, '400 BAD REQUEST')
        
    """
    This is a case to test update converted text api without file in database.

    Method : put
    Route : /api/convertedText/<filename>
    Parameters : filename(str)
    Returns : 404 NOT FOUND
    """
    def test_update_converted_text_without_file_in_database(self):
        res = self.client().put('/api/convertedText/test.wav', json={'text':'Updated Text'})
        self.assertEqual(res.status, '404 NOT FOUND')
        
    """
    This is a case to test update converted text api without converting the text.

    Method : put
    Route : /api/convertedText/<filename>
    Parameters : filename(str)
    Returns : 404 NOT FOUND
    """
    def test_update_converted_text_without_converted_text_in_database(self):
        path = 'test.wav'
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        res = self.client().post('/api/files',data = {'file': (byteIO1, path)})

        res1 = self.client().put('/api/convertedText/test.wav', json={'text':'Updated Text'})
        self.assertEqual(res1.status, '404 NOT FOUND')
        

#_______________________________________Test Cases for categorizedText_______________________________________

    """
    This is a case to test text categorization api.

    Method : post
    Route : /api/categorizedText/<filename>
    Parameters : filename(str)
    Returns : 201 CREATED
    """
    def test_text_categorization(self):
        path = 'test.wav'
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        res = self.client().post('/api/files',data = {'file': (byteIO1, path)})

        res1 = self.client().post('/api/convertedText/test.wav')
        
        res2 = self.client().post('/api/categorizedText/test.wav')
        self.assertEqual(res2.status, '201 CREATED')
    """
    This is a case to test text categorization api as categorization already exists.

    Method : post
    Route : /api/categorizedText/<filename>
    Parameters : filename(str)
    Returns : 200 OK
    """
    def test_text_categorization_if_categorized_text_exists(self):
        path = 'test.wav'
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        res = self.client().post('/api/files',data = {'file': (byteIO1, path)})

        res1 = self.client().post('/api/convertedText/test.wav')
        
        res2 = self.client().post('/api/categorizedText/test.wav')
        
        res3 = self.client().post('/api/categorizedText/test.wav')
        self.assertEqual(res3.status, '200 OK')

    """
    This is a case to test text categorization api without conversion.

    Method : post
    Route : /api/categorizedText/<filename>
    Parameters : filename(str)
    Returns : 404 NOT FOUND
    """
    def test_text_categorization_without_converted_text(self):
        path = 'test.wav'
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        res = self.client().post('/api/files',data = {'file': (byteIO1, path)})
        
        res1 = self.client().post('/api/categorizedText/test.wav')
        self.assertEqual(res1.status, '404 NOT FOUND')

    """
    This is a case to test text categorization api without file.

    Method : post
    Route : /api/categorizedText/<filename>
    Parameters : filename(str)
    Returns : 404 NOT FOUND
    """
    def test_text_categorization_without_file_in_database(self):      
        res = self.client().post('/api/categorizedText/test.wav')
        self.assertEqual(res.status, '404 NOT FOUND')

    """
    This is a case to test get categorization api.

    Method : get
    Route : /api/categorizedText/<filename>
    Parameters : filename(str)
    Returns : 200 OK
    """
    def test_get_categorized_text(self):
        path = 'test.wav'
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        res = self.client().post('/api/files',data = {'file': (byteIO1, path)})

        res1 = self.client().post('/api/convertedText/test.wav')
        
        res2 = self.client().post('/api/categorizedText/test.wav')
        
        res3 = self.client().get('/api/categorizedText/test.wav')
        self.assertEqual(res3.status, '200 OK')

    """
    This is a case to test get categorization api without file.

    Method : get
    Route : /api/categorizedText/<filename>
    Parameters : filename(str)
    Returns : 404 NOT FOUND
    """ 
    def test_get_categorized_text_without_file_in_database(self):
        res = self.client().get('/api/categorizedText/test.wav')
        self.assertEqual(res.status, '404 NOT FOUND')

    """
    This is a case to test get categorization api wihout categorizing.

    Method : get
    Route : /api/categorizedText/<filename>
    Parameters : filename(str)
    Returns : 404 NOT FOUND
    """
    def test_get_categorized_text_without_categorized_text_in_database(self):
        path = 'test.wav'
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        res = self.client().post('/api/files',data = {'file': (byteIO1, path)})

        res1 = self.client().post('/api/convertedText/test.wav')
    
        res2 = self.client().get('/api/categorizedText/test.wav')
        self.assertEqual(res2.status, '404 NOT FOUND')

    """
    This is a case to test update categorization api.

    Method : put
    Route : /api/categorizedText/<filename>
    Parameters : filename(str)
    Returns : 200 OK
    """
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

    """
    This is a case to test update categorization api without file.

    Method : put
    Route : /api/categorizedText/<filename>
    Parameters : filename(str)
    Returns : 404 NOT FOUND
    """  
    def test_update_categorized_text_without_file_in_database(self):
        res = self.client().put('api/categorizedText/test.wav')
        self.assertEqual(res.status, '404 NOT FOUND')

    """
    This is a case to test update categorization api without conversion.

    Method : put
    Route : /api/categorizedText/<filename>
    Parameters : filename(str)
    Returns : 404 NOT FOUND
    """
    def test_update_categorized_text_without_convertedText_in_database(self):
        path = 'test.wav'
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        res = self.client().post('/api/files',data = {'file': (byteIO1, path)})
        
        res1 = self.client().put('api/categorizedText/test.wav')
        self.assertEqual(res1.status, '404 NOT FOUND')

    """
    This is a case to test update categorization api without categorization.

    Method : put
    Route : /api/categorizedText/<filename>
    Parameters : filename(str)
    Returns : 404 NOT FOUND
    """
    def test_update_categorized_text_without_categorizedText_in_database(self):
        path = 'test.wav'
        with open(path, 'rb') as f:
            byteIO1 = BytesIO(f.read())
        res = self.client().post('/api/files',data = {'file': (byteIO1, path)})

        res1 = self.client().post('/api/convertedText/test.wav')
        
        res3 = self.client().put('/api/convertedText/test.wav', json={'text':'Updated Text'})
        
        res4 = self.client().put('api/categorizedText/test.wav')
        self.assertEqual(res4.status, '404 NOT FOUND')

    """
    This is a case to test add imistambo glossary inbulk api.

    Method : post
    Route : /api/imistambo_glossary_inbulk
    Returns : 201 CREATED
    """ 
    def test_add_imistambo_glossary_inbulk(self):
        res = self.client().post('/api/imistambo_glossary_inbulk')
        self.assertEqual(res.status, '201 CREATED')
    
    """
    This is a case to test add imistambo glossary api.

    Method : post
    Route : /api/imistambo_glossary
    Returns : 201 CREATED
    """ 
    def test_add_imistambo_glossary(self):
        res = self.client().post('/api/imistambo_glossary', json = {'keyword':'test', 'category':'identification'})
        self.assertEqual(res.status, '201 CREATED')
    
    """
    This is a case to test add imistambo glossary api with dupliacte pair.

    Method : post
    Route : /api/imistambo_glossary
    Returns : 200 OK
    """ 
    def test_add_duplicate_imistambo_glossary(self):
        res = self.client().post('/api/imistambo_glossary', json = {'keyword':'test', 'category':'identification'})
        
        res1 = self.client().post('/api/imistambo_glossary', json = {'keyword':'test', 'category':'identification'})
        self.assertEqual(res1.status, '200 OK')

    """
    This is a case to test search imistambo glossary api.

    Method : get
    Route : /api/imistambo_glossary<keyword>
    Parameters : keyword(str)
    Returns : 200 OK
    """ 
    def test_get_imistambo_glossary(self):
        res = self.client().post('/api/imistambo_glossary', json = {'keyword':'test', 'category':'identification'})
        
        res1 = self.client().get('/api/imistambo_glossary/test')
        self.assertEqual(res1.status, '200 OK')

    """
    tearDown() method to tear down test variables and 
    delete our test database and s3 bucket after testing is done.
    """
    def tearDown(self):
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
    unittest.main(warnings='ignore')