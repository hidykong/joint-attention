


var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = 1000 - margin.left - margin.right,
    height = 100 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();    


d3.json("list.json", function(error, data){
  data.filenames.forEach( function ( name ) { 
      d3.select("body").append("p").text(name);

  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

var div = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);

  var group = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); 


    d3.json("gaze/" + name, function(error, data) {

      //x.domain([data.duration.start, data.duration.end]);
      var realStart = data.duration[0].start;
      var gaze = group.selectAll("gaze")
        .data(data.stages)
        .enter().append("g")
            .attr("class", "gaze");

        gaze.append("circle")
          .attr("class", "circle")
          //.attr("d", function(d) { return line(d); })
          //.style("stroke", function(d) { return color(d.val); })
         .attr("cx", function(d){ return ((d.start - realStart) + (d.end - d.start)/2) * 2 ;})
         .attr("cy", 40 )
         .attr("r", function(d){ return  (d.end - d.start);})
         .style("fill", function(d){return color(d.val);})
         .style("opacity", 0.5)
         .on("mouseover", function(d) {      
            div.transition()        
                .duration(200)      
                .style("opacity", .9);      
            div .html(d.val + "<br/>"  + d.start+ "<br/>"  + d.end)  
                .style("left", (d3.event.pageX) + "px")     
                .style("top", (d3.event.pageY - 28) + "px");    
            })                  
        .on("mouseout", function(d) {       
            div.transition()        
                .duration(500)      
                .style("opacity", 0);   
        });

    });     

  });

});
 