from PIL import Image
import os

LEFT = 0
TOP = 0
RIGHT = 800
BOTTOM = 1390

num = input("num fragments: ")

width = RIGHT - LEFT
height = BOTTOM - TOP
newWidth = width / num
newHeight = height / num

for i in os.listdir("pics/cwd"):
    if i.endswith(".png"): 
        im = Image.open("pics/cwd/" + i)
        print i
        for x in range(num):
        	for y in range(num):
        		print ("%d, %d, %d, %d saved as %s" % (LEFT + x * newWidth, TOP + y * newHeight, \
        				 RIGHT - (num-x - 1) * newWidth, BOTTOM - (num-y - 1) * newHeight, str(x) + str(y) + i))
        		new = im.crop((LEFT + x * newWidth, TOP + y * newHeight, \
        				RIGHT - (num-x-1) * newWidth, BOTTOM - (num-y-1) * newHeight))
        		new.save("pics/cwd/" + str(x) + str(y) + i)