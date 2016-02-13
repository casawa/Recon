import os, subprocess
import sys

if len(sys.argv) > 3:
	os.system("sh get_token.sh")
	output = subprocess.Popen("sh upload_images.sh " + sys.argv[1] + " " + sys.argv[2] + " " + sys.argv[3], \
													stdout=subprocess.PIPE, shell=True).communicate()[0]
	classifier_info = eval(output)
	class_id = classifier_info["classifier_id"]

	with open('classifierlist.json', 'w') as f:
		file_str = '{"classifier_ids": ["' + class_id + '"]}\n'
		f.write(file_str)
else:
	print "args yo"
