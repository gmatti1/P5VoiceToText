import unittest
import os
import json
from P5VoiceToText import create_app, db


class P5VoiceToTextTestCase(unittest.TestCase):

    def setUp(self):
        """Define test variables and initialize app."""
        self.app = create_app(config_name="testing")
        self.client = self.app.test_client


    def test_imist_ambo_template_creation(self):
    	res = self.client().post('/api/imistambo_glossary_inbulk')
    	self.assertEqual(res.status, '201 CREATED')



# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()