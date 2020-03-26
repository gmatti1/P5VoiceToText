from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.probability import FreqDist
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from nltk.stem.wordnet import WordNetLemmatizer
text="""Hey Mr. Shashi, how  you doing today? The weather is good, and city is awesome. a 3 year old female got hit, bp 300
head injury severe blood flow"""
text_tokenization=sent_tokenize(text)
#print(text_tokenization)

word_tokenization=word_tokenize(text)
#print(word_tokenization)

freq_dist = FreqDist(word_tokenization)
#print(freq_dist)

freq_dist.most_common(2)

stop_words=set(stopwords.words("english"))
#print(stop_words)
senetence_filtered=[]
for w in tokenized_word:
    if w not in stop_words:
        senetence_filtered.append(w)
#print("Tokenized Sentence:",word_tokenization)
#print("Filterd Sentence:",senetence_filtered)

ps = PorterStemmer()
word_stemming=[]
for w in senetence_filtered:
    word_stemming.append(ps.stem(w))

print("Filtered Sentence:",senetence_filtered)
print("Stemmed Sentence:",word_stemming)

lem = WordNetLemmatizer()


stem = PorterStemmer()

word = "realising"
print("Lemmatized Word:",lem.lemmatize(word,"v"))
print("Stemmed Word:",stem.stem(word))