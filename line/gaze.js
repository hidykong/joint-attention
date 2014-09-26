
d3.select("body").append("p").text("visualization");

var childsvg = d3.select(".child").append("svg")
          .attr("width", "100%")
          .attr("height", 100);

var examinersvg = d3.select(".examiner").append("svg")
          .attr("width", "100%")
          .attr("height", 100);

var childActions = ["child_ball", "child_ex_face", "child_book"];
var examinerActions = ["examiner_ball", "examiner_book", "examiner_c_face"];


d3.json("data.json", function(error, data) {

  var childData = data.child;
  var examinerData = data.examiner;
  var aggregateData = data.aggregate;
  var start = data.duration[0].start;
  var end = data.duration[0].end;

  childsvg.selectAll("rect")
   .data(childData)
   .enter()
   .append("rect")
   .attr({
    x: function(d){return (d.start - start).toFixed(2);},
    y: 50,
    width: function(d){return (d.end - d.start).toFixed(2);},
    height: 50
   });

  examinersvg.selectAll("rect")
   .data(examinerData)
   .enter()
   .append("rect")
   .attr({
    x: function(d){return (d.start - start).toFixed(2);},
    y: 50,
    width: function(d){return (d.end - d.start).toFixed(2);},
    height: 50
   });

});
