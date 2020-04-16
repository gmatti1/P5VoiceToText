import unittest
import os
import json
from P5VoiceToText import create_app, db


class P5VoiceToTextTestCase(unittest.TestCase):

    def setUp(self):
        """Define test variables and initialize app."""
        self.app = create_app(config_name="testing")
        self.client = self.app.test_client

    # binds the app to the current context
    with self.app.app_context():
        # create all tables
        db.create_all()

    