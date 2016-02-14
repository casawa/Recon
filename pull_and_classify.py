import os
import time
import subprocess
import json
import re
from PIL import Image
import zipfile

# vals post crop
LEFT = 0
TOP = 0
RIGHT = 800
BOTTOM = 1390

# NUM_FRAGS ^ 2 number of end fragments
num = 3

i = 0
while True:
	os.system("adb shell screencap /sdcard/screen.png")
	time.sleep(0.5)
	os.system("adb pull /sdcard/screen.png")
	os.system("mv screen.png pics/" + str(i) + ".png")
	im = Image.open("pics/" + str(i) + ".png")
	im = im.crop((140, 250, 940, 1640))

	width = RIGHT - LEFT
	height = BOTTOM - TOP
	newWidth = width / num
	newHeight = height / num

	zf = zipfile.ZipFile("pics/" + str(i)+ ".zip", mode='w')

	for x in range(num):
		for y in range(num):
			print ("%d, %d, %d, %d saved as %s" % (LEFT + x * newWidth, TOP + y * newHeight, \
 				RIGHT - (num-x - 1) * newWidth, BOTTOM - (num-y - 1) * newHeight, str(x) + str(y) + str(i)))
			new = im.crop((LEFT + x * newWidth, TOP + y * newHeight, \
				RIGHT - (num-x-1) * newWidth, BOTTOM - (num-y-1) * newHeight))
			new.save("pics/" + str(i) + "_" + str(x) + str(y) + ".png")
			zf.write("pics/" + str(i) + "_" + str(x) + str(y) + ".png")
	zf.close()

	positive = False
	# v = subprocess.check_output("sh WatsonAPI/classify.sh pics/" + str(i) + "_" + str(x) + str(y) + ".png", shell=True)
	v = subprocess.check_output("sh WatsonAPI/classify.sh pics/" + str(i)+ ".zip", shell=True)
	# j = json.loads(v)
	print(v)
	scores = re.findall("\"score\":([0-9\.]*)", v)
	for score in scores:
		score = float(score)
		if score > 0.625:
			positive = True
			break

	if positive is True:
		print "There is a beach ball!"
	else:
		print "No beach ball!"

	i += 1