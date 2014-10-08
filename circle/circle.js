var width = 960,
    height = 400;
var color = ["#6797C6", "#6797C6", "F78A3C", "F6749E"];
var sliderWidth = 500;
var graphHeight = 350;


//for curved lines
var radius = 100,
    padding = 10,
    radians = 1 * Math.PI;

var dimension = (2 * radius) + (2 * padding),
    points = 50;

var topHalf = d3.scale.linear()
    .domain([0, points-1])
    .range([-radians/2, radians/2]);

//bottom circle
var bottomHalf = d3.scale.linear()
    .domain([0, points-1])
    .range([radians/2, radians * 3/2]);    

var line = d3.svg.line.radial()
    .interpolate("basis")
    .tension(0)
    .radius(radius)
    .angle(function(d, i) { return topHalf(i); });

var line2 = d3.svg.line.radial()
    .interpolate("basis")
    .tension(0)
    .radius(radius)
    .angle(function(d, i) { return bottomHalf(i); });  


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

svg.append("path").datum(d3.range(points))
    .attr("class", "line")
    .attr("d", line)
    .attr("transform", "translate( 200, 170)");

svg.append("path").datum(d3.range(points))
    .attr("class", "line")
    .attr("d", line2)
    .attr("transform", "translate( 400, 220)");


});


