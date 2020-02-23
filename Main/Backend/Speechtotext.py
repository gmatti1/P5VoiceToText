import speech_recognition as sr

recording = sr.Recognizer()
harvard = sr.AudioFile('Recording.wav')

with harvard as source:
    audio = recording.record(source, duration=6)
print(recording.recognize_google(audio))