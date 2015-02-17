from __future__ import division
import json
import sys
import os
from bs4 import BeautifulSoup
import xml

child = ["ex_face", "ball", "book", "par_face"]
examiner = ["c_face", "par_face", "book", "ball"]
socialbid = ["social__bid"]

socialbid_ = []
child_ = []
examiner_ = []
aggregate_ = []
info_ = []
duration_ = []

def initialize():
	global child_
	global examiner_
	global aggregate_
	global info_
	global duration_
	global socialbid_
	
	child_ = []
	examiner_ = []
	aggregate_ = []
	info_= []
	duration_ = []
	socialbid_ = []
	
def fillArray(val, start, end, tier_id):

	d = dict()
	d["start"] = start
	d["end"] = end
	d["val"] = val

	if tier_id == "gaze_dir_c":
		d["val"] = "child_" + val
		child_.append(json.dumps(d))
		aggregate_.append(json.dumps(d))
	if tier_id == "gaze_dir_e":
		d["val"] = "examiner_" + val
		examiner_.append(json.dumps(d))
		aggregate_.append(json.dumps(d))

def saveJson( filename ):

	jsonFile = open(filename.split('.')[0] + ".json", "w")
	jsonFile.write(
		"{" + "\"info\"" + ":" + "[" + ','.join(info_) + "]" + ","
		"\"duration\"" + ":" + "[" + ','.join(duration_) + "]" + ","
		"\"child\"" + ":" + "[" + ','.join(child_) + "]" + ","
		"\"examiner\"" + ":" + "[" + ','.join(examiner_) + "]" + ","
		"\"aggregate\"" + ":" + "[" + ','.join(aggregate_) + "]" + "}"
	)
	jsonFile.close()


def main():
	for file_ in os.listdir("."):
	    if file_.endswith(".eaf"):
			initialize()
			elan = BeautifulSoup(open(file_), "xml")
			tm = dict()
			first = sys.maxint
			last = 0

			global info_
			d = dict()
			info = elan.HEADER.find("MEDIA_DESCRIPTOR")
			d["origin"] = round(int(info["TIME_ORIGIN"])/1000, 1)
			#d["filename"] = info["RELATIVE_MEDIA_URL"].split("/")[-1]
			d["child"] = file_.split("_")[0]
			info_.append(json.dumps(d))

			for timeMapping in elan.TIME_ORDER.find_all("TIME_SLOT"):
				time = round(int(timeMapping["TIME_VALUE"])/1000, 1)
				tm[timeMapping["TIME_SLOT_ID"]] = time

				if time > last:
					last = time
				if time < first:
					first = time

			for tier in elan.find_all("TIER"):
				tier_id = tier["TIER_ID"]

				for annotation in tier.find_all("ANNOTATION"):
					start = tm[annotation.find("ALIGNABLE_ANNOTATION")["TIME_SLOT_REF1"]]
					end = tm[annotation.find("ALIGNABLE_ANNOTATION")["TIME_SLOT_REF2"]]
					val = annotation.find("ANNOTATION_VALUE").string
					fillArray(val, start, end, tier_id)

			global duration_
			d = dict()
			d["start"] = first
			d["end"] = last
			duration_.append(json.dumps(d))
			saveJson(file_)



if  __name__ =='__main__':
    main()






