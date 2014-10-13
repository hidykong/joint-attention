import json
import sys
import os

child = ["ex_face", "ball", "book", "par_face"]
examiner = ["c_face", "par_face", "book", "ball"]

info_ = []
duration_ = []
attention_ = []
ja_ = []
ja_json = []
child_ = []
examiner_ = []

def initialize():
	global ja_, ja_json, attention_, eye_, object_
	global child_, examiner_
	global start, end
	global info_
	global duration_

	attention_ = []
	ja_ = []
	ja_json = []
	child_ = []
	examiner_ = []
	aggregate_ = []
	info_= []
	duration_ = []
	eye_ =[]
	object_ =[]

def saveJson(filename, info_, duration_):

	jsonFile = open(filename.split('.')[0] + ".json", "w")
	#jsonFile.write(dur)
	
	jsonFile.write(
		"{" + "\"info\"" + ":"  + json.dumps(info_, indent=4, separators=(',', ': ')) + ","
		"\"duration\"" + ":"  + json.dumps(duration_, indent=4, separators=(',', ': ')) + ","
		"\"child\"" + ":" + json.dumps(child_, indent=4, separators=(',', ': ')) + ","
		"\"examiner\"" + ":"  + json.dumps(examiner_, indent=4, separators=(',', ': ')) +  "}"
	)

	jsonFile.close()

def fillArray(ja_ , attention_):
	currentEx = ""
	currentCh = ""
	gazeStart = 0

	for i in range(len(ja_)):
		#whenever the child gaze or examiner gaze changes
		if (attention_[i][0] != currentCh) or (attention_[i][1] != currentEx):

			#append the child part
			chDict = {"start": 0, "end": 0, "val": ""}
			chDict["start"] = gazeStart
			chDict["end"] = i
			chDict["val"] = currentCh 
			if ja_[gazeStart] is 0:
				chDict["joint"] = 0
			else:
				chDict["joint"] = 1
			if ja_[gazeStart] == "c_face":
				chDict["eye"] = 1
			else:
				chDict["eye"] = 0

			#append the examiner part
			exDict = {"start": 0, "end": 0, "val": ""}
			exDict["start"] = gazeStart
			exDict["end"] = i
			exDict["val"] = currentEx
			if ja_[gazeStart] is 0:
				exDict["joint"] = 0
			else:
				exDict["joint"] = 1
			if ja_[gazeStart] == "c_face":
				exDict["eye"] = 1
			else:
				exDict["eye"] = 0

			if "book" in str(ja_[gazeStart]) or "ball" in str(ja_[gazeStart]):
				exDict["objectGaze"] = 1
				chDict["objectGaze"] = 1
			else:
				exDict["objectGaze"] = 0
				chDict["objectGaze"] = 0

			#append both dictionaries to the json if not null
			if (chDict["val"] is not 0 and chDict["val"] is not '') or (exDict["val"] is not 0 and exDict["val"] is not ''):
				if chDict["val"] is 0:
					chDict["val"] = ""
				if exDict["val"] is 0:
					exDict["val"] = ""
				child_.append(chDict)
				examiner_.append(exDict)
			gazeStart = i
			currentCh = attention_[i][0]
			currentEx = attention_[i][1]
		

def main(argv):
	initialize()
	if len(argv) > 0:
		filename = argv[0]
	else:
		filename = "test.json"
	jsonFile = open(filename)
	data = json.load(jsonFile)
	#print(data["duration"])
	info_ = data["info"]
	duration_ = data["duration"]

	start = data["duration"][0]["start"]
	end = data["duration"][0]["end"]
	duration = int(end - start)
	
	attention_ = [[0 for x in range(0,2)] for y in range(0, duration + 1)]
	ja_ = [0 for y in range(0, duration + 1)]
	eye_ = [0 for y in range(0, duration + 1)]
	object_ = [0 for y in range(0, duration + 1)]

	#child gaze
	for stage in data["child"]:
		for i in range(int(round(stage["start"] - start)), int(round(stage["end"]- start))):
			attention_[i][0] = stage["val"]

	#examiner gaze
	for stage in data["examiner"]:
		for i in range(int(round(stage["start"] - start)), int(round(stage["end"]- start))):
			attention_[i][1] = stage["val"]


	for i in range(0, duration + 1):
		e_val = attention_[i][1]
		for j in range(0, 3):
			c_val = attention_[i][0]
			if (e_val == c_val or (c_val == "gaze_ex_face" and e_val == "c_face")) and (e_val != 0):
				ja_[i] = e_val
				break

	#print ja_
	fillArray(ja_, attention_)
	#print json.dumps(child_, indent=4, separators=(',', ': '))
	saveJson("test-modified", info_, duration_)


		

if  __name__ =='__main__':
    main(sys.argv[1:])






