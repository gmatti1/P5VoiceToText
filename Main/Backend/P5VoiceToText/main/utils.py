from P5VoiceToText.models import Voice_files

class AudioFile:
    def __init__(self):
        self.filename = ""
        self.s3link = ""

    def save_audio_file(self):
        voice_file = Voice_files(filename=self.filename, s3link=self.s3link).save()

    def check_filename_exists(self):
        voice_file = Voice_files.objects.filter(filename=self.filename)
        print("Check this voice file")
        print(voice_file[0]["s3link"])