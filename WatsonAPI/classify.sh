curl -u "<username>":"<password>" \
-X POST \
-F "images_file=@$1" \
-F "classifier_ids=<classifierlist.json" \
"https://gateway.watsonplatform.net/visual-recognition-beta/api/v2/classify?version=2015-12-02"
