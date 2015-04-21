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
baf_ = []

def initialize():
	global ja_, ja_json, attention_, eye_, object_, baf_
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
	baf_ = []

def saveJson(originalFileName, filename, info_, duration_, data):

#data["duration"][0]
	jsonFile = open(filename.split('.')[0] + ".json", "w")
	#jsonFile.write(dur)
	original_child = data["child"]
	original_examiner = data["examiner"]
	filled = data["filled"]
	unfilled = data["unfilled"]
	red = data["red"]
	green = data["green"]
	socialbid = data["socialbid"]
	child_ball = data["child_ball"]
	child_book = data["child_book"]
	child_ex = data["child_ex"]
	examiner_child = data["examiner_child"]
	examiner_ball = data["examiner_ball"]
	examiner_book = data["examiner_book"]
	aggregate = data["aggregate"]

	jsonFile.write(
		"{" + "\"info\"" + ":"  + json.dumps(info_, indent=4, separators=(',', ': ')) + ","
		"\"duration\"" + ":"  + json.dumps(duration_, indent=4, separators=(',', ': ')) + ","
		"\"child\"" + ":"  + json.dumps(original_child, indent=4, separators=(',', ': ')) + ","
		"\"examiner\"" + ":"  + json.dumps(original_examiner, indent=4, separators=(',', ': ')) + ","
		"\"filled\"" + ":"  + json.dumps(filled, indent=4, separators=(',', ': ')) + ","
		"\"unfilled\"" + ":"  + json.dumps(unfilled, indent=4, separators=(',', ': ')) + ","
		"\"red\"" + ":"  + json.dumps(red, indent=4, separators=(',', ': ')) + ","
		"\"green\"" + ":"  + json.dumps(green, indent=4, separators=(',', ': ')) + ","
		"\"socialbid\"" + ":"  + json.dumps(socialbid, indent=4, separators=(',', ': ')) + ","
		"\"child_ball\"" + ":"  + json.dumps(child_ball, indent=4, separators=(',', ': ')) + ","
		"\"child_book\"" + ":"  + json.dumps(child_book, indent=4, separators=(',', ': ')) + ","
		"\"child_ex\"" + ":"  + json.dumps(child_ex, indent=4, separators=(',', ': ')) + ","
		"\"examiner_child\"" + ":"  + json.dumps(examiner_child, indent=4, separators=(',', ': ')) + ","
		"\"examiner_ball\"" + ":"  + json.dumps(examiner_ball, indent=4, separators=(',', ': ')) + ","
		"\"examiner_book\"" + ":"  + json.dumps(examiner_book, indent=4, separators=(',', ': ')) + ","
		"\"aggregate\"" + ":"  + json.dumps(aggregate, indent=4, separators=(',', ': ')) + ","
		"\"child_detailed\"" + ":" + json.dumps(child_, indent=4, separators=(',', ': ')) + ","
		"\"examiner_detailed\"" + ":"  + json.dumps(examiner_, indent=4, separators=(',', ': ')) +  "}"
	)

	jsonFile.close()

def fillArray(ja_ , attention_, baf_, start):
	currentEx = ""
	currentCh = ""
	gazeStart = 0
	#print baf_

	for i in range(len(ja_)):
		#whenever the child gaze or examiner gaze changes
		if (attention_[i][0] != currentCh) or (attention_[i][1] != currentEx):

			#append the child part
			chDict = {"start": 0, "end": 0, "val": "", "baf": 0}
			chDict["start"] = round(gazeStart/10.0 + start, 3)
			chDict["end"] = round(i/10.0 + start, 3)
			chDict["val"] = currentCh

			#append the examiner part
			exDict = {"start": 0, "end": 0, "val": "", "baf": 0}
			exDict["start"] = round(gazeStart/10.0 + start, 3)
			exDict["end"] = round(i/10.0 + start, 3)
			exDict["val"] = currentEx

			if baf_[gazeStart] is 1:
				chDict["baf"] = 1
				exDict["baf"] = 1

			if ja_[gazeStart] is 0:
				chDict["joint"] = 0
				exDict["joint"] = 0
			else:
				chDict["joint"] = 1
				exDict["joint"] = 1

			if "c_face" in str(ja_[gazeStart]):
				chDict["eye"] = 1
				exDict["eye"] = 1
			else:
				chDict["eye"] = 0
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
	if len(argv) >1:
		number = argv[1]
	else:
		filename = "test.json"
		number = 0
	jsonFile = open(filename)
	data = json.load(jsonFile)
	#print(data["duration"])
	info_ = data["info"]
	duration_ = data["duration"]

	start = data["duration"][0]["start"]
	end = data["duration"][0]["end"]
	duration = int((end - start) * 10)

	attention_ = [[0 for x in range(0,2)] for y in range(0, duration + 1)]
	ja_ = [0 for y in range(0, duration + 1)]
	eye_ = [0 for y in range(0, duration + 1)]
	object_ = [0 for y in range(0, duration + 1)]
	baf_ = [0 for y in range(0, duration + 1)]

	#child gaze
	for stage in data["child"]:
		#for i in range(int(round(stage["start"] - start)), int(round(stage["end"]- start))):
		for i in range(int(round((stage["start"] - start)*10)), int(round((stage["end"]- start)*10)) ):
			attention_[i][0] = stage["val"]

	#examiner gaze
	for stage in data["examiner"]:
		#for i in range(int(round(stage["start"] - start)), int(round(stage["end"]- start))):
		for i in range(int(round((stage["start"] - start)*10)), int(round((stage["end"]- start)*10)) ):
			attention_[i][1] = stage["val"]


	for i in range(0, duration + 1):
		e_val = attention_[i][1]
		for j in range(0, 3):
			c_val = attention_[i][0]
			#print c_val, e_val, i
			if (e_val == c_val or
				("ball" in str(c_val) and "ball" in str(e_val)) or
				("book" in str(c_val) and "book" in str(e_val)) or
				("ex_face" in str(c_val) and "c_face" in str(e_val))
				) and (e_val != 0):
				ja_[i] = e_val
				# print "match", e_val, i
				break

	baf = False
	previousVal = ""
	start = 0
	toggled = 0
	for i in range(0, duration + 1):
		currentVal = attention_[i][0]
		if ("ex_face" in str(currentVal) or "ball" in str(currentVal) or "book" in str(currentVal)):
			#print currentVal, i
			if (currentVal is not previousVal and i > 0 and i is not start):
				toggled = toggled + 1
			#print currentVal, toggled, i, start
		else:
			if (toggled > 3):
				for j in range(start, i-1):
					baf_[j] = 1
			toggled = 0
			#print i, start
			start = i
		previousVal = currentVal


	start = data["duration"][0]["start"]
	#print ja_
	fillArray(ja_, attention_, baf_, start)
	#print json.dumps(child_, indent=4, separators=(',', ': '))
	saveJson(filename, "milli-" + number, info_, duration_, data)




if  __name__ =='__main__':
    main(sys.argv[1:])





