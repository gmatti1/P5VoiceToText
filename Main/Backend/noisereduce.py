from scipy.io import wavfile

import noisereduce as nr
# load data
rate, data = wavfile.read("mediahandler.wav")
# select section of data that is noise
noisy_part = data[:]
# perform noise reduction
reduced_noise = nr.reduce_noise(audio_clip=data, noise_clip=noisy_part, verbose=True)