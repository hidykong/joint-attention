var margin = {top: 20, right: 80, bottom: 30, left: 45},
    width = 1000 - margin.left - margin.right,
    height = 2500 - margin.top - margin.bottom;

var header = [
    {"name":"OBJECT","group":1, "color" : "#56A2D7", "x": 120, "y": 20},
    {"name":"EXAMINER","group":2, "color" : "#FDC40F", "x": 240, "y": 20},
    {"name":"CHILD","group":3, "color" : "#C74342", "x": 360, "y": 20},
    {"name":"OBJECT","group":4, "color" : "#56A2D7", "x": 460, "y": 20}
  ];
var childNo = "54";
var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);
var yMargin = 50;

var color = d3.scale.category10();
var lineHeight = 8;

var svg = d3.select("body").append("svg")
      .attr("width", "70%")
      .attr("height", height + margin.top + margin.bottom)
      .style("margin-left", "15%");

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

svgWidth = parseInt(svg.style("width").replace("px", ""));
gap1 = svgWidth * 0.05;
gap2 = svgWidth * 0.15; //wider gaps
lineMargin = parseInt(gap2 * 0.05);
barWidth = svgWidth * 0.11;

lineX2 = barWidth + gap2 - lineMargin;


header[0]["x"] = gap1 + (barWidth/2);
header[1]["x"] = gap1 + (3/2 * barWidth) + gap2;
header[2]["x"] = gap1 + (5/2 * barWidth) + 2 * gap2;
header[3]["x"] = gap1 + (7/2 * barWidth) + 3 * gap2;

//rect for the labels
var labels = svg.append("g");
  labels.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", "100%")
    .attr("height", 50)
    .attr("fill", "black")
    .attr("id", "rectLabel");

  labels.selectAll(".text")
    .data(header)
    .enter().append("text")
    .attr("class", "text")
      .attr("dx", function(d){return d.x;})
      .attr("dy", function(d){return d.y;})
      .text(function(d){ return d.name })
      .style("fill", function(d){ return d.color})
      .style("font-weight", "bold")
      .style("font-size", "10pt")
      .style("text-anchor", "middle"); 

//exObject
var group = svg.append("g")
    .attr("transform", "translate(" + gap1 + ", 0)"); 
//ex    
var group2 = svg.append("g")
    .attr("transform", "translate(" + (gap1 + barWidth + gap2) + ", 0)"); 

//ch
var group3 = svg.append("g")
    .attr("transform", "translate(" + (gap1 + 2 * barWidth + 2 * gap2) + ", 0)"); 

//chObject
var group4 = svg.append("g")
    .attr("transform", "translate(" + (gap1 + 3 * barWidth + 3 * gap2) + ", 0)"); 


d3.json("test-modified-" + childNo + ".json", function(error, data) {

  var realStart = data.duration[0].start;
  var realEnd = data.duration[0].end;
  var duration = parseInt(realEnd - realStart);

  var outline = svg.append("g")
    .attr("class", "outline");

  var newRect = outline.append("rect")
    .attr("x", 0)
    .attr("y", yMargin)
    .attr("width", "100%")
    .attr("height", duration * lineHeight)
    .attr("fill", "transparent")
    .attr("stroke-width", 1)
    .attr("stroke", "white")
    .attr("id", "rectLabel");


  for (i = 0; i < duration; i = i + 5){
    var thinLine = outline.append("line")
      .attr("x1", 0)
      .attr("y1", i * lineHeight + yMargin)
      .attr("x2", "100%")
      .attr("y2", i * lineHeight + yMargin)
      .attr("stroke-width", 0.5)
      .attr("stroke-dasharray", "6, 3")
      .attr("stroke", "white")
      .attr("opacity", 0.5)
      ;
  }

    var gaze = group.selectAll("gaze")
      .data(data.examiner)
      .enter().append("g")
          .attr("class", "gaze");

    var eObject = gaze.append("rect")
        .attr("class", "examiner-object")
        .attr("x", 0)
        .attr("y", function(d){return (d.start ) * lineHeight + yMargin;}) //starting y = normalized position
        .attr("width", barWidth)
        .attr("height", function(d){ return (d.end - d.start) * lineHeight;})
        .attr("fill", "#56A2D7");

    var eObjectLine = gaze.append("line")
        .attr("x1", barWidth + lineMargin)
        .attr("y1", function(d){return arrowY(d);})
        .attr("x2", lineX2)
        .attr("y2", function(d){return arrowY(d);})
        .attr("stroke-width", 2)
        .attr("stroke", "#FDC40F");

    var eObjectCircle = gaze.append("circle")
       .attr("cx", barWidth + lineMargin)
       .attr("cy", function(d){return arrowY(d);} )
       .attr("r", 4)
       .style("fill", "#FDC40F");

    normalObject(eObject);
    normalObject(eObjectLine);
    normalObject(eObjectCircle);  

    var gaze2 = group2.selectAll("gaze")
      .data(data.examiner)
      .enter().append("g")
          .attr("class", "examiner");

    var exBar = gaze2.append("rect")
        .attr("class", "rect-gaze")
        .attr("x", 0)
        .attr("y", function(d){return d.start * lineHeight + yMargin;}) //starting y = normalized position
        .attr("width", barWidth)
        .attr("height", function(d){ return (d.end - d.start) * lineHeight;})

        //.attr("stroke", "white")
        //.attr("stroke-width", function(d){ if(d.joint){return "1"} else return "0";})
        .attr("fill", "#FDC40F");

    //examiner-child
    var ecLine = gaze2.append("line")
        .attr("x1", barWidth + lineMargin)
        .attr("y1", function(d){return arrowY(d);})
        .attr("x2", lineX2)
        .attr("y2", function(d){return arrowY(d);})
        .attr("stroke-width", 2)
        .attr("stroke", "#FDC40F");
        //.attr("stroke-dasharray", "6, 3");

    var ecCircle = gaze2.append("circle")
      .attr("cx", lineX2)
       .attr("cy", function(d){return arrowY(d);} )
       .attr("r", 4)
       .style("fill", "#FDC40F");

      normalCE(ecLine);
      normalCE(ecCircle);

     var gaze3 = group3.selectAll("gaze")
      .data(data.child)
      .enter().append("g")
          .attr("class", "child");

    var childBar = gaze3.append("rect")
        .attr("class", "rect-gaze")
        .attr("x", 0)
        .attr("y", function(d){return (d.start ) * lineHeight + yMargin;}) //starting y = normalized position
        .attr("width", barWidth)
        .attr("height", function(d){ return (d.end - d.start) * lineHeight;})
        .attr("fill",  "#C74342");
        //.attr("stroke", "white")
        //.attr("stroke-width", function(d){ if(d.joint){return "2"} else return "0";});

     //child-examiner
    var ceLine = gaze3.append("line")
        .attr("x1", -gap2 + lineMargin)
        .attr("y1", function(d){return arrowY(d);})
        .attr("x2", -lineMargin - 5)
        .attr("y2", function(d){return arrowY(d);})
        .attr("stroke-width", 2)
        .attr("stroke", "#C74342");

    var ceCircle = gaze3.append("circle")
      .attr("cx", "-14%")
       .attr("cy", function(d){return arrowY(d);} )
       .attr("r", 4)
       .style("fill", "#C74342");

    normalCERect(childBar);
    normalCERect(exBar);
    normalCE(ceLine);
    normalCE(ceCircle);

     //child-object
    var cObjectLine = gaze3.append("line")
        .attr("x1", barWidth + lineMargin)
        .attr("y1", function(d){return arrowY(d);})
        .attr("x2", lineX2)
        .attr("y2", function(d){return arrowY(d);})
        .attr("stroke-width", 2)
        .attr("stroke", "#C74342");

    var cObjectCircle = gaze3.append("circle")
      .attr("cx", lineX2)
       .attr("cy", function(d){return arrowY(d);} )
       .attr("r", 5)
       .style("fill", "#C74342");

     //child-object
     var gaze4 = group4.selectAll("gaze")
      .data(data.child)
      .enter().append("g")
          .attr("class", "child-object");

    var cObject = gaze4.append("rect")
        .attr("class", "rect-gaze")
        .attr("x", 0)
        .attr("y", function(d){return (d.start) * lineHeight + yMargin;}) //starting y = normalized position
        .attr("width", barWidth)
        .attr("height", function(d){ return (d.end - d.start) * lineHeight;})
        .attr("fill", "#56A2D7");


    normalObject(cObject);
    normalObject(cObjectLine);
    normalObject(cObjectCircle);


    list1 = [childBar, exBar, ecCircle, ecLine, ceCircle, ceLine];

    list2 = [cObject, cObjectLine, cObjectCircle, eObject, eObjectLine, eObjectCircle];
  //use slider as a player
  d3.select("#eye").on('change', function(d) {
   
    for (i=0; i< list1.length; i++){
      selectEye(list1[i]);
    }

    for (i=0; i< list2.length; i++){
      selectEyeObject(list2[i]);
    }           

  }); //end of eye

  d3.select("#object").on('change', function(d) {
    //console.log(this.value);
    for (i=0; i< list1.length; i++){
      selectObject(list1[i]);
    }      

    for (i=0; i< list2.length; i++){
      selectObject(list2[i]);
    }          

  });

  d3.select("#normal").on('change', function(d) {

    normalCERect(childBar);
    normalCERect(exBar);

    normalCE(ecCircle);
    normalCE(ecLine);
    normalCE(ceCircle);
    normalCE(ceLine);
    for (i=0; i< list2.length; i++){
      normalObject(list2[i]);
    }          

  }); //end of eye

});
