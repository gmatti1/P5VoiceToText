# Team P5- VoiceToText
## SER517 Capstone Project - Team5 - Voice-to-text application of Pediatric IMIST-AMBO criteria 

Project is divided as Frontend(React) and Backend(Python, Flask)

### Frontend: 

Follow below steps to run the project:

1. Clone the project
2. Inside the root directory of the project run "npm install" through command prompt
3. run "npm start"
4. Launch "localhost:3000" in the brower to view the application

Project Struture: <br>
containers - Has all the components with state <br>
components - Has all the presentational/functional components <br>
naviagtion - Since this web app has a single page all the general nav related components go in here <br>
styles - All style sheets go here


Application is live on - http://ser517phcvoicetotext.s3-website-us-west-2.amazonaws.com/


### Backend:
1. Install flask and flask_cors libraries using pip, "pip install flask", "pip install flask_cors" in command prompt
2. Run Flask by writing "python Backend/P5VoiceToText.py" in command prompt.
3. Launch "localhost:5000" in the browser to access APIs.

Project Structure: <br>
Config.py - contains all the configurations and properties. <br>
P5VoiceToText.py - contains all the Flask APIs <br>
resources - contains all the file resouces 


