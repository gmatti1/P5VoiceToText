# -*- coding: utf-8 -*-

"""A utility for performing Classification of Text into IMIST-AMBO categories
   
Provides a class 'ClassifyText' that is responsible for classifying the text,
obtained from Voice-to-text conversion of audio recodings (uploaded by users)
The sentences from the text are classified into IMIST-AMBO categories, on the
basis of the Imist_ambo_template, which is a database collection. This
collection stores keyword-category pairs. If a word in a sentence, matches 
with a keyword in Imist_ambo_template, then that sentence will belong to 
the corresponding category of the keyword-category pair. 

To fetch the words from sentences, Natural Language Processing (NLP) is done
for cleaning and filtering.
"""

import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize 
from nltk.stem import PorterStemmer
from string import punctuation
from nltk.stem import WordNetLemmatizer
import re

from P5VoiceToText import db
from P5VoiceToText.models import Imist_ambo_template, Voice_files
from P5VoiceToText.models import Voice_text_conversion, Text_categorization

__author__ = "Shefali Anand"
__copyright__ = "Copyright 2020, P5VoiceToText"
__credits__ = ["Shefali Anand", "Surya Cherukuri"]
__version__ = "1.0"
__maintainer__ = ["Shefali Anand"]
__email__ = "sanand22@asu.edu"
__status__ = "Production"

ps = PorterStemmer() 
wordnet_lemmatizer = WordNetLemmatizer()


class ClassifyText:

	"""
	This is a class for classifying sentences into IMIST-AMBO categories.

	Attributes
	----------
	voice_file : Voice_files
		DB collection object
	text : str
		will store text(called convertedText) from voice-to-text conversion 
		of the voice file
	sentences : list of str
		will store list of cleaned and filtered words 
	category_keyword : dictionary
		dictionary with key as category and value as a list of sentences
	"""

	def __init__(self):
		self.voice_file = None
		self.text = ""
		self.sentences = []
		self.category_keyword = { "identification" : [],
								  "mechanism" : [],
								  "injury": [],
								  "signs": [],
								  "treatment": [],
								  "allergy": [],
								  "medication": [],
								  "background": [],
								  "other": [] }


	def if_voice_file_exists(self, filename):
		"""The function to check if the given voice file exists in DB

		Parameters
		----------
		filename : str
			name of the voice file

		Returns
		-------
		bool 
			returns true if the file exists, otherwise false
		"""
		self.voice_file = Voice_files.objects.filter(filename=filename)
		return len(self.voice_file) > 0


	def if_converted_text_exists(self, filename):
		"""The function to check if the text(called convertedText) from 
		voice-to-text conversion of the voice file, exists in 
		Voice_text_conversion db collection.

		Parameters
		-----------
		filename : str 
			name of the voice file

		Returns
		-------
		bool 
			returns true if the text exists, otherwise false
		"""
		self.voice_file = Voice_files.objects.filter(filename=filename)[0]
		voice_text_conversion = Voice_text_conversion.objects\
								.filter(voiceFile=self.voice_file)
		if len(voice_text_conversion)>0:
			self.text = voice_text_conversion[0].converted_text
		return len(voice_text_conversion) > 0


	def if_categorized_text_exists(self, filename):
		"""The function to check if the text(called categorizedText) from 
		categorization of convertedText of the voice file, exists in 
		Text_categorization db collection.

		Parameters
		----------
		filename : str
			name of the voice file

		Returns
		-------
		bool 
			returns true if the text exists, otherwise false
		"""
		self.voice_file = Voice_files.objects.filter(filename=filename)[0]
		text_categorization = Text_categorization.objects\
											.filter(voiceFile=self.voice_file)
		return len(text_categorization) > 0 


	def split_into_sentences(self):
		"""Splits the convertedText into separate sentences

		It splits the convertedText into sentences by "." (period). However, 
		the text might also include decimals and abbreviations which includes 
		"." (periods). Hence, the text is split into sentences, taking decimals
		and abbreviations into consideration.

		Returns
		-------
		list of string
			returns a list of all sentences belonging to convertedText
		"""
		text = self.text

		#Split not by decimals e.g 3.14
		digits = "([0-9])"
		text = re.sub(digits + "[.]" + digits,"\\1<prd>\\2", text)
		
		#Split not by abbreviations
		alphabets= "([A-Za-z])"
		#e.g: G.C.S.
		text = re.sub(" " + alphabets + "[.]" + alphabets + "[.]" + alphabets \
	 		+ "[.] "," \\1<abbr>\\2<abbr>\\3<abbr> ",text)
	  	#e.g: G.C.S
		text = re.sub(" " + alphabets + "[.]" + alphabets + "[.]" + alphabets \
	 		+ " "," \\1<abbr>\\2<abbr>\\3<abbr> ",text)
	  	#e.g: G. C. S
		text = re.sub(" " + alphabets + "[.] " + alphabets + "[.] " + alphabets \
	 		+ " " ," \\1<abbr>\\2<abbr>\\3<abbr> ",text)
	  	#e.g: G. C. S.
		text = re.sub(" " + alphabets + "[.] " + alphabets + "[.] " + alphabets \
	 		+ "[.] "," \\1<abbr>\\2<abbr>\\3<abbr> ",text)
	  	#e.g: G C S
		text = re.sub(" " + alphabets + " " + alphabets + " " + alphabets \
	 		+ " "," \\1<abbr>\\2<abbr>\\3<abbr> ",text)
	    #e.g: R.R.
		text = re.sub(" "+alphabets + "[.]" + alphabets + "[.] ",\
			" \\1<abbr>\\2<abbr> ",text)
	  	#e.g: R.R
		text = re.sub(" "+alphabets + "[.]" + alphabets + " ",\
			" \\1<abbr>\\2<abbr> ",text)
	  	#e.g: R. R
		text = re.sub(" " +alphabets + "[.] " + alphabets +" " ,\
			" \\1<abbr>\\2<abbr> ",text)
	  	#e.g: R. R.
		text = re.sub(" " + alphabets + "[.] " + alphabets + "[.] ",\
			" \\1<abbr>\\2<abbr> ",text)
	  	#e.g: R R
		text = re.sub(" " + alphabets + " " + alphabets + " " ,\
			"  \\1<abbr>\\2<abbr> ",text)

		if "”" in text: text = text.replace(".”","”.")
		if "\"" in text: text = text.replace(".\"","\".")
		if "!" in text: text = text.replace("!\"","\"!")
		text = text.replace(".",".<stop>")
		text = text.replace("!","!<stop>")
		text = text.replace("<prd>",".")
		text = text.replace("<abbr>",".")
		sentences = text.split("<stop>")
		sentences = sentences[:-1]
		sentences = [s.strip() for s in sentences]
		return sentences


	def remove_stopwords(self, sentence):
		"""The function to filter the sentence by removing stopwords 
		(e.g. punctuations, articles)

		Parameters
		----------
		sentence : str
			a sentence from which stopwords are to be removed

		Returns
		-------
		list of string: 
			filtered sentence of the given sentence

		"""
		sentence = sentence.lower()
		stop_words = set(stopwords.words('english') + list(punctuation)) 		
		word_tokens = word_tokenize(sentence) 
		filtered_sentence = [w for w in word_tokens if not w in stop_words] 
		filtered_sentence = [] 
		for w in word_tokens: 
			if w not in stop_words: 
				filtered_sentence.append(w) 

		return filtered_sentence 


	def stemming_and_lemmatization_text(self, words):
		"""The function to get root of words using Stemming and Lemmatization
		It avoids abbreviations.

		Parameters
		----------
		words : list of str 
			list of words to be stemmed and lemmatized

		Returns
		-------
		list of str
			list of root of the given words.
		"""
		alphabets= "([A-Za-z])"
		abbr_3letter = alphabets+"[.]"+alphabets+"[.]"+alphabets
		abbr_2letter = alphabets+"[.]"+alphabets
		res_words = []
		for word in words:
			if re.search(abbr_3letter, word):
				word = re.sub(abbr_3letter, "\\1\\2\\3", word)
			elif re.search(abbr_2letter, word):
				word = re.sub(abbr_2letter, "\\1\\2", word)
			else:
				word = wordnet_lemmatizer.lemmatize(ps.stem(word))
			res_words.append(word)
		return res_words
		

	def clean_text(self, sentence):
		"""The function to clean and filter a sentence.

		Parameters
		----------
		sentence : str 
			a sentence to be cleaned and filtered.

		Returns
		-------
		list of string
			cleaned and filtered list of words of the given sentence 
		"""
		words = self.remove_stopwords(sentence)
		words = self.stemming_and_lemmatization_text(words)
		return words


	def classify_text_into_categories(self, sentence, words):
		"""The function to classify the given sentence into imist-ambo 
		categories, by checking if any word of the sentence matches with any 
		keyword of the keyword-category pairs of imist_ambo_template db 
		collection. 

		If a sentence has multiple words that gets matched to the keywords, 
		then the same sentence will be classified into the corresponding 
		categories of the keyword-category pairs of imist_ambo_template db 
		collection. Hence, one sentence can be classified into more than one 
		IMIST-AMBO categories. 

		If a sentence has no word that could be matched to any keyword, it will 
		be classified into 'Other' category.

		Parameters
		----------
		sentence : str 
			sentence to be classified into IMIST-AMBO
		words : list of str 
			words of the sentence, to be matched with keywords of 
			imist_ambo_template.

		Returns
		-------
		category_keyword 
			updated class variable, a dictionary which adds the 
			given sentence as value to the corresponding key (category)

		"""
		is_category_assigned = False

		idx = 0
		age_word = ""
		for i in range(0, len(words)):
			if words[i]=='age' or words[i]=='old':
				age_word = words[i]
				idx = i
				break

		if (age_word=='old' or age_word=='age') and words[i-2].isnumeric() \
				and (sentence not in self.category_keyword['identification']): 
		 	#ex: 23 year old, 23 years of age
			self.category_keyword['identification'].append(sentence)
			is_category_assigned = True

		elif age_word=='age' and words[i+1].isnumeric() and (sentence \
				not in self.category_keyword['identification']): 
			#ex. age is 23 years
			self.category_keyword['identification'].append(sentence)
			is_category_assigned = True


		for i in range(0, len(words)):
			#unigrams
			imist_ambos = Imist_ambo_template.objects.filter(keyword=words[i])
			if len(imist_ambos) and (sentence not in \
					self.category_keyword[imist_ambos[0].category]):
				self.category_keyword[imist_ambos[0].category].append(sentence)
				is_category_assigned = True

			#bigrams
			if i<(len(words)-1):
				search_keyword = words[i]+" "+words[i+1]
				imist_ambos = Imist_ambo_template.objects\
						.filter(keyword=search_keyword)
				if len(imist_ambos) and (sentence not in \
						self.category_keyword[imist_ambos[0].category]):
					self.category_keyword[imist_ambos[0].category]\
						.append(sentence)
					is_category_assigned = True

			#trigrams		
			if i<(len(words)-2):
				search_keyword = words[i]+" "+words[i+1]+" "+words[i+2]
				imist_ambos = Imist_ambo_template.objects\
				.filter(keyword=search_keyword)				
				if len(imist_ambos) and (sentence not in \
						self.category_keyword[imist_ambos[0].category]):
					self.category_keyword[imist_ambos[0].category]\
						.append(sentence)
					is_category_assigned = True

		if is_category_assigned==False and len(words)>2:
			self.category_keyword['other'].append(sentence)




	def clean_and_classify(self):
		"""This function will first call split_into_sentences() to split the 
		convertedTet into sentences, then clean_text() function to filter the 
		sentences of convertedText and then call classify_text_into_categories()
		function to classify the sentences of convertedText into IMIST-AMBO 
		categories.

		Parameters
		----------

		Returns
		-------
		category_keyword 
			updated class variable, a dictionary which adds the 
			given sentence as value to the corresponding key (category)

		"""
		self.sentences = self.split_into_sentences()

		for sentence in self.sentences:
			sentence = sentence.replace("[PROTECTED_DOT]", ".")
			words = self.clean_text(sentence)
			self.classify_text_into_categories(sentence, words)
		return self.category_keyword


	def save_categorizedText_in_db(self):
		"""The function to save dictionary category_keyword as categorizedText 
		into Text_categorization db collection for the current voice_file.

		Parameters
		----------

		Returns
		-------

		"""
		text_categorization = Text_categorization(voiceFile=self.voice_file)
		text_categorization.identification = \
			self.category_keyword['identification']
		text_categorization.mechanism = self.category_keyword['mechanism']
		text_categorization.injury = self.category_keyword['injury']
		text_categorization.signs = self.category_keyword['signs']
		text_categorization.treatment = self.category_keyword['treatment']
		text_categorization.allergy = self.category_keyword['allergy']
		text_categorization.medication = self.category_keyword['medication']
		text_categorization.background = self.category_keyword['background']
		text_categorization.other = self.category_keyword['other']
		text_categorization.save()


	def update_categorizedText_in_db(self):
		"""The function to update Text_categorization db collection with the 
		updated value of category_keyword dictionary for the current voice file.

		Parameters
		----------

		Returns
		-------

		"""
		text_categorization = \
			Text_categorization.objects.filter(voiceFile=self.voice_file)[0]
		text_categorization.identification = \
			self.category_keyword['identification']
		text_categorization.mechanism = self.category_keyword['mechanism']
		text_categorization.injury = self.category_keyword['injury']
		text_categorization.signs = self.category_keyword['signs']
		text_categorization.treatment = self.category_keyword['treatment']
		text_categorization.allergy = self.category_keyword['allergy']
		text_categorization.medication = self.category_keyword['medication']
		text_categorization.background = self.category_keyword['background']
		text_categorization.other = self.category_keyword['other']
		text_categorization.save()


	def get_categorizedText_from_db(self, filename):
		"""The function to retrieve categorizedText of the given voice_file 
		from Text_categorization db collection.

		Parameters
		----------
		filename : str
			name of the voice file

		Returns
		-------
		category_keyword 
			updated class variable, a dictionary which adds the 
			given sentence as value to the corresponding key (category)

		"""

		self.voice_file = Voice_files.objects.filter(filename=filename)[0]
		text_categorization = \
			Text_categorization.objects.filter(voiceFile=self.voice_file)[0]
		self.category_keyword['identification'] = \
			text_categorization.identification
		self.category_keyword['mechanism'] = text_categorization.mechanism
		self.category_keyword['injury'] = text_categorization.injury
		self.category_keyword['signs'] = text_categorization.signs
		self.category_keyword['treatment'] = text_categorization.treatment
		self.category_keyword['allergy'] = text_categorization.allergy
		self.category_keyword['medication'] = text_categorization.medication
		self.category_keyword['background'] = text_categorization.background
		self.category_keyword['other'] = text_categorization.other
		return self.category_keyword


	def update_categorized_text_forall_records(self):
		"""This function will be called whenever Imist_ambo_template DB 
		collection is updated by inserting or deleting or updating any 
		keyword-category pair.

		The categorizedText for all the voice_files needs to be updated to 
		employ the changes made in Imist_ambo_template

		This function will iterate over all the documents of 
		Text_categorization db collection and update them according to the 
		changed Imist_ambo_template db collection. 

		Parameters
		----------

		Returns
		-------

		"""
		categorized_texts = Text_categorization.objects
		for categorized_text in categorized_texts:
			self.voice_file = None
			self.text = ""
			self.sentences = []
			self.category_keyword = { "identification" : [],
								  "mechanism" : [],
								  "injury": [],
								  "signs": [],
								  "treatment": [],
								  "allergy": [],
								  "medication": [],
								  "background": [],
								  "other": [] }
			self.voice_file = categorized_text.voiceFile
			self.category_keyword
			self.text = Voice_text_conversion.objects\
				.filter(voiceFile=self.voice_file)[0].converted_text
			self.clean_and_classify()
			self.update_categorizedText_in_db()



	def insert_into_imist_ambo_inbulk(self):
		"""The function to add all the initial keyword-category pairs in the 
		Imist_ambo_template db collection. These keyword-category pairs are 
		collected from the Requirement Documents shared by the sponsor.

		The categories are fixed: IMIST-AMBO.
		I - Identification
		M - Mechanism
		I - Injury
		S - Signs
		T - Treatment
		O - Other
		However, as discussed with Sponsor, we have only considered IMIST and O
		as the categories.
		For each category, there are and will be various keywords. Using NLP, 
		we have stored the keywords as the root of word, by performing stemming
		and lemmatization.

		These keyword-category pairs provides a meta-data for categorization. 
		A sentence containing a word that matches with the keyword of one of 
		the keyword-category pairs, will be classified into the corresponding
		category.

		Parameters
		----------

		Returns
		-------

		"""
		map_keyword_category = [
			{"keyword": "age",
			 "category": "identification"},
			{"keyword": "male",
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
			{"keyword": "fell",
			 "category": "mechanism"},
			{"keyword": "burn",
			 "category": "mechanism"},
			{"keyword": "hit",
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
			{"keyword": "penetr",
			 "category": "injury"},
			{"keyword": "blunt",
			 "category": "trauma"},
			{"keyword": "head",
			 "category": "injury"},
			{"keyword": "neck",
			 "category": "injury"},
			{"keyword": "chest",
			 "category": "injury"},
			{"keyword": "abdomen",
			 "category": "injury"},
			{"keyword": "abdomin",
			 "category": "injury"},
			{"keyword": "forehead",
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
			{"keyword": "facial burn",
			 "category": "injury"},
			{"keyword": "disloc",
			 "category": "injury"},
			{"keyword": "eviscer",
			 "category": "injury"},
			{"keyword": "blast",
			 "category": "injury"},
			{"keyword": "pain",
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
			{"keyword": "spo",
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
			{"keyword": "inter hospit transfer",
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
		arr = [Imist_ambo_template(**data) for data in map_keyword_category]
		Imist_ambo_template.objects.insert(arr, load_bulk=True)


	def insert_into_imist_ambo(self, keyword, category):
		"""The function to insert one pair of keyword-category in 
		Imist_ambo_template DB Collection.

		Parameters
		----------
		keyword : str
			a word which will be stemmed and lemmatized to store its root word
			but if it's an acronym or abbreviation then it won't be stemmed or
			lemmatized
		category : str
			any of the IMIST or O category

		Returns
		-------
		int
		status telling if the keyword-category pair is stored

		"""	
		alphabets= "([A-Za-z])"
		abbr_3letter = alphabets+"[.]"+alphabets+"[.]"+alphabets+"[.]"
		abbr_2letter = alphabets+"[.]"+alphabets+"[.]"

		keyword_arr = keyword.split(" ")
		keyword = ""
		for key in keyword_arr:
			if re.search(abbr_3letter, key):
				keyword += re.sub(abbr_3letter, "\\1\\2\\3", key) + " "
			elif re.search(abbr_2letter, key):
				keyword += re.sub(abbr_2letter, "\\1\\2", key) + " "
			else:	
				keyword += wordnet_lemmatizer.lemmatize(ps.stem(key)) + " "
		keyword = keyword.strip()
		imist_ambos = Imist_ambo_template.objects.filter(keyword=keyword)
		if len(imist_ambos)>0:
			imist_ambo = imist_ambos[0]
			if imist_ambo.category==category:
				return 2
			else:
				imist_ambo.category = category
				imist_ambo.save()
		else:
			imist_ambo = \
				Imist_ambo_template(keyword=keyword, category=category).save()
		self.update_categorized_text_forall_records()
		return 1




	def getall_imist_ambo(self):
		"""The function to retrieve all the keyword-category pairs stored in 
		Imist_ambo_template db collection

		Parameters
		----------

		Returns
		-------
		list of Imist_ambo_template objects

		"""
		keyword_category_list = Imist_ambo_template.objects
		return keyword_category_list


	def get_imist_ambo(self, searchword):
		"""The function to retrieve all the keyword-category pairs stored in 
		Imist_ambo_template db collection, filtered by category or keyword

		Parameters
		----------

		Returns
		-------
		list of Imist_ambo_template objects

		"""
		keyword_category_list = \
			Imist_ambo_template.objects.filter(category=searchword)
		if len(keyword_category_list)>0:
			return keyword_category_list
		
		searchword = wordnet_lemmatizer.lemmatize(ps.stem(searchword))
		keyword_category_list = \
			Imist_ambo_template.objects.filter(keyword=searchword)
		if len(keyword_category_list)>0:
			return keyword_category_list
		return []