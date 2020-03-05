import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize 
from nltk.stem import PorterStemmer
from string import punctuation
from nltk.stem import WordNetLemmatizer

import json

from P5VoiceToText import db
from P5VoiceToText.models import Imist_ambo_template

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
		
		self.words = ["femal", "mal", "spinal"]
		
		for word in self.words:
			entries = Imist_ambo_template.objects.filter(keyword=word).to_json()
			entries = json.loads(entries)
			for entry in entries:
				self.category_keyword[entry['category']].append(entry['keyword'])



	def clean_and_classify(self):
		self.clean_text()
		self.classify_text_into_categories()
		return self.category_keyword


	def insert_into_imist_ambo_template(self):
		map_keyword_category = [
			{"keyword": "age",
			 "category": "identification"},
			{"keyword": "mal",
			 "category": "identification"},
			{"keyword": "femal",
			 "category": "identification"},
			{"keyword": "mca",
			 "category": "mechanism"},
			{"keyword": "rollov",
			 "category": "mechanism"},
			{"keyword": "eject",
			 "category": "mechanism"},
			{"keyword": "death other occupant",
			 "category": "mechanism"},
			{"keyword": "pedestrian",
			 "category": "mechanism"},
			{"keyword": "motorcyclist",
			 "category": "mechanism"},
			{"keyword": "cyclist",
			 "category": "mechanism"},
			 {"keyword": "motorcycl",
			 "category": "mechanism"},
			{"keyword": "cycl",
			 "category": "mechanism"},
			{"keyword": "fall",
			 "category": "mechanism"},
			{"keyword": "burn",
			 "category": "mechanism"},
			{"keyword": "explos",
			 "category": "mechanism"},
			{"keyword": "trap",
			 "category": "mechanism"},
			{"keyword": "time entrap",
			 "category": "mechanism"},
			{"keyword": "mba",
			 "category": "mechanism"},
			{"keyword": "extric",
			 "category": "mechanism"},
			{"keyword": "fatal",
			 "category": "mechanism"},
			{"keyword": "eject",
			 "category": "mechanism"},
			{"keyword": "penetr",
			 "category": "injury"},
			{"keyword": "blunt",
			 "category": "injury"},
			{"keyword": "head",
			 "category": "injury"},
			{"keyword": "neck",
			 "category": "injury"},
			{"keyword": "chest",
			 "category": "injury"},
			{"keyword": "abdomen",
			 "category": "injury"},
			{"keyword": "pelvi",
			 "category": "injury"},
			{"keyword": "axilla",
			 "category": "injury"},
			{"keyword": "groin",
			 "category": "injury"},
			{"keyword": "limb",
			 "category": "injury"},
			{"keyword": "amput",
			 "category": "injury"},
			{"keyword": "crush",
			 "category": "injury"},
			{"keyword": "spinal",
			 "category": "injury"},
			{"keyword": "tension pneumothorax",
			 "category": "injury"},
			{"keyword": "rigid abdomen",
			 "category": "injury"},
			{"keyword": "fractur",
			 "category": "injury"},
			{"keyword": "pelvi",
			 "category": "injury"},
			{"keyword": "facial burn",
			 "category": "injury"},
			{"keyword": "disloc",
			 "category": "injury"},
			{"keyword": "eviscer",
			 "category": "injury"},
			{"keyword": "blast",
			 "category": "injury"},    
			{"keyword": "pr",
			 "category": "signs"},
			{"keyword": "bp",
			 "category": "signs"},
			{"keyword": "gcs",
			 "category": "signs"},
			{"keyword": "evm",
			 "category": "signs"},
			{"keyword": "pupil size",
			 "category": "signs"},
			{"keyword": "reactiv",
			 "category": "signs"},
			{"keyword": "rr",
			 "category": "signs"},
			{"keyword": "t degree",
			 "category": "signs"},
			{"keyword": "spo 2",
			 "category": "signs"},
			{"keyword": "sob",
			 "category": "signs"},
			{"keyword": "sbp",
			 "category": "signs"},
			{"keyword": "cervic collar",
			 "category": "treatment"},
			{"keyword": "op airway",
			 "category": "treatment"},
			{"keyword": "np airway",
			 "category": "treatment"},
			{"keyword": "lma",
			 "category": "treatment"},
			{"keyword": "ett",
			 "category": "treatment"},
			{"keyword": "rsi",
			 "category": "treatment"},
			{"keyword": "ventil",
			 "category": "treatment"},
			{"keyword": "chest decompress",
			 "category": "treatment"},
			{"keyword": "iv access",
			 "category": "treatment"},
			{"keyword": "iv hartmann",
			 "category": "treatment"},
			{"keyword": "methoxyfluran",
			 "category": "treatment"},
			{"keyword": "maxolon",
			 "category": "treatment"},
			{"keyword": "morphin",
			 "category": "treatment"},
			{"keyword": "midazolam",
			 "category": "treatment"},
			{"keyword": "fentanyl",
			 "category": "treatment"},
			{"keyword": "suxamethonium",
			 "category": "treatment"},
			{"keyword": "pancuronium",
			 "category": "treatment"},
			{"keyword": "adrenalin",
			 "category": "treatment"},
			{"keyword": "intub",
			 "category": "treatment"},
			{"keyword": "haemost dressing",
			 "category": "treatment"},
			{"keyword": "toumiquet",
			 "category": "treatment"},
			{"keyword": "blood transfus",
			 "category": "treatment"},
			{"keyword": "neuromuscular block",
			 "category": "treatment"},
			{"keyword": "allergi",
			 "category": "other"},
			{"keyword": "mass casualti",
			 "category": "other"},
			{"keyword": "inter-hospit transfer",
			 "category": "other"},
			{"keyword": "pregnanc",
			 "category": "other"},
			{"keyword": "pregnant",
			 "category": "other"},
			{"keyword": "co-morbid",
			 "category": "other"},
			{"keyword": "anticoagul therapi",
			 "category": "other"}
			]
		arr = [Imist_ambo_template(**data) for data in array]
		Imist_ambo_template.objects.insert(arr, load_bulk=False)

if __name__=='__main__':
	classifyText = ClassifyText()
	classifyText.remove_stopwords()
	#print(classifyText.words)
	classifyText.stemming_text()
	#print(classifyText.words)
	classifyText.lemmatization_text()
	print(classifyText.words)