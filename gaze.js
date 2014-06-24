var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = 700 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();    

var line = d3.svg.line()
    //.interpolate("basis") //interpolate for smoother curves
    .x(function(d) { return x(d.start); })
    .y(function(d) { return y(d.end); });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); 

d3.json("sample1.json", function(error, data) {

  	x.domain([data.duration.start, data.duration.end]);

	var gaze = svg.selectAll("gaze")
		.data(data.stages)
		.enter().append("g")
      	.attr("class", "gaze");

    gaze.append("circle")
      .attr("class", "circle")
      //.attr("d", function(d) { return line(d); })
      //.style("stroke", function(d) { return color(d.val); })
                       .attr("cx", function(d){ return (d.start* 1.5) - 200;})
                       .attr("cy", 40 )
                       .attr("r", function(d){ return (d.end - d.start);})
                       .style("fill", "red");


    });
 