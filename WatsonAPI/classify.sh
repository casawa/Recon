curl -u "1c0927e5-5d95-458d-a0a0-5b0f06d23ae5":"efl5ZftB7WOI" \
-X POST \
-F "images_file=@$1" \
-F "classifier_ids=<classifierlist.json" \
"https://gateway.watsonplatform.net/visual-recognition-beta/api/v2/classify?version=2015-12-02"
