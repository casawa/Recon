import os
import time

i = 0
while True:
	os.system("adb shell screencap /sdcard/screen.png")
	#time.sleep(0.5)
	os.system("adb pull /sdcard/screen.png")
	os.system("mv screen.png pics/" + str(i) + ".png") 
	i += 1
	#time.sleep(1)	# Delays for 6 seconds
