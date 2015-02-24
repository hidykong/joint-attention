from __future__ import division
import json
import sys
import os
from bs4 import BeautifulSoup
import xml

# 1460360
# 340000


# Child

# DIRECT

# speech
# speech_c: verbalization, vocalization
red = ["verbalization", "vocalization"]
#red = ["child_verbalization", "child_vocalization"]

# gesture
# gesture_c: reach, point, tap, head_nod, head_shake, wave, wave_away, push_away, pat_table
#		     show, clap, other
# ball_book: book_shut_c
green = ["reach", "point", "tap", "head_nod", "head_shake", "wave", "wave_away", "push_away", "pat_table", "show", "clap"]

# gaze
# gaze_dir_c: ex_face
blue = ["ex_face"]

# INDIRECT

# voc_aff_c: laugh, whine_cry
# gaze_dir_c: ball, book, ex_hands, par_face, other, unscorable
# gesture_c: other
dashes = ["laugh", "whine_cry", "ball", "book", "ex_hands", "par_face", "other"]

# off_task: c_disengage, c_away
linebreak = ["c_disengage", "c_away"]

socialbid = ["social__bid", "social_overture"]
# Examiner

# DIRECT

# speech_e: look at my ball, roll it back?, look at my book, what's next, can you turn the pag?,
#			where is the ... ?, where is the book?, it's a hat! It's on my head!
# gesture_e: reach
filled = ["look at my ball", "roll it back?", "look at my book", "what's next?", "can you turn the page?",
			"where is the ... ?", "where is the book?",  "it's a hat! It's on my head!"]

# INDIRECT

# speech_e: hello, play with new toys, let's play ball, read set go, one two three, go, gonna tickle you,
#			gonna get you, tickle tickle tickle
unfilled = ["hello", "play with new toys", "let's play ball", "ready, set, ...", "one, two, three, ...", "go!",
			"gonna tickle you", "gonna get you", "tickle tickle tickle"]

# redfilled
# speech_e: c_name, hi_c_name
redfilled = ["c_name", "hi_c_name"]

# examiner gaze
examiner = ["c_face"] #,3 "par_face", "book" ]


red_ = []
green_ = []
blue_ = []
dashes_ = []
linebreak_ = []
filled_ = []
unfilled_ = []
redfilled_ = []
rabc_ = []
duration_ = []
stages_ = []
info_ = []
examiner_ = []
socialbid_ = []

def initialize():

	global red_
	global green_
	global blue_
	global dashes_
	global linebreak_
	global filled_
	global unfilled_
	global redfilled_
	global rabc_
	global duration_
	global stages_
	global info_
	global examiner_
	global socialbid_

	red_ = []
	green_ = []
	blue_ = []
	dashes_ = []
	linebreak_ = []
	filled_ = []
	unfilled_ = []
	redfilled_ = []
	rabc_ = []
	duration_ = []
	stages_ = []
	info_ = []
	examiner_ = []
	socialbid_ = []

def fillArray(val, start, end, tier_id):

	d = dict()
	d["start"] = start
	d["end"] = end
	d["val"] = val

	if val == "RABC":
		rabc_.append(json.dumps(d))

	if tier_id == "stages":
		stages_.append(json.dumps(d))


	#special case
	if val == "other":
		if tier_id == "gesture_c":
			d["val"] = "gesture_" + val
			green_.append(json.dumps(d))
		else:
			d["val"] = "child_gaze_" + val
			dashes_.append(json.dumps(d))

	if val in socialbid:
		socialbid_.append(json.dumps(d))

	#red
	if val in red:
		d["val"] = "child_" + val
		red_.append(json.dumps(d))

	#green
	if val in green:
		d["val"] = "gesture_" + val
		green_.append(json.dumps(d))

	#blue
	if val in blue:
		d["val"] = "gaze_" + val
		blue_.append(json.dumps(d))

	#dashes
	if val in dashes:
		if tier_id == "gaze_dir_c":
			d["val"] = "gaze_" + val
			dashes_.append(json.dumps(d))
		if tier_id == "voc_aff_c":
			d["val"] = "child_" + val
			dashes_.append(json.dumps(d))

	if val in linebreak:
		linebreak_.append(json.dumps(d))

	if val in filled:
		filled_.append(json.dumps(d))

	if val in unfilled:
		unfilled_.append(json.dumps(d))

	if val in redfilled:
		redfilled_.append(json.dumps(d))

	if val in examiner:
		examiner_.append(json.dumps(d))

def saveJson( filename ):

	jsonFile = open(filename.split('.')[0] + ".json", "w")

	#f.write('This is a test\n')

	jsonFile.write(
		"{" + "\"info\"" + ":" + "[" + ','.join(info_) + "]" + ","
		"\"duration\"" + ":" + "[" + ','.join(duration_) + "]" + ","
		"\"rabc\"" + ":" + "[" + ','.join(rabc_) + "]" + ","
		"\"stages\"" + ":" + "[" + ','.join(stages_) + "]" + ","
		"\"red\"" + ":" + "[" + ','.join(red_) + "]" + ","
		"\"green\"" + ":" + "[" + ','.join(green_) + "]" + ","
		"\"blue\"" + ":" + "[" + ','.join(blue_) + "]" + ","
		"\"dashes\"" + ":" + "[" + ','.join(dashes_) + "]" + ","
		"\"linebreak\"" + ":" + "[" + ','.join(linebreak_) + "]" + ","
		"\"filled\"" + ":" + "[" + ','.join(filled_) + "]" + ","
		"\"unfilled\"" + ":" + "[" + ','.join(unfilled_) + "]" + ","
		"\"redfilled\"" + ":" + "[" + ','.join(redfilled_) + "]" + ","
		"\"examiner\"" + ":" + "[" + ','.join(examiner_) + "]" + ","
		"\"socialbid\"" + ":" + "[" + ','.join(socialbid_) + "]" + "}"
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
			d["origin"] = round(int(info["TIME_ORIGIN"])/1000, 3)
			#d["filename"] = info["RELATIVE_MEDIA_URL"].split("/")[-1]
			d["child"] = file_.split("_")[0]
			info_.append(json.dumps(d))

			for timeMapping in elan.TIME_ORDER.find_all("TIME_SLOT"):
				time = round(int(timeMapping["TIME_VALUE"])/1000, 3)
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






