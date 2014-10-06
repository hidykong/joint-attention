d3.select("body").append("p").text("visualization");

var childsvg = d3.select(".child").append("svg")
          .attr("width", "100%")
          .attr("height", 50);

var examinersvg = d3.select(".examiner").append("svg")
          .attr("width", "100%")
          .attr("height", 50);

var testsvg = d3.select(".test").append("svg")
          .attr("width", "100%")
          .attr("height", 110);

var childActions = ["child_ball", "child_ex_face", "child_book", "child_ex_hands"];
var examinerActions = ["examiner_ball", "examiner_book", "examiner_c_face"];

//RA038_FU_complete_edited.json
//data2.json
//RA052_complete_edited.json
d3.json("RA052_complete_edited.json", function(error, data) {

  var childData = data.child;
  var examinerData = data.examiner;
  var aggregateData = data.aggregate;
  var joint = data.joint;
  var start = data.duration[0].start;
  var end = data.duration[0].end;
  var blue = "#6F99C2";
  var orange = "#EA9153";
  var pink = "#E686A1";
  var grey = "#BEBEBE";

  for (i = 0; i < childData.length; i++) {
    testsvg.append("rect")
      .attr({
        x: 100 + (childData[i].start - start).toFixed(2)*3,
        y: 5,
        width: (childData[i].end - childData[i].start).toFixed(2)*3,
        height: 50,
        fill: function(d){
                switch ( childData[i].val ) {
                  case "child_ball":
                    return orange;
                  case "child_ex_face":
                    return blue ;
                  case "child_book":
                    return pink;
                  default:
                    return grey;
                }
          }
      });
    }

  for (i = 0; i < examinerData.length; i++) {
    testsvg.append("rect")
      .attr({
        x: 100 + (examinerData[i].start - start).toFixed(2)*3,
        y: 55,
        width: (examinerData[i].end - examinerData[i].start).toFixed(2)*3,
        height: 50,
        fill: function(d){
            switch ( examinerData[i].val ) {
              case "examiner_ball":
                return orange;
              case "examiner_c_face":
                return blue ;
              case "examiner_book":
                return pink;
              default:
                return grey;
            }
          }
      });
    }

    for (i = 0; i < joint.length; i++) {
      testsvg.append("rect")
        .attr({
          x: 100 + (joint[i].start - start).toFixed(2)*3,
          y: 0,
          width: (joint[i].end - joint[i].start).toFixed(2)*3,
          height: 110,
          fill: "white",
          'fill-opacity': 0,
          'stroke-width': 3,
          stroke: "red"
          });
    }

  childsvg.selectAll("rect")
   .data(childData)
   .enter()
   .append("rect")
   .attr({
    x: function(d){return 100 + (d.start - start).toFixed(2)*3;},
    y: 0,
    width: function(d){return (d.end - d.start).toFixed(2)*3;},
    height: 50,
    fill: function(d){
            switch ( d.val ) {
              case "child_ball":
                return orange;
              case "child_ex_face":
                return blue ;
              case "child_book":
                return pink;
              default:
                return grey;
            }
    },
   });


  childsvg.selectAll("rect")
   .data(examinerData)
   .enter()
   .append("rect")
   .attr({
    x: function(d){return 100 + (d.start - start).toFixed(2)*3;},
    y: 0,
    width: function(d){return (d.end - d.start).toFixed(2)*3;},
    height: 50,
    fill: function(d){
        switch ( d.val ) {
          case "examiner_ball":
            return orange;
          case "examiner_c_face":
            return blue ;
          case "examiner_book":
            return pink;
          default:
            return grey;
        }
    },
   });

  examinersvg.selectAll("rect")
   .data(examinerData)
   .enter()
   .append("rect")
   .attr({
    x: function(d){return 100 + (d.start - start).toFixed(2)*3;},
    y: 0,
    width: function(d){return (d.end - d.start).toFixed(2)*3;},
    height: 50,
    fill: function(d){
        switch ( d.val ) {
          case "examiner_ball":
            return orange;
          case "examiner_c_face":
            return blue ;
          case "examiner_book":
            return pink;
          default:
            return grey;
        }
    },
   });

   childsvg.append("rect")
    .attr({
      x: 100,
      y: 0,
      width: (end - start).toFixed(2)*3,
      height: 50,
      fill: "white",
      'fill-opacity': 0,
      'stroke-width': 1,
      stroke: grey
    });

   examinersvg.append("rect")
    .attr({
      x: 100,
      y: 0,
      width: (end - start).toFixed(2)*3,
      height: 50,
      fill: "white",
      'fill-opacity': 0,
      'stroke-width': 1,
      stroke: grey
    });

    testsvg.append("rect")
    .attr({
      x: 100,
      y: 5,
      width: (end - start).toFixed(2)*3,
      height: 110,
      fill: "white",
      'fill-opacity': 0,
      'stroke-width': 1,
      'stroke-opacity': 0.5,
      stroke: grey
    });

});