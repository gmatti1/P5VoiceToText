from flask import Blueprint
files = Blueprint('files', __name__)

@files.route("/")
@files.route("/home")
def home():
	return "home page"

@files.route("/about")
def about():
	return "About Page"