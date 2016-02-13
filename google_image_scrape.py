from bs4 import BeautifulSoup
import requests
import re
import urllib2
import os


def get_soup(url,header):
  return BeautifulSoup(urllib2.urlopen(urllib2.Request(url,headers=header)))


# you can change the query for the image  here  
image_type = "Action"
query = "Terminator 3 Movie"
query= query.split()
query='+'.join(query)
url=url="https://www.google.com/search?q="+query+"&source=lnms&tbm=isch"
print url
header = {'User-Agent': 'Mozilla/5.0'} 
soup = get_soup(url,header)

images = [a['src'] for a in soup.find_all("img", {"src": re.compile("gstatic.com")})]
print soup.find_all({ "class" : "irc_mi" })
# print images
cntr = 0
for img in images:
  raw_img = urllib2.urlopen(img).read()
  #add the directory for your image here 
  DIR="google_images/"
  # cntr = len([i for i in os.listdir(DIR) if image_type in i]) + 1
  f = open(DIR + image_type + "_"+ str(cntr)+".jpg", 'wb')
  cntr += 1
  f.write(raw_img)
  f.close()