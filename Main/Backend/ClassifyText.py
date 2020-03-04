from Config import *

import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize 
from nltk.stem import PorterStemmer
from string import punctuation
from nltk.stem import WordNetLemmatizer

from pymongo import MongoClient

class ClassifyText:

	def __init__(self):
		self.text = "He was running and eating at same time. He has bad habit of swimming after playing long hours in the Sun."
		self.words = []
		self.category_keyword = { "identification" : [],
								  "mechanism" : [],
								  "injury": [],
								  "signs": [],
								  "treatment": [],
								  "allergy": [],
								  "medication": [],
								  "background": [],
								  "other": [] }


	# Removing Stop Words ....
	def remove_stopwords(self):
		#self.text = "This is a sample sentence, showing off the stop words filtration."
		self.text = self.text.lower()
  
		stop_words = set(stopwords.words('english') + list(punctuation)) 		
		word_tokens = word_tokenize(self.text) 
		filtered_sentence = [w for w in word_tokens if not w in stop_words] 
		filtered_sentence = [] 
		for w in word_tokens: 
			if w not in stop_words: 
				filtered_sentence.append(w) 

		self.words = filtered_sentence 



	# Get the root of words using Stemming ....
	def stemming_text(self):
		ps = PorterStemmer() 
		self.words = [ps.stem(word) for word in self.words]
		

	# Get the root of words using Lemmatization ....
	def lemmatization_text(self):
		wordnet_lemmatizer = WordNetLemmatizer()
		self.words = [wordnet_lemmatizer.lemmatize(word) for word in self.words]


	
	# Cleaning of Text	
	def clean_text(self):
		self.remove_stopwords()
		self.stemming_text()
		self.lemmatization_text()


	# Classify the specific words into IMIST_AMBO categories ....
	def classify_text_into_categories(self):
		
		self.words = ["female", "crush", "spinal"]
		client = MongoClient(DB_DEV_IP)
		mydb = client[DB_SCHEMA]
		mytable = mydb[IMIST_AMBO_TEMPLATE]

		for word in self.words:
			entries = mytable.find(({'keyword' : word}))
			for entry in entries:
				self.category_keyword[entry['category']].append(entry['keyword'])



	def clean_and_classify(self):
		self.clean_text()
		self.classify_text_into_categories()
		return self.category_keyword


if __name__=='__main__':
	classifyText = ClassifyText()
	classifyText.remove_stopwords()
	#print(classifyText.words)
	classifyText.stemming_text()
	#print(classifyText.words)
	classifyText.lemmatization_text()
	print(classifyText.words)