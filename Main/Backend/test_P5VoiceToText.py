import unittest
import os
import json
from io import BytesIO
from mongoengine import connect
from P5VoiceToText import create_app, db


class P5VoiceToTextTestCase(unittest.TestCase):

    def setUp(self):
        """Define test variables and initialize app."""
        self.app = create_app(config_name="testing")
        self.client = self.app.test_client

        #uploading a audio file to test get single file and test duplicate file upload fuctionality in files
        path = 'test.wav'
        contents = None
        with open(path, 'rb') as f:
            contents = f.read()
        res = self.client().post('/api/files',data = {'file': (BytesIO(b'my file contents'), path)})

    def test_imist_ambo_template_creation(self):
        res = self.client().post('/api/imistambo_glossary_inbulk')
        self.assertEqual(res.status, '201 CREATED')


    #_______________________________________Test Cases for files_______________________________________
    
    def test_upload_file(self):
        path = 'test1.wav'
        contents = None
        with open(path, 'rb') as f:
            contents = f.read()
        res = self.client().post('/api/files',
            data = {
                'file': (BytesIO(b'my file contents'), path)
            }
        )
        self.assertEqual(res.status, '200 OK')
    
    def test_upload_duplicate_file(self):
        path = 'test.wav'
        contents = None
        with open(path, 'rb') as f:
            contents = f.read()
        res = self.client().post('/api/files',
            data = {
                'file': (BytesIO(b'my file contents'), path)
            }
        )
        self.assertEqual(res.status, '200 OK')
    
    def test_upload_file_with_not_allowed_extension(self):
        path = 'test.ogg'
        contents = None
        with open(path, 'rb') as f:
            contents = f.read()
        res = self.client().post('/api/files',
            data = {
                'file': (BytesIO(b'my file contents'), path)
            }
        )
        self.assertEqual(res.status, '400 BAD REQUEST')
    
    def test_upload_file_without_file(self):
        res = self.client().post('/api/files')
        self.assertEqual(res.status, '400 BAD REQUEST')

    def test_get_all_files(self):
        res = self.client().get('/api/files')
        self.assertEqual(res.status, '200 OK')
    
    def test_get_single_file(self):
        res = self.client().get('/api/files/test.wav')
        self.assertEqual(res.status, '200 OK')

    def test_get_single_file_without_file_in_database(self):
        res = self.client().get('/api/files/random.wav')
        self.assertEqual(res.status, '400 BAD REQUEST')

    
    #_______________________________________Test Cases for convertedText_______________________________________



    def tearDown(self):
        """teardown all initialized variables."""
        with self.app.app_context():
            # drop all tables
            db.connection.drop_database('test_P5VoiceToText')
# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()