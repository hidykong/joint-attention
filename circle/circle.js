var width = 960,
    height = 450;
var color = ["#6797C6", "#6797C6", "#F78A3C", "#F6749E"];
var sliderWidth = 500;
var graphHeight = 450;
var timer_ret_val = false;

var interaction = [{"exObj":14 ,"chObj":29, "exCh": 15, "chEx": 7}];

//start code
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var svg2 = d3.select("body").select("#overview")
  	.append("svg")
    .attr("width", sliderWidth)
    .attr("height", graphHeight);
var timer = d3.select("body").select("#timer")
  .attr("class", "timer")
  .text("Time passed: " + 0);

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
});

d3.json("test-modified-38.json", function(error, graph) {
	middleLine = height /2; //the middle line
	radius = 20;

	y = middleLine - radius;
	y2 = middleLine + radius;

	exX = 100;
	obX = 300;
	chX = 500;

	sessionStart = graph.duration[0].start;
	sessionEnd = graph.duration[0].end;
	sessionDuration = parseInt(sessionEnd - sessionStart);
	console.log(sessionDuration);

	//number of gazes
	child = graph.child;
	examiner = graph.examiner;
	duration = child.length;

	var currentChObj = 0;
	var currentChEx = 0;
	var currentExObj = 0;
	var currentExCh = 0;

	totalChObj = interaction[0]["chObj"];
	totalChEx = interaction[0]["chEx"];
	totalExObj = interaction[0]["exObj"];
	totalExCh = interaction[0]["exCh"];



	var currentGaze = 0, i=0;

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


