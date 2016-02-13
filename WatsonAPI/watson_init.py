import os, subprocess
import sys

os.system("sh get_token.sh")
output = subprocess.Popen("sh upload.sh", stdout=subprocess.PIPE).communicate()[0]
classifier_info = eval(output)
class_id = classifier_info["classifier_id"]

with open('classifierlist.json', 'w') as f:	
	file_str = '{"classifier_ids": ["' + class_id + '"]}'
	f.write(file_str)
