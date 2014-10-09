var width = 960,
    height = 400;
var color = ["#6797C6", "#6797C6", "#F78A3C", "#F6749E"];
var sliderWidth = 500;
var graphHeight = 350;


//for curved lines
var radius = 100,
    padding = 10,
    radians = 1 * Math.PI;

var dimension = (2 * radius) + (2 * padding),
    points = 50;




function topCircle(radius, angle){

	var topHalf = d3.scale.linear()
	    .domain([0, points-1])
	    .range([ 0 - angle, 0 + angle]);  

	var line = d3.svg.line.radial()
	    .interpolate("basis")
	    .tension(0)
	    .radius(radius)
	    .angle(function(d, i) { return topHalf(i); }); 
	return line;
}


function bottomCircle(radius, angle){

	var bottomHalf = d3.scale.linear()
	    .domain([0, points-1])
	    .range([radians - angle, radians + angle]);    

	var line = d3.svg.line.radial()
	    .interpolate("basis")
	    .tension(0)
	    .radius(radius)
	    .angle(function(d, i) {return bottomHalf(i); }); 
	    //.angle(-1.5); 
	return line;
}

//start code
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("test-2.json", function(error, graph) {

		var svg2 = d3.select("body").select("#overview")
		  	.append("svg")
		    .attr("width", sliderWidth)
		    .attr("height", graphHeight);


	  var node = svg.selectAll(".node")
	      .data(graph.nodes)
	    .enter().append("circle")
	      .attr("class", "node")
	      .attr("r", 20)
	      .style("fill", function(d) { return color[d.group]; })
	      .attr("cx", function(d) { return d.x; })
	        .attr("cy", function(d) { return d.y; });
	
	svg.selectAll(".text")
		.data(graph.nodes)
		.enter().append("text")
		.attr("class", "text")
      .attr("dx", function(d){return d.x - 10;})
      .attr("dy", function(d){return d.y + 5;})
      .attr("fill", "#F7F6F5")
      .text(function(d) { return d.name });	

	start = 200

//ex-obj
	radius = 100;
	svg.append("path").datum(d3.range(points))
	    .attr("class", "exLine")
	    .attr("d", topCircle(radius, radians * 3/8))
	    .attr("transform", "translate( 200, " + (start + 10) + ")");

	radius = 150;
	svg.append("path").datum(d3.range(points))
	    .attr("class", "exLine")
	    .attr("d", topCircle(radius, radians/5))
	    .attr("transform", "translate( 200, " + (start + 100) + ")");		    

//ch-obj
	radius = 100;
	svg.append("path").datum(d3.range(points))
	    .attr("class", "chLine")
	    .attr("d", bottomCircle(radius, radians * 3/8))
	    .attr("transform", "translate( 400, " + (start - 10) + ")");

	radius = 125;
	svg.append("path").datum(d3.range(points))
	    .attr("class", "chLine")
	    .attr("d", bottomCircle(radius, radians * 2/8))
	    .attr("transform", "translate( 400, " + (start - 60) + ")");

	radius = 150;	
	svg.append("path").datum(d3.range(points))
	    .attr("class", "chLine")
	    .attr("d", bottomCircle(radius, radians/5))
	    .attr("transform", "translate( 400, " + (start - 100) + ")");	

//ex-ch
	radius = 215;
	svg.append("path").datum(d3.range(points))
	    .attr("class", "exLine")
	    .attr("d", topCircle(radius, radians * 3/8))
		.attr("transform", "translate( 300, " + (start + 60) + ")");

//ch-ex
	svg.append("path").datum(d3.range(points))
	    .attr("class", "chLine")
	    .attr("d", bottomCircle(radius, radians * 3/8))
		.attr("transform", "translate( 300, " + (start - 60) + ")");
	   

});


