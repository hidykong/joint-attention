var width = 960,
    height = 450;
var color = ["#6797C6", "#6797C6", "#F78A3C", "#F6749E"];
var sliderWidth = 500;
var graphHeight = 450;

var interaction = [{"exObj":14 ,"chObj":14, "exCh": 15, "chEx": 26}];

//start code
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("test-2.json", function(error, graph) {

		var svg2 = d3.select("body").select("#overview")
		  	.append("svg")
		    .attr("width", sliderWidth)
		    .attr("height", graphHeight);

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


	y = middleLine - radius;
	y2 = middleLine + radius;

	exX = 100;
	obX = 300;
	chX = 500;

	//ex-obj
	exObj = interaction[0]["exObj"];
	for (i = 0; i < exObj ; i++) { 
		svg.append("path")
			.attr("d", "M" + exX + " " + y + " " 
				+ "C 150 " + (150 - 50/exObj*i)+ ", 250 " + (150 - 50/exObj*i)+ "," 
				+ obX + " " + y )
		    .attr("class", "exLine");
	}

	//ex-ch
	exCh = interaction[0]["exCh"];
	for (i = 0; i < interaction[0]["exCh"] ; i++) { 
		svg.append("path")
			.attr("d", "M" + exX + " " + y + " " 
				+ "C 150 " + (70 - 80/exCh*i)+ ", 450 " + (70 - 80/exCh*i) + "," 
				+ chX + " " + y )
		    .attr("class", "exLine");
	}

	//ch-obj	

	chObj = interaction[0]["chObj"];
	for (i = 0; i < interaction[0]["chObj"] ; i++) { 
		svg.append("path")
			.attr("d", "M" + obX + " " + y2 + " " 
				+ "C 350 " + (320 - 50/chObj*i)+ ", 450 " + (320 - 50/chObj*i)+ "," 
				+ chX + " " + y2 )
		    .attr("class", "chLine");
	}	    

	//ch-ex
	chEx = interaction[0]["chEx"];
	for (i = 0; i < interaction[0]["chEx"] ; i++) { 
		svg.append("path")
			.attr("d", "M" + exX + " " + y2 + " " 
				+ "C 150 " + (450 - 80/chEx*i)+ ", 450 " + (450 - 80/chEx*i)+ "," 
				+ chX + " " + y2 )
		    .attr("class", "chLine");
	}    

});


