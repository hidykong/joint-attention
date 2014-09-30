


var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = 1000 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();
var lineHeight = 5;

function arrowY(d){
  return (d.start + (d.end - d.start)/2) * lineHeight;
}

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
    .attr("transform", "translate(" + (margin.left * 6) + ", 0)"); 

var group3 = svg.append("g")
    .attr("transform", "translate(" + (margin.left * 11) + ", 0)"); 

var group4 = svg.append("g")
    .attr("transform", "translate(" + (margin.left * 16.5) + ", 0)"); 


    d3.json("test-modified.json", function(error, data) {

      //x.domain([data.duration.start, data.duration.end]);
      var realStart = data.duration[0].start;
      var realEnd = data.duration[0].end;
      var duration = parseInt(realEnd - realStart);

      var outline = svg.append("g")
        .attr("class", "outline");

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
        .data(data.examiner)
        .enter().append("g")
            .attr("class", "gaze");

        gaze.append("rect")
          .attr("class", "examiner-object")
          .attr("x", 0)
          .attr("y", function(d){return (d.start ) * lineHeight ;}) //starting y = normalized position
          .attr("width", "10%")
          .attr("height", function(d){ return (d.end - d.start) * lineHeight;})
          .attr("fill", "#AECF31")
          .attr("opacity", function(d){
            if (d.val.indexOf("hat") > -1) {return 1} 
            else if (d.val.indexOf("ball") > -1) {return 1} 
            else if (d.val.indexOf("gaze_book") > -1) {return 1} 
            else { return 0.5};
          });

        gaze.append("line")
          .attr("x1", "11%")
          .attr("y1", function(d){return arrowY(d);})
          .attr("x2", "24%")
          .attr("y2", function(d){return arrowY(d);})
          .attr("stroke-width", 2)
          .attr("stroke", "white")
          .attr("opacity", function(d){
            if (d.val.indexOf("ex") > -1) {return 0}  
            else if (d.val.indexOf("gaze_book") > -1) {return 1} // <== Right here 
            else { return 0};
          });

        gaze.append("circle")
         .attr("cx", "11%")
         .attr("cy", function(d){return arrowY(d);} )
         .attr("r", 4)
         .style("fill", "white")
         .attr("opacity", function(d){
            if (d.val.indexOf("ex") > -1) {return 0}  
            else if (d.val.indexOf("gaze_book") > -1) {return 1} // <== Right here 
            else { return 0};
          });

         var gaze2 = group2.selectAll("gaze")
        .data(data.examiner)
        .enter().append("g")
            .attr("class", "examiner");

        gaze2.append("rect")
          .attr("class", "rect-gaze")
          .attr("x", 0)
          .attr("y", function(d){return d.start * lineHeight ;}) //starting y = normalized position
          .attr("width", "10%")
          .attr("height", function(d){ return (d.end - d.start) * lineHeight;})
          .attr("fill", function(d){ if(d.joint){return "#FFE043"} else return "#45A9C8";})

          .attr("opacity", function(d){
            if (d.val.indexOf("c_") > -1) { return 1}  
            else if (d.val.indexOf("hat") > -1) {return 1} 
            else if (d.val.indexOf("ball") > -1) {return 1} 
            else if (d.val.indexOf("book") > -1) {return 1} 
            else { return 0.5};
          });

        //examiner-child
        gaze2.append("line")
          .attr("x1", "11%")
          .attr("y1", function(d){return arrowY(d);})
          .attr("x2", "23%")
          .attr("y2", function(d){return arrowY(d);})
          .attr("stroke-width", 2)
          .attr("stroke", "white")
          .attr("stroke-dasharray", "6, 3")
          .attr("opacity", function(d){
            if (d.val.indexOf("c_") > -1) {return 1} // <== Right here
            else { return 0};
          });

        gaze2.append("circle")
        .attr("cx", "23%")
         .attr("cy", function(d){return arrowY(d);} )
         .attr("r", 4)
         .style("fill", "white")
         .attr("opacity", function(d){
            if (d.val.indexOf("c_") > -1) {return 1} // <== Right here
            else { return 0};
          });

       var gaze3 = group3.selectAll("gaze")
        .data(data.child)
        .enter().append("g")
            .attr("class", "child");

        gaze3.append("rect")
          .attr("class", "rect-gaze")
          .attr("x", 0)
          .attr("y", function(d){return (d.start ) * lineHeight ;}) //starting y = normalized position
          .attr("width", "10%")
          .attr("height", function(d){ return (d.end - d.start) * lineHeight;})
          .attr("fill", function(d){if(d.joint){return "#FFE043"} else return "#F16F1B";})
          .attr("opacity", function(d){
            if (d.val.indexOf("ex") > -1) { return 1}  
            else if (d.val.indexOf("hat") > -1) {return 1} 
            else if (d.val.indexOf("ball") > -1) {return 1} 
            else if (d.val.indexOf("book") > -1) {return 1} 
            else { return 0.5};
          }); 

       //child-examiner
        gaze3.append("line")
          .attr("x1", "-14%")
          .attr("y1", function(d){return arrowY(d);})
          .attr("x2", "-2%")
          .attr("y2", function(d){return arrowY(d);})
          .attr("stroke-width", 2)
          .attr("stroke", "#F16F1B")
          .attr("opacity", function(d){
            if (d.val.indexOf("ex") > -1) {return 1}
            else { return 0};
          });

        gaze3.append("circle")
        .attr("cx", "-14%")
         .attr("cy", function(d){return arrowY(d);} )
         .attr("r", 4)
         .style("fill", "#F16F1B")
         .attr("opacity", function(d){
            if (d.val.indexOf("ex") > -1) {return 1}
            else if (d.val.indexOf("c_") > -1) {return 0} // <== Right here
            else { return 0};
          });

       //child-object
        gaze3.append("line")
          .attr("x1", "11%")
          .attr("y1", function(d){return arrowY(d);})
          .attr("x2", "26%")
          .attr("y2", function(d){return arrowY(d);})
          .attr("stroke-width", 2)
          .attr("stroke", "#F16F1B")
          .attr("opacity", function(d){
            if (d.val.indexOf("hat") > -1) {return 1}
            else if (d.val.indexOf("ball") > -1) {return 1}
            else if (d.val.indexOf("book") > -1) {return 1}
            else { return 0};
          });

        gaze3.append("circle")
        .attr("cx", "26%")
         .attr("cy", function(d){return arrowY(d);} )
         .attr("r", 5)
         .style("fill", "#F16F1B")
         .attr("opacity", function(d){
            if (d.val.indexOf("hat") > -1) {return 1}
            else if (d.val.indexOf("ball") > -1) {return 1}
            else if (d.val.indexOf("book") > -1) {return 1}
            else { return 0};
          });

       //child-object
       var gaze4 = group4.selectAll("gaze")
        .data(data.child)
        .enter().append("g")
            .attr("class", "child-object");

        gaze4.append("rect")
          .attr("class", "rect-gaze")
          .attr("x", 0)
          .attr("y", function(d){return (d.start) * lineHeight ;}) //starting y = normalized position
          .attr("width", "10%")
          .attr("height", function(d){ return (d.end - d.start) * lineHeight;})
          .attr("fill", "#AECF31")

         .attr("opacity", function(d){
            if (d.val.indexOf("hat") > -1) {return 1} 
            else if (d.val.indexOf("ball") > -1) {return 1} 
            else if (d.val.indexOf("book") > -1) {return 1} 
            else { return 0.5};
          }); 

    });
