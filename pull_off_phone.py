import os

# i = 0
while True:
	os.system("adb shell screencap /sdcard/screen.png & adb pull /sdcard/screen.png")
	# os.system("mv screen.png pics/" + str(i))
	# i+=1
	os.sleep(600)
