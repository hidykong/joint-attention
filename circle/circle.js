var width = 600,
    height = 500;

	middleLine = height /2; //the middle line
	radius = 20;

	y = middleLine - radius;
	y2 = middleLine + radius;

	exX = 100;
	obX = 300;
	chX = 500;



var childNo = "54";
var childNo2 = "43";

var color = ["#6797C6", "#6797C6", "#F78A3C", "#F6749E"];
var sliderWidth = 500;
var graphHeight = 450;
var timer_ret_val = false;
var timer_ret_val2 = false;

var interaction = [{"exObj":14 ,"chObj":29, "exCh": 15, "chEx": 9}];

//start code
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var svg2 = d3.select("body").append("svg")
    .attr("width", width - 50)
    .attr("height", height);

var timer = d3.select("#timer")
  .attr("class", "timer")
  .attr("color", "red")
  .append("circle")
  .text("Time passed: " + 0);

/*
drawCircle(svg, "24");

drawCircle(svg2, "52");

function drawCircle (svg, childNo){
	*/
//for nodes
d3.json("test-2.json", function(graph){
	middleLine = height /2; //the middle line
	radius = 20;

	var node = svg.selectAll(".node")
	      .data(graph.nodes)
	    .enter().append("circle")
	      .attr("class", "node")
	      .attr("r", radius)
	      .style("fill", function(d) { return color[d.group]; })
	      .attr("cx", function(d) { return d.x; })
	        .attr("cy", middleLine);

	svg.selectAll(".text")
		.data(graph.nodes)
		.enter().append("text")
		.attr("class", "text")
      .attr("dx", function(d){return d.x - 10;})
      .attr("dy", middleLine+ 5)
      .attr("fill", "#F7F6F5")
      .text(function(d) { return d.name });	


      	var node = svg2.selectAll(".node")
	      .data(graph.nodes)
	    .enter().append("circle")
	      .attr("class", "node")
	      .attr("r", radius)
	      .style("fill", function(d) { return color[d.group]; })
	      .attr("cx", function(d) { return d.x; })
	        .attr("cy", middleLine);
	        
	svg2.selectAll(".text")
		.data(graph.nodes)
		.enter().append("text")
		.attr("class", "text")
      .attr("dx", function(d){return d.x - 10;})
      .attr("dy", middleLine+ 5)
      .attr("fill", "#F7F6F5")
      .text(function(d) { return d.name });	
});

	var currentChObj = 0;
	var currentChEx = 0;
	var currentExObj = 0;
	var currentExCh = 0;

	var currentGaze = 0, i=0;

d3.json("test-modified-" + childNo + ".json", function(error, graph) {
	//console.log("working on child " + childNo);
	
	sessionStart = graph.duration[0].start;
	sessionEnd = graph.duration[0].end;
	sessionDuration = parseInt(sessionEnd - sessionStart);
	
	console.log(sessionDuration);

	//number of gazes
	child = graph.child;
	examiner = graph.examiner;
	duration = child.length;

	totalChObj = interaction[0]["chObj"];
	totalChEx = interaction[0]["chEx"];
	totalExObj = interaction[0]["exObj"];
	totalExCh = interaction[0]["exCh"];


	document.getElementById("start").onclick = function() { 
		//clear screen
		timer_ret_val = false;
		currentGaze = 0, currentChObj = 0,currentChEx = 0, currentExCh = 0, currentExObj = 0;
		d3.select("body").select("svg").selectAll("path").remove();
		i = 0; 
		restart();
	};
	
	document.getElementById("stop").onclick = function() { timer_ret_val = true;};
	restart();

	function restart(){
  		// Start animation.
		d3.timer(function(elapsed) {
		    currentGaze = update(i, currentGaze);
		    timer.text("Time passed: " + i);
		    timer.text("hello");
		    i++;
		   	//console.log("current gaze ", currentGaze);
		   	if (i >= sessionDuration){timer_ret_val = true; console.log("finished")} //stop timer if we go over the session duration
		    if (currentGaze >= child.length){timer_ret_val = true; console.log("finished - gaze")}
		    return timer_ret_val;
		});
	}

	function update(i, currentGaze){
		childGaze = child[currentGaze];
		exGaze = examiner[currentGaze];
		childStart = parseInt(childGaze.start);

		if ( childStart == i){ //if this is the point where the gaze changes
			//if the child is looking at an object
			if ((childGaze.val.indexOf("ball") > -1) || (childGaze.val.indexOf("book") > -1) )
				{
				//console.log(child[currentGaze].val, currentChObj);
				//console.log(childNo);
				svg.append("path")
					.attr("d", "M" + obX + " " + y2 + " " 
						+ "C 350 " + (320 - 50/totalChObj*(totalChObj - currentChObj))+ ", 450 " + (320 - 50/totalChObj*(totalChObj - currentChObj))+ "," 
						+ chX + " " + y2 )
				    .attr("class", "chLine");
				currentChObj++;
				}
			else if (childGaze.val.indexOf("ex") > -1)
				{
				//console.log(childGaze.val, 80/totalChEx*(totalChEx - currentChEx));
				svg.append("path")
					.attr("d", "M" + exX + " " + y2 + " " 
						+ "C 150 " + (450 - 80/totalChEx*(totalChEx - currentChEx))+ ", 450 " + (450 - 80/totalChEx*(totalChEx - currentChEx))+ "," 
						+ chX + " " + y2 )
				    .attr("class", "chLine");
				    currentChEx++;
				}
			else if (exGaze.val.indexOf("c_") > -1)
			{
			svg.append("path")
				.attr("d", "M" + exX + " " + y + " " 
					+ "C 150 " + (70 - 80/totalExCh*currentExCh)+ ", 450 " + (70 - 80/totalExCh*currentExCh) + "," 
					+ chX + " " + y )
			    .attr("class", "exLine");
			    currentExCh++;
			}
			else if ((exGaze.val.indexOf("ball") > -1) || (exGaze.val.indexOf("book") > -1) )
				{
				svg.append("path")
					.attr("d", "M" + exX + " " + y + " " 
						+ "C 150 " + (150 - 50/totalExObj*currentExObj)+ ", 250 " + (150 - 50/totalExObj*currentExObj)+ "," 
						+ obX + " " + y )
				    .attr("class", "exLine");
				currentExObj++;
				};
			
			return currentGaze + 1 ;
		} else{
			//console.log("continue past ", childStart, i);
			return currentGaze;
		}

	}

});


	var currentChObj2 = 0;
	var currentChEx2 = 0;
	var currentExObj2 = 0;
	var currentExCh2 = 0;

	var currentGaze2 = 0, i2=0;

d3.json("test-modified-" + childNo2 + ".json", function(error, graph) {
	//console.log("working on child " + childNo);
	
	sessionStart2 = graph.duration[0].start;
	sessionEnd2 = graph.duration[0].end;
	sessionDuration2 = parseInt(sessionEnd2 - sessionStart2);
	
	console.log(sessionDuration2);

	//number of gazes
	child2 = graph.child;
	examiner2 = graph.examiner;
	duration2 = child.length;

	totalChObj2 = interaction[0]["chObj"];
	totalChEx2 = interaction[0]["chEx"];
	totalExObj2 = interaction[0]["exObj"];
	totalExCh2 = interaction[0]["exCh"];


	document.getElementById("start").onclick = function() { 
		//clear screen
		timer_ret_val2 = false;
		currentGaze = 0, currentChObj = 0,currentChEx = 0, currentExCh = 0, currentExObj = 0;
		d3.select("body").select("svg2").selectAll("path").remove();
		i = 0; 
		restart();
	};
	
	document.getElementById("stop").onclick = function() { timer_ret_val2 = true;};
	restart();

	function restart(){
  		// Start animation.
		d3.timer(function(elapsed) {
		    currentGaze2 = update(i2, currentGaze2);
		    timer.text("Time passed: " + i);
		    i2++;
		   	//console.log("current gaze ", currentGaze);
		   	if (i2 >= sessionDuration2){timer_ret_val2 = true; console.log("finished")} //stop timer if we go over the session duration
		    if (currentGaze2 >= child2.length){timer_ret_val2 = true; console.log("finished - gaze")}
		    return timer_ret_val2;
		});
	}

	function update(i, currentGaze){
		childGaze2 = child2[currentGaze2];
		exGaze2 = examiner2[currentGaze2];
		childStart2 = parseInt(childGaze2.start);

		if ( childStart2 == i2){ //if this is the point where the gaze changes
			//if the child is looking at an object
			if ((childGaze2.val.indexOf("ball") > -1) || (childGaze2.val.indexOf("book") > -1) )
				{
				//console.log(child[currentGaze].val, currentChObj);
				//console.log(childNo);
				svg2.append("path")
					.attr("d", "M" + obX + " " + y2 + " " 
						+ "C 350 " + (320 - 50/totalChObj2*(totalChObj2 - currentChObj2))+ ", 450 " + (320 - 50/totalChObj2*(totalChObj2 - currentChObj2))+ "," 
						+ chX + " " + y2 )
				    .attr("class", "chLine");
				currentChObj2++;
				}
			else if (childGaze2.val.indexOf("ex") > -1)
				{
				//console.log(childGaze.val, 80/totalChEx*(totalChEx - currentChEx));
				svg2.append("path")
					.attr("d", "M" + exX + " " + y2 + " " 
						+ "C 150 " + (450 - 80/totalChEx2*(totalChEx2 - currentChEx2))+ ", 450 " + (450 - 80/totalChEx2*(totalChEx2 - currentChEx2))+ "," 
						+ chX + " " + y2 )
				    .attr("class", "chLine");
				    currentChEx2++;
				}
			else if (exGaze2.val.indexOf("c_") > -1)
			{
			svg2.append("path")
				.attr("d", "M" + exX + " " + y + " " 
					+ "C 150 " + (70 - 80/totalExCh2*currentExCh2)+ ", 450 " + (70 - 80/totalExCh2*currentExCh2) + "," 
					+ chX + " " + y )
			    .attr("class", "exLine");
			    currentExCh2++;
			}
			else if ((exGaze2.val.indexOf("ball") > -1) || (exGaze2.val.indexOf("book") > -1) )
				{
				svg2.append("path")
					.attr("d", "M" + exX + " " + y + " " 
						+ "C 150 " + (150 - 50/totalExObj2*currentExObj2)+ ", 250 " + (150 - 50/totalExObj2*currentExObj2)+ "," 
						+ obX + " " + y )
				    .attr("class", "exLine");
				currentExObj2++;
				};
			
			return currentGaze2 + 1 ;
		} else{
			//console.log("continue past ", childStart, i);
			return currentGaze2;
		}

	}

});

//}

