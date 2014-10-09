var width = 960,
    height = 400;
var color = ["#6797C6", "#6797C6", "#F78A3C", "#F6749E"];
var sliderWidth = 500;
var graphHeight = 350;



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
	exX = 100;
	y = 180;
	obX = 300;
	chX = 500;
	y2 = 220;

	svg.append("path")
		.attr("d", "M" + exX + " " + y + " " + "C 150 150, 250 150," 
			+ obX + " " + y )
	    .attr("class", "exLine");
	
	svg.append("path")
		.attr("d", "M" + exX + " " + y + " " + "C 125 100, 275 100," 
			+ obX + " " + y )
	    .attr("class", "exLine");

	//ex-ch
	svg.append("path")
		.attr("d", "M" + exX + " " + y + " " + "C 150 20, 450 20," 
			+ chX + " " + y )
	    .attr("class", "exLine");	


//ch-obj	

	svg.append("path")
		.attr("d", "M" + obX + " " + y2 + " " 
			+ "C " + (obX + 20) + " 280, " + (chX - 20) + " 280, " 
			+ chX + " " + y2 )
	    .attr("class", "chLine");		

	svg.append("path")
		.attr("d", "M" + obX + " " + y2 + " " 
			+ "C " + (obX + 10) + " 300, " + (chX - 10) + " 300, " 
			+ chX + " " + y2 )
	    .attr("class", "chLine");	

	svg.append("path")
		.attr("d", "M" + obX + " " + y2 + " " 
			+ "C " + (obX + 20) + " 260, " + (chX - 20) + " 260, " 
			+ chX + " " + y2 )
	    .attr("class", "chLine");		    

//ch-ex
	svg.append("path")
		.attr("d", "M" + exX + " " + y2 + " " + "C 150 380, 450 380," 
			+ chX + " " + y2 )
	    .attr("class", "chLine");		   

});


