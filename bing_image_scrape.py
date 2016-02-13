import urllib
import urllib2
import json
import re

keyBing = 'uIZGEvSJzuqAupFkbEquALcsip60TCMKDL1WBHkFknM'        # get Bing key from: https://datamarket.azure.com/account/keys
credentialBing = 'Basic ' + (':%s' % keyBing).encode('base64')[:-1] # the "-1" is to remove the trailing "\n" which encode adds
query = raw_input("query (change space to +): ")
print "searching for " + query
searchString = '%27'+ query + '%27'
top = 300
offset = 0
cntr = 1
numIters = 5

for i in range(numIters):
	url = 'https://api.datamarket.azure.com/Bing/Search/v1/Image?' + \
	      'Query=%s&$top=%d&$skip=%d&$format=json' % (searchString, top, offset)

	request = urllib2.Request(url)
	request.add_header('Authorization', credentialBing)
	requestOpener = urllib2.build_opener()
	response = requestOpener.open(request) 

	results = json.load(response)
	for url in re.findall("\"MediaUrl\": \"([^\"]*)\", \"__metadata\": {\"type\": \"ImageResult\"", json.dumps(results)):
		try:
			print url
			urllib.urlretrieve(url, "scraped_images/%s/%d.jpg" % (query, cntr))
			cntr += 1
			print cntr
		except:
			print "%d not accessible, skipping" % (cntr)
	offset += 50