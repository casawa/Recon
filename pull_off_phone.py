import os

while True:
	os.system("adb shell screencap /sdcard/screen.png & adb pull /sdcard/screen.png")
	os.sleep(600)
