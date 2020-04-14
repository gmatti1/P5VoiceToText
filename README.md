# Team P5- VoiceToText
## SER517 Capstone Project - Team5 - Voice-to-text application of Pediatric IMIST-AMBO criteria 

Project is divided as Frontend(React) and Backend(Python, Flask)

### Prerequisties:
1. <a href="https://realpython.com/installing-python/"> Python 3.x </a> 
2. <a href="https://pip.pypa.io/en/stable/installing/"> pip3 </a>
3. <a href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm"> Node and NPM </a>
4. <a href="https://docs.mongodb.com/manual/administration/install-community/"> MongoDB </a>

### Frontend: 

#### Follow below steps to run the project:

1. Go inside Main/Frontend/voicetotext directory
2. run "npm install" through command prompt
3. run "npm start"
4. Launch "localhost:3000" in the brower to view the application

#### Project Struture: <br>
containers - Has all the components with state <br>
components - Has all the presentational/functional components <br>
naviagtion - Since this web app has a single page all the general nav related components go in here <br>
styles - All style sheets go here


Application is live on - http://ser517phcvoicetotext.s3-website-us-west-2.amazonaws.com/


### Backend:

#### Follow below steps to run the project:

1. Install libraries using pip3 in command prompt.
   	pip3 install flask <br>
		pip3 install python-dotenv <br>
		pip3 install flask-cors <br>
		pip3 install flask-mongoengine <br>
		pip3 install pydub <br>
		pip3 install datetime <br>
		pip3 install boto3 <br>
		pip3 install Werkzeug <br>
		pip3 install requests <br>
		pip3 install botocore <br>
		pip3 install nltk <br>
		python3 <br>
		>>> import nltk <br>
		>>> nltk.download('stopwords') <br>
		>>> nltk.download('punkt') <br>
		>>> nltk.download('wordnet') <br>
2. Run Flask by writing "python Main/Backend/run.py" in command prompt.
3. Launch "localhost:5000" in the browser to access APIs.

#### Project Structure: <br>
##### In Backend directory: <br>
run.py - used for running the backend server of the application. <br>
##### In Backend/P5VoiceToText directory: <br>
resources - contains all the file resouces <br>
config.py - contains all the configuration properties related to Database connection and Folder/File Path <br>
models.py - contains models that helps to connect, create and edit the schema in database <br>
main - package that contains basic pages of the application - Home, About Us <br>
errors - package that contains APIs for Error Handling <br>
files - package that contains APIs for uploading or selecting audio files <br>
convertedText - package that contains APIs for voice to text conversion functionality <br>
categorizedText - package that contains APIs for categorizing the text into IMIST-AMBO categories <br>


### Database:

#### Follow below steps to get database:

1. In command prompt, go inside Main/Database directory
2. write "mongorestore P5VoiceToText.db"

<br>

## Application is live on: http://54.189.169.94/
