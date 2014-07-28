import json
import math
from pprint import pprint
json_data = open ('sample.json')

data = json.load(json_data)
info = data["stages"]
time = data["duration"]
sessionStart = int(time[0]["start"] * 10)
duration = int(time[0]["end"] * 10)  - sessionStart#duration of the whole session in deciseconds
ceArray = [0] * duration #Child-Examiner array
maxLength = 0
maxWidth = 10

print duration

#determine the longest gaze
for ce in info:
	if (ce["val"] == "ex_face") and ((ce["end"] - ce["start"]) * 10) > maxLength:
		maxLength = ((ce["end"] - ce["start"]) * 10)

for ce in info:
	if (ce["val"] == "ex_face"):
		start = int(ce["start"]*10)
		end = int(ce["end"] * 10)

		gazeDuration = end - start
		halfDuration = int(math.ceil(gazeDuration / 2.0))

		#calculate the widest width of the gaze
		gazeMaxWidth = int(math.ceil(gazeDuration / (maxLength * 1.0) * maxWidth))

		#print gazeDuration, halfDuration, gazeMaxWidth, start

		for index in range (start, start + halfDuration):
			gazeIndex = index - sessionStart #adjust the index to reflect the sesion start
			localIndex = index - start #at which point in gaze we are

			#determine the width of the index
			ceArray[gazeIndex] = int(math.ceil((localIndex + 1)/ (halfDuration* 1.0/gazeMaxWidth) ))
			#replicate for the other side
			ceArray[end-sessionStart - localIndex -1] = int(math.ceil((localIndex + 1)/ (halfDuration* 1.0/gazeMaxWidth) ))


print ceArray
json_data.close()