class ClassifyText:

	def __init__(self):
		self.text = ""

	def remove_stopwords(self):
		print("Removing Stop Words ....")

	def stemming_text(self):
		print("Get the root of words using Stemming ....")

	def lemmatization_text(self):
		print("Get the root of words using Lemmatization ....")

	if __name__=='__main__':
		classifyText = ClassifyText()
		classifyText.remove_stopwords()
		classifyText.lemmatization_text()