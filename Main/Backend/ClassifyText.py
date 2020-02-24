import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize 
from nltk.stem import PorterStemmer
from string import punctuation

class ClassifyText:

	def __init__(self):
		self.text = ""

	def remove_stopwords(self):
		print("Removing Stop Words ....")
		example_sent = "This is a sample sentence, showing off the stop words filtration."
  
		stop_words = set(stopwords.words('english') + list(punctuation)) 
		
		word_tokens = word_tokenize(example_sent) 
		
		filtered_sentence = [w for w in word_tokens if not w in stop_words] 
		
		filtered_sentence = [] 
		
		for w in word_tokens: 
			if w not in stop_words: 
				filtered_sentence.append(w) 
  
		print(word_tokens) 
		print(filtered_sentence) 

	def stemming_text(self):
		print("Get the root of words using Stemming ....")

	def lemmatization_text(self):
		print("Get the root of words using Lemmatization ....")

	if __name__=='__main__':
		classifyText = ClassifyText()
		classifyText.remove_stopwords()
		classifyText.lemmatization_text()