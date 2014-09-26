


var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = 1000 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();


d3.select("body").append("p").text("visualization");

  var svg = d3.select("body").append("svg")
      .attr("width", "70%")
      .attr("height", height + margin.top + margin.bottom)
      .style("margin-left", "15%");

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  var group = svg.append("g")
      .attr("transform", "translate(" + margin.left + ", 0)");
  var group2 = svg.append("g")
      .attr("transform", "translate(" + (margin.left * 7) + ", 0)");

    d3.json("test.json", function(error, data) {

      //x.domain([data.duration.start, data.duration.end]);
      var realStart = data.duration[0].start;
      var realEnd = data.duration[0].end;
      var duration = parseInt(realEnd - realStart);
      var lineHeight = 5;

      var outline = svg.append("g")
        .attr("class", "outline");

      console.log("hello" + duration);
      var newRect = outline.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", "100%")
        .attr("height", duration * lineHeight)
        .attr("fill", "transparent")
        .attr("stroke-width", 1)
        .attr("stroke", "white")
        .attr("id", "rectLabel");


      for (i = 0; i < duration; i = i + 5){
        var thinLine = outline.append("line")
          .attr("x1", 0)
          .attr("y1", i * lineHeight)
          .attr("x2", "100%")
          .attr("y2", i * lineHeight)
          .attr("stroke-width", 0.5)
          .attr("stroke", "white")
          ;
      }

      var gaze = group.selectAll("gaze")
        .data(data.stages)
        .enter().append("g")
            .attr("class", "gaze");

        gaze.append("rect")
          .attr("class", "rect-gaze")
          .attr("x", 0)
          .attr("y", function(d){return (d.start - realStart) * lineHeight ;}) //starting y = normalized position
          .attr("width", "10%")
          .attr("height", function(d){ return (d.end - d.start) * lineHeight;})
          .attr("fill", "#F16F1B");

        gaze.append("line")
          .attr("x1", "10.5%")
          .attr("y1", function(d){return (d.start - realStart + (d.end - d.start)/2) * lineHeight ;})
          .attr("x2", "20%")
          .attr("y2", function(d){return (d.start - realStart + (d.end - d.start)/2) * lineHeight ;})
          .attr("stroke-width", 2)
          .attr("stroke", "white")
          .attr("opacity", function(d){
            if (d.val.indexOf("ex") > -1) {return 0}
            else if (d.val.indexOf("ball") > -1) {return 1} // <== Right here
            else { return 0};
          });

        gaze.append("circle")
        .attr("cx", "20%")
         .attr("cy", function(d){return (d.start - realStart + (d.end - d.start)/2) * lineHeight ;} )
         .attr("r", 4)
         .style("fill", "white")
         .attr("opacity", function(d){
            if (d.val.indexOf("ex") > -1) {return 0}
            else if (d.val.indexOf("ball") > -1) {return 1} // <== Right here
            else { return 0};
          });

         var gaze2 = group2.selectAll("gaze")
        .data(data.stages)
        .enter().append("g")
            .attr("class", "gaze");

        gaze2.append("rect")
          .attr("class", "rect-gaze")
          .attr("x", 0)
          .attr("y", function(d){return (d.start - realStart) * lineHeight ;}) //starting y = normalized position
          .attr("width", "10%")
          .attr("height", function(d){ return (d.end - d.start) * lineHeight;})
          .attr("fill", "#AECF31")
          .attr("opacity", function(d){
            if (d.val.indexOf("ex") > -1) {return 1}
            else if (d.val.indexOf("ball") > -1) {return 0.8} // <== Right here
            else { return 0.5};
          });

    });
