import os
import argparse

from pydub import AudioSegment

formats_to_convert = ['.m4a']

#convert m4a/ aac to wav format
for (dirpath, dirnames, filenames) in os.walk("M4a_files/"):
    for filename in filenames:
        if filename.endswith(tuple(formats_to_convert)):

            filepath = dirpath + '/' + filename
            (path, file_extension) = os.path.splitext(filepath)
            file_extension_final = file_extension.replace('.', '')
            try:
                track = AudioSegment.from_file(filepath,
                        file_extension_final)
                wav_filename = filename.replace(file_extension_final, 'wav')
                wav_path = dirpath + '/' + wav_filename
                print('CONVERTING: ' + str(filepath))
                file_handle = track.export(wav_path, format='wav')
                os.remove(filepath)
            except:
                print("ERROR CONVERTING " + str(filepath))


#Convert wave to Mp3
wav_audio = AudioSegment.from_file("audio.wav", format="wav")
raw_audio = AudioSegment.from_file("audio.wav", format="raw",
                                   frame_rate=44100, channels=2, sample_width=2)

wav_audio.export("audio1.mp3", format="mp3")
raw_audio.export("audio2.mp3", format="mp3")