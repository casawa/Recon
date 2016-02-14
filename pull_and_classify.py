import os
import time
import subprocess
import json

# vals post crop
LEFT = 0
TOP = 0
RIGHT = 800
BOTTOM = 1390

# NUM_FRAGS ^ 2 number of end fragments
NUM_FRAGS = 3

i = 0
while True:
	os.system("adb shell screencap /sdcard/screen.png")
	os.system("adb pull /sdcard/screen.png")
	os.system("mv screen.png pics/" + str(i) + ".png")
	i += 1
	im = im.crop((140, 250, 940, 1640))

	width = RIGHT - LEFT
	height = BOTTOM - TOP
	newWidth = width / num
	newHeight = height / num

	positive = False
	for x in range(num):
		for y in range(num):
			print ("%d, %d, %d, %d saved as %s" % (LEFT + x * newWidth, TOP + y * newHeight, \
 				RIGHT - (num-x - 1) * newWidth, BOTTOM - (num-y - 1) * newHeight, str(x) + str(y) + i))
			new = im.crop((LEFT + x * newWidth, TOP + y * newHeight, \
				RIGHT - (num-x-1) * newWidth, BOTTOM - (num-y-1) * newHeight))
			new.save("pics/" + str(i) + "_" + str(x) + str(y) + ".png")
			v = subprocess.check_output("sh WatsonAPI/classify.sh pics/" + str(i) + "_" + str(x) + str(y) + ".png", shell=True)
			j = json.loads(v)
			if "images" in j:
				arr = j["images"]
				cur = arr[0]
				if "scores" in cur:
					positive = True
					break
	if positive:
		print "EYYY LMAO FUCK YOUR MOTHER ~ANDREW CHEN 2016"
	else:
		print "EYYY LMAO FUCK YOUR MOTHER (IN THE BAD WAY)"
