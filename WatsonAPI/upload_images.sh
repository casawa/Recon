

curl -u "1c0927e5-5d95-458d-a0a0-5b0f06d23ae5":"efl5ZftB7WOI" \
	     -X POST \
	          -F "positive_examples=@$1" \
		       -F "negative_examples=@$2" \
		            -F "name=tiger" \
			         "https://gateway.watsonplatform.net/visual-recognition-beta/api/v2/classifiers?version=2015-12-02"
