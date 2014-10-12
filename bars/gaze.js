var margin = {top: 20, right: 80, bottom: 30, left: 45},
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

//functions for choosing which bars to show

function normalCE(element){
  element.transition().duration(function(d, i){ return i * 50;})
  .attr("opacity", function(d){
    if (d.val.indexOf("c_") > -1) {return 1} // for examiner
    else if (d.val.indexOf("ex") > -1) {return 1} //for child
    else { return 0};
  });
}

function normalCERect(element){
  element.transition().attr("opacity", function(d){
    if (d.val.indexOf("c_") > -1) { return 1} 
      else if (d.val.indexOf("ex") > -1) { return 1}  
      else if (d.val.indexOf("ball") > -1) {return 1} 
      else if (d.val.indexOf("book") > -1) {return 1} 
      else { return 0.5};
    }); 
}

function normalObject(element){
  element.transition().attr("opacity", function(d){
    if (d.val.indexOf("ball") > -1) { return 1} 
    else if (d.val.indexOf("book") > -1) {return 1} 
    else { return 0};
  });
}

function selectEye(element){
  element.transition().duration(function(d, i){ return i * 50;})
    .attr("opacity", function(d){
      if (d.eye) {return 1}
      else { return 0.1};
    }); 
}

function selectEyeObject(element){
  element.transition()
    .attr("opacity", function(d){
      if (d.val.indexOf("ball") > -1) {return 0.1} 
      else if (d.val.indexOf("book") > -1) {return 0.1} 
      else { return 0};
    }); 
}


function selectObject(element){
  element.transition()
    .attr("opacity", function(d){
      if (d.objectGaze) {return 1}
      else { return 0.1};
    }); 
}

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

console.log(lineMargin);

var group = svg.append("g")
    .attr("transform", "translate(" + gap1 + ", 0)"); 
var group2 = svg.append("g")
    .attr("transform", "translate(" + (gap1 + barWidth + gap2) + ", 0)"); 

var group3 = svg.append("g")
    .attr("transform", "translate(" + (gap1 + 2 * barWidth + 2 * gap2) + ", 0)"); 

var group4 = svg.append("g")
    .attr("transform", "translate(" + (gap1 + 3 * barWidth + 3 * gap2) + ", 0)"); 


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

      var eObject = gaze.append("rect")
          .attr("class", "examiner-object")
          .attr("x", 0)
          .attr("y", function(d){return (d.start ) * lineHeight ;}) //starting y = normalized position
          .attr("width", barWidth)
          .attr("height", function(d){ return (d.end - d.start) * lineHeight;})
          .attr("fill", "#AECF31");

      var eObjectLine = gaze.append("line")
          .attr("x1", barWidth + lineMargin)
          .attr("y1", function(d){return arrowY(d);})
          .attr("x2", lineX2)
          .attr("y2", function(d){return arrowY(d);})
          .attr("stroke-width", 2)
          .attr("stroke", "white");

      var eObjectCircle = gaze.append("circle")
         .attr("cx", barWidth + lineMargin)
         .attr("cy", function(d){return arrowY(d);} )
         .attr("r", 4)
         .style("fill", "white");

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
          .attr("y", function(d){return d.start * lineHeight ;}) //starting y = normalized position
          .attr("width", barWidth)
          .attr("height", function(d){ return (d.end - d.start) * lineHeight;})

          .attr("stroke", "white")
          .attr("stroke-width", function(d){ if(d.joint){return "2"} else return "0";})
          .attr("fill", "#45A9C8");

        //examiner-child
      var ecLine = gaze2.append("line")
          .attr("x1", barWidth + lineMargin)
          .attr("y1", function(d){return arrowY(d);})
          .attr("x2", lineX2)
          .attr("y2", function(d){return arrowY(d);})
          .attr("stroke-width", 2)
          .attr("stroke", "white")
          .attr("stroke-dasharray", "6, 3");



      var ecCircle = gaze2.append("circle")
        .attr("cx", lineX2)
         .attr("cy", function(d){return arrowY(d);} )
         .attr("r", 4)
         .style("fill", "white");

          normalCE(ecLine);
          normalCE(ecCircle);

       var gaze3 = group3.selectAll("gaze")
        .data(data.child)
        .enter().append("g")
            .attr("class", "child");

      var childBar = gaze3.append("rect")
          .attr("class", "rect-gaze")
          .attr("x", 0)
          .attr("y", function(d){return (d.start ) * lineHeight ;}) //starting y = normalized position
          .attr("width", barWidth)
          .attr("height", function(d){ return (d.end - d.start) * lineHeight;})
          .attr("fill",  "#F16F1B")


          .attr("stroke", "white")
          .attr("stroke-width", function(d){ if(d.joint){return "2"} else return "0";});

       //child-examiner
      var ceLine = gaze3.append("line")
          .attr("x1", -gap2 + lineMargin)
          .attr("y1", function(d){return arrowY(d);})
          .attr("x2", -lineMargin)
          .attr("y2", function(d){return arrowY(d);})
          .attr("stroke-width", 2)
          .attr("stroke", "#F16F1B");

      var ceCircle = gaze3.append("circle")
        .attr("cx", "-14%")
         .attr("cy", function(d){return arrowY(d);} )
         .attr("r", 4)
         .style("fill", "#F16F1B");

          normalCE(ceLine);
          normalCE(ceCircle);

       //child-object
      var cObjectLine = gaze3.append("line")
          .attr("x1", barWidth + lineMargin)
          .attr("y1", function(d){return arrowY(d);})
          .attr("x2", lineX2)
          .attr("y2", function(d){return arrowY(d);})
          .attr("stroke-width", 2)
          .attr("stroke", "#F16F1B");

      var cObjectCircle = gaze3.append("circle")
        .attr("cx", lineX2)
         .attr("cy", function(d){return arrowY(d);} )
         .attr("r", 5)
         .style("fill", "#F16F1B");

       //child-object
       var gaze4 = group4.selectAll("gaze")
        .data(data.child)
        .enter().append("g")
            .attr("class", "child-object");

      var cObject = gaze4.append("rect")
          .attr("class", "rect-gaze")
          .attr("x", 0)
          .attr("y", function(d){return (d.start) * lineHeight ;}) //starting y = normalized position
          .attr("width", barWidth)
          .attr("height", function(d){ return (d.end - d.start) * lineHeight;})
          .attr("fill", "#AECF31");

      normalObject(cObject);
      normalObject(cObjectLine);
      normalObject(cObjectCircle);

    //use slider as a player
    d3.select("#eye").on('change', function(d) {
      console.log(this.value);

      selectEye(childBar);
      selectEye(exBar);
      selectEye(ecCircle);
      selectEye(ecLine);
      selectEye(ceCircle);
      selectEye(ceLine);

      selectEyeObject(cObject);
      selectEyeObject(cObjectLine);
      selectEyeObject(cObjectCircle);

      selectEyeObject(eObject);
      selectEyeObject(eObjectLine);
      selectEyeObject(eObjectCircle);           

    }); //end of eye

    d3.select("#object").on('change', function(d) {
      console.log(this.value);

      selectObject(childBar);
      selectObject(exBar);
      selectObject(ecCircle);
      selectObject(ecLine);
      selectObject(ceCircle);
      selectObject(ceLine);

      selectObject(cObject);
      selectObject(cObjectLine);
      selectObject(cObjectCircle);

      selectObject(eObject);
      selectObject(eObjectLine);
      selectObject(eObjectCircle);           

    });

    d3.select("#normal").on('change', function(d) {
      console.log(this.value);

      normalCERect(childBar);
      normalCERect(exBar);

      normalCE(ecCircle);
      normalCE(ecLine);
      normalCE(ceCircle);
      normalCE(ceLine);

      normalObject(cObject);
      normalObject(cObjectLine);
      normalObject(cObjectCircle);

      normalObject(eObject);
      normalObject(eObjectLine);
      normalObject(eObjectCircle);           

    }); //end of eye

});
