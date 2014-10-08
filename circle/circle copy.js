
var width = 960,
    height = 300;
var color = ["#6797C6", "#6797C6", "F78A3C", "F6749E"];
var sliderWidth = 500;
var graphHeight = 75;

var force = d3.layout.force()
    .charge(0)
    .chargeDistance(0)
    .linkDistance(30)
    .friction(0)
    .size([width, height]);

//for curved lines
var radius = 100,
    padding = 10,
    radians = 0.5 * Math.PI;

var dimension = (2 * radius) + (2 * padding),
    points = 50;

var angle = d3.scale.linear()
    .domain([0, points-1])
    .range([-radians, radians]);

//bottom circle
var angle2 = d3.scale.linear()
    .domain([points-1, 0])
    .range([radians/2, radians * 3/2]);    

var line = d3.svg.line.radial()
    .interpolate("basis")
    .tension(0)
    .radius(radius)
    .angle(function(d, i) { return angle(i); });  

//start code
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("data.json", function(error, graph) {
	  force
	      .nodes(graph.nodes)
	      .links(graph.links)
	      .start();

		var svg2 = d3.select("body").select("#overview")
		  	.append("svg")
		    .attr("width", sliderWidth)
		    .attr("height", graphHeight);


		var ec = 0; //eye contact
		var x = 0;
		var arrayLength = graph.links[0].sequence.length;

		for (i in graph.links[0].sequence){
			ec = graph.links[0].sequence[i];
			lineColor = graph.links[0].color[i];
			x = (i * sliderWidth)/ arrayLength; //calculate the position of the line
			
			svg2.append("path").datum(d3.range(points))
			    .attr("class", "line")
			    .attr("d", line)
			    .attr("transform", "translate(" + (radius + padding) + ", " + (radius + padding) + ")");
			        
		}


	  var link = svg.selectAll(".link")
	      .data(graph.links)
	      .enter().append("line")
	      .attr("class", "link")
	      .style("stroke-width", function(d) { return Math.sqrt(d.value); });

	  var node = svg.selectAll(".node")
	      .data(graph.nodes)
	    .enter().append("circle")
	      .attr("class", "node")
	      .attr("r", 20)
	      .style("fill", function(d) { return color[d.group]; });

	svg.selectAll(".text")
		.data(graph.nodes)
		.enter().append("text")
		.attr("class", "text")
      .attr("dx", function(d){return d.x - 20;})
      .attr("dy", function(d){return d.y - 25;})
      .text(function(d) { return d.name });		     

	  //set the length of the slider to the length of the array
	  d3.select("#slider")[0][0].max = arrayLength;
	  d3.select("#slider")[0][0].style = "width: " + sliderWidth;


	  tick = 0
	  prev = 0
	  force.on("tick", function() {

	  	var d = new Date();
		var n = d.getTime();
		
		var digits = n.toString().slice(-3).slice(0,1)

	    link.attr("x1", function(d) { return d.source.x; })
	        .attr("y1", function(d) { return d.source.y; })
	        .attr("x2", function(d) { return d.target.x; })
	        .attr("y2", function(d) { return d.target.y; })
	        .style("stroke", function(d) 
	        	{  
	        		if (d.color[tick] == 1)
	        			return "red";
	        		else
	        			return "#999";

	        	} )
	        .style("stroke-width", function(d) { return d.sequence[tick]; } );

	    node.attr("cx", function(d) { return d.x; })
	        .attr("cy", function(d) { return d.y; });

	  var timer = d3.select("body").select("#timer")
	      .attr("class", "timer")
	      .text("Time passed: " + tick);

	  document.getElementById("start").onclick = function() { force.resume(); };
	  document.getElementById("stop").onclick = function() { force.stop(); };

	  //use slider as a player
	  d3.select("#slider").on('change', function(d) {
	  	force.stop();
	  	console.log(this.value);
	  	console.log(tick);
	  	tick = parseInt(this.value);
	  	force.resume();
		});

	    // svg.selectAll(".link").style("stroke-width", function(d) {return d.sequence[0] })
	    force.resume()
	    if (digits != prev){
	    	tick += 1;
	    	prev = digits;
	    	d3.select("#slider")[0][0].value = tick;	    	
	    }

	  });
});
