import os
import time

while True:
	os.system("adb shell screencap /sdcard/screen.png & adb pull /sdcard/screen.png")
	time.sleep(6)	# Delays for 6 seconds
