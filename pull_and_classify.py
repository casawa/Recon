import os
import time

i = 0
while True:
	os.system("adb shell screencap /sdcard/screen.png")
	os.system("adb pull /sdcard/screen.png")
	os.system("mv screen.png pics/" + str(i) + ".png") 
	i += 1
	os.system("sh WatsonAPI/classify.sh pics/" + str(i) + ".png")
