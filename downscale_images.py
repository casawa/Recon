from PIL import Image
import os

for i in os.listdir("scraped_images/grass"):
    if i.endswith(".jpg"): 
		img = Image.open('i')
		maxsize = (1028, 1028)
		img.thumbnail(maxsize, Image.ANTIALIAS)
		img.save("small/" + i)