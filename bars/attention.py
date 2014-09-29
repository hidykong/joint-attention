import json
import sys
import os

child = ["ex_face", "ball", "book", "par_face"]
examiner = ["c_face", "par_face", "book", "ball"]

attention_ = []
ja_ = []

def initialize():
	global ja_
	global attention_
	global start, end
	attention_ = []
	ja_ = []



def main():
	jsonFile = open('test.json')
	data = json.load(jsonFile)
	print(data["duration"])
	start = data["duration"][0]["start"]
	end = data["duration"][0]["end"]
	duration = int(end - start)
	print duration
	
	attention_ = [[0 for x in range(0,2)] for y in range(0, duration + 1)]
	ja_ = [0 for y in range(0, duration + 1)]

	#child gaze
	for stage in data["stages"]:
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

	print ja_


if  __name__ =='__main__':
    main()






