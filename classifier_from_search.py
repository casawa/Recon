import csv
import urllib
import urllib2
import json
import re
import os
import sys
import zipfile

# creates a new classifierlist based on Bing image search of a query

# delete _negatives.zip to remake
def createNegativeImages():
	if not os.path.exists("scraped_images/_negatives.zip"):
		keyBing = ''        # get Bing key from: https://datamarket.azure.com/account/keys
		credentialBing = 'Basic ' + (':%s' % keyBing).encode('base64')[:-1] # the "-1" is to remove the trailing "\n" which encode adds
		os.system("mkdir scraped_images/_negatives")
		with open('random_objects.csv', 'rb') as csvfile:
			objects = csv.reader(csvfile, delimiter=' ', quotechar='|')
			zf = zipfile.ZipFile("scraped_images/_negatives.zip", mode='w')
			for row in objects:
				row = row[0]
				searchString = '%27'+ row + '%27'
				url = 'https://api.datamarket.azure.com/Bing/Search/v1/Image?' + \
				      'Query=%s&$top=%d&$skip=%d&$format=json' % (searchString, 1, 0)

				request = urllib2.Request(url)
				request.add_header('Authorization', credentialBing)
				requestOpener = urllib2.build_opener()
				response = requestOpener.open(request) 

				results = json.load(response)
				url = re.findall("\"MediaUrl\": \"([^\"]*)\", \"__metadata\": {\"type\": \"ImageResult\"", json.dumps(results))
				try:
					url = url[0]
					print url
					urllib.urlretrieve(url, "scraped_images/_negatives/%s.jpg" % (row))
					zf.write("scraped_images/_negatives/%s.jpg" % (row))
				except:
					print "%s not accessible, skipping" % (row)
		zf.close()

def main():
	if len(sys.argv) > 1:
		print "generating positive image database"
		os.system("python bing_image_scrape.py " + sys.argv[1])
		zf = zipfile.ZipFile("scraped_images/" + sys.argv[1]+ ".zip", mode='w')
		for i in os.listdir("scraped_images/" + sys.argv[1]):
			zf.write("scraped_images/" + sys.argv[1] + "/" + i)
		zf.close()
		print "created training set for the object %s" % (sys.argv[1])
		print "generating negative image database"
		createNegativeImages()
		os.chdir("WatsonAPI")
		os.system("python watson_init.py ../scraped_images/" + sys.argv[1] + ".zip ../scraped_images/_negatives.zip " + sys.argv[1])


	else:
		print "need term to train classifier on, use + instead of spaces"
main()
