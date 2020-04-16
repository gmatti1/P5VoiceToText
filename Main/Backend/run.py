# -*- coding: utf-8 -*-

"""Let's you start the Flask Project app

Calls create_app() function to create Flask's app that once started or run, 
let's you access all the backend APIs

The create_app() can be accessed in P5VoiceToText directory's __init__.py
"""

from P5VoiceToText import create_app


__author__ = "Shefali Anand"
__copyright__ = "Copyright 2020, P5VoiceToText"
__credits__ = ["Shefali Anand"]
__version__ = "1.0"
__maintainer__ = ["Shefali Anand"]
__email__ = "sanand22@asu.edu"
__status__ = "Production"

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)