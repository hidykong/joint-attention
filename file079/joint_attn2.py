from __future__ import division
import json
import sys
import os
from bs4 import BeautifulSoup
import xml

child = ["ex_face", "ball", "book", "par_face"]
examiner = ["c_face", "par_face", "book", "ball"]
filled = ["look at my ball", "roll it back?", "look at my book", "what's next?", "can you turn the page?",
			"where is the ... ?", "where is the book?",  "it's a hat! It's on my head!"]
unfilled = ["hello", "play with new toys", "let's play ball", "ready, set, ...", "one, two, three, ...", "go!",
			"gonna tickle you", "gonna get you", "tickle tickle tickle"]
red = ["verbalization", "vocalization"]
socialbid = ["social__bid"]

socialbid_ = []
child_ = []
examiner_ = []
aggregate_ = []
info_ = []
duration_ = []
filled_ = []
unfilled_ = []
red_ = []
child_ball_ = []
child_book_ = []
child_ex_ = []
examiner_ball_ = []
examiner_book_ = []
examiner_child_ = []

def initialize( first, last ):
	global child_
	global examiner_
	global aggregate_
	global info_
	global duration_
	global filled_
	global unfilled_
	global red_
	global child_ball_
	global child_book_
	global child_ex_
	global examiner_ball_
	global examiner_book_
	global examiner_child_
	global socialbid_
	child_ = []
	examiner_ = []
	aggregate_ = []
	info_= []
	duration_ = []
	filled_ = []
	unfilled_ = []
	red_ = []
	socialbid_ = []

	child_ball_ = [0] * int((last - first)*10)
	child_book_ = [0] * int((last - first)*10)
	child_ex_ = [0] * int((last - first)*10)
	examiner_ball_ = [0] * int((last - first)*10)
	examiner_book_ = [0] * int((last - first)*10)
	examiner_child_ = [0] * int((last - first)*10)

def fillArray(val, start, end, tier_id, first, last):

	d = dict()
	d["start"] = start
	d["end"] = end
	d["val"] = val

	if tier_id == "gaze_dir_c":
		d["val"] = "child_" + val
		child_.append(json.dumps(d))
		aggregate_.append(json.dumps(d))
		if val == "ex_face":
			range = int((end - start)*10)
			for x in xrange( range ):
				child_ex_[ int((start - first)*10) + x] = 1
		if val == "book":
			range = int((end - start)*10)
			for x in xrange( range ):
				child_book_[int((start - first)*10) + x] = 1
		if val == "ball":
			range = int((end - start)*10)
			for x in xrange( range ):
				child_ball_[int((start - first)*10) + x] = 1

	if tier_id == "gaze_dir_e":
		d["val"] = "examiner_" + val
		examiner_.append(json.dumps(d))
		aggregate_.append(json.dumps(d))
		if val == "book":
			range = int((end - start)*10)
			for x in xrange( range ):
				examiner_book_[int((start - first)*10) + x] = 1
		if val == "ball":
			range = int((end - start)*10)
			for x in xrange( range ):
				examiner_ball_[int((start - first)*10) + x] = 1
		if val == "c_face":
			range = int((end - start)*10)
			for x in xrange( range ):
				examiner_child_[int((start - first)*10) + x] = 1

	if val in socialbid:
		socialbid_.append(json.dumps(d))
	if val in filled:
		filled_.append(json.dumps(d))

	if val in red:
		red_.append(json.dumps(d))

	if val in unfilled:
		unfilled_.append(json.dumps(d))

def saveJson( filename ):

	jsonFile = open(filename.split('.')[0] + ".json", "w")
	jsonFile.write(
		"{" + "\"info\"" + ":" + "[" + ','.join(info_) + "]" + ","
		"\"duration\"" + ":" + "[" + ','.join(duration_) + "]" + ","
		"\"child\"" + ":" + "[" + ','.join(child_) + "]" + ","
		"\"examiner\"" + ":" + "[" + ','.join(examiner_) + "]" + ","
		"\"filled\"" + ":" + "[" + ','.join(filled_) + "]" + ","
		"\"unfilled\"" + ":" + "[" + ','.join(unfilled_) + "]" + ","
		"\"red\"" + ":" + "[" + ','.join(red_) + "]" + ","
		"\"socialbid\"" + ":" + "[" + ','.join(socialbid_) + "]" + ","
		"\"child_ball\"" + ":" + "[" + ",".join(str(x) for x in child_ball_) + "]" + ","
		"\"child_book\"" + ":" + "[" + ",".join(str(x) for x in child_book_) + "]" + ","
		"\"child_ex\"" + ":" + "[" + ",".join(str(x) for x in child_ex_) + "]" + ","
		"\"examiner_child\"" + ":" + "[" + ",".join(str(x) for x in examiner_child_) + "]" + ","
		"\"examiner_ball\"" + ":" + "[" + ",".join(str(x) for x in examiner_ball_) + "]" + ","
		"\"examiner_book\"" + ":" + "[" + ",".join(str(x) for x in examiner_book_) + "]" + ","
		"\"aggregate\"" + ":" + "[" + ','.join(aggregate_) + "]" + "}"
	)
	jsonFile.close()


def main():
	for file_ in os.listdir("."):
	    if file_.endswith(".eaf"):

			elan = BeautifulSoup(open(file_), "xml")
			tm = dict()
			first = sys.maxint
			last = 0

			for timeMapping in elan.TIME_ORDER.find_all("TIME_SLOT"):
				time = round(int(timeMapping["TIME_VALUE"])/1000, 1)
				tm[timeMapping["TIME_SLOT_ID"]] = time

				if time > last:
					last = time
				if time < first:
					first = time

			initialize( first, last )

			global info_
			d = dict()
			info = elan.HEADER.find("MEDIA_DESCRIPTOR")
			d["origin"] = round(int(info["TIME_ORIGIN"])/1000, 1)
			#d["filename"] = info["RELATIVE_MEDIA_URL"].split("/")[-1]
			d["child"] = file_.split("_")[0]
			info_.append(json.dumps(d))


			for tier in elan.find_all("TIER"):
				tier_id = tier["TIER_ID"]

				for annotation in tier.find_all("ANNOTATION"):
					start = tm[annotation.find("ALIGNABLE_ANNOTATION")["TIME_SLOT_REF1"]]
					end = tm[annotation.find("ALIGNABLE_ANNOTATION")["TIME_SLOT_REF2"]]
					val = annotation.find("ANNOTATION_VALUE").string
					fillArray(val, start, end, tier_id, first, last)

			global duration_
			d = dict()
			d["start"] = first
			d["end"] = last
			duration_.append(json.dumps(d))
			saveJson(file_)



if  __name__ =='__main__':
    main()






