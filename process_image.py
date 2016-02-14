from PIL import Image
import os

for i in os.listdir("pics/cwd"):
    if i.endswith(".png"): 
        im = Image.open("pics/cwd/" + i)
        print i
        im = im.crop((140, 250, 940, 1640))
        im.save("pics/cwd/" + i)