import json


def getArr( ticks, inputArray ):

	outputArray = [0]*ticks

	# c[0] is index c[1] is length
	for c in inputArray:
		index = int(c[0])
		duration = int(c[1]*10)

		if duration % 2 == 0: # even
			halfpoint = duration / 2 
		else:
			halfpoint = (duration + 1) / 2

		for i in xrange(duration):
			if i <= halfpoint:
				width = i
				if width > 10:
					width = 10
			else: # i > halfpoint
				width = duration - i
				if width > 10:
					width = 10
			outputArray[index + i] = round(width,2)

	outputArray = [x + 1 for x in outputArray]
	return outputArray

def main():
	json_data = open ('RA024_complete_edited.json')
	data = json.load(json_data)
	json_data.close()

	start = data["duration"][0]["start"]
	end = data["duration"][0]["end"]

	examiner = data["examiner"] # examiner to child + objext
	blue = data["blue"] # child to examiner
	dashes = data["dashes"] # child to object

	childToExaminer = []
	childToObject = []
	examinerToChild = []
	examinerToObject = []

	for b in blue:
		# ( start, duration )
		childToExaminer.append( ( (b["start"] - start) * 10, round( b["end"] - b["start"], 2 )))
		
	for e in examiner:
		if e["val"] == "c_face":
			examinerToChild.append( ( (e["start"] - start) * 10, round( e["end"] - e["start"], 2 )))
		
		if e["val"] == "gaze_book" or e["val"] == "book" :
			examinerToObject.append( ( (e["start"] - start) * 10, round( e["end"] - e["start"], 2 )))
		
	for d in dashes:
		if d["val"] == "gaze_ball":
			childToObject.append( ( (d["start"] - start) * 10, round(d["end"] - d["start"], 2 )))
		
		if d["val"] == "gaze_book":
			childToObject.append( ( (d["start"] - start) * 10, round(d["end"] - d["start"], 2 )))	

	ticks = int( ( end - start ) * 10)  # seconds * 10
	childToExaminerArr = getArr( ticks, childToExaminer)
	childToObjectArr = getArr( ticks, childToObject)
	examinerToChildArr = getArr( ticks, examinerToChild)
	examinerToObjectArr = getArr( ticks, examinerToObject)

	objectColor = [0]*ticks
	eyeContactColor = [0]*ticks

	for i in xrange( ticks ):
		if childToExaminerArr[i] > 1 and examinerToChildArr > 1:
			eyeContactColor[i] = 1
		if childToObjectArr[i] > 1 and examinerToObjectArr[i] > 1:
			objectColor[i] = 1


	print eyeContactColor


if  __name__ =='__main__':
    main()




