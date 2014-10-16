
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

//RA024_complete_edited.json
//RA038_FU_complete_edited.json
//RA043_complete_edited.json
//RA052_complete_edited.json
//RA054_complete_edited.json***
//RA057_complete_edited.json

d3.json("RA054_complete_edited.json", function(error, data) {

  var childData = data.child;
  var examinerData = data.examiner;
  var aggregateData = data.aggregate;
  var examinerSpeech = data.filled;
  examinerSpeech.push.apply(examinerSpeech, data.unfilled);

  var joint = data.joint;
  var start = data.duration[0].start;
  var end = data.duration[0].end;
  var blue = "#6F99C2";
  var orange = "#EA9153";
  var pink = "#E686A1";
  var grey = "#BEBEBE";

  var green_ball = "#42BC8F";
  var pink_eye = "#E964A6";
  var purple_book = "#775DA8";
  var blue_hand = "#5869B1";
  var yellow_speech = "#fff24a";
  var background_color = "#fff6f7";

  testsvg.append("rect")
    .attr({
      x: 100,
      y: 5,
      width: (end - start).toFixed(2)*3,
      height: 100,
      fill: "#fff6f7",
      'fill-opacity': 1,
      'stroke-width': 0,
      'stroke-opacity': 1,
      stroke: background_color
    });

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
                    return green_ball;
                  case "child_ex_face":
                    return pink_eye ;
                  case "child_book":
                    return purple_book;
                  default:
                    return blue_hand;
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
                return green_ball;
              case "examiner_c_face":
                return pink_eye ;
              case "examiner_book":
                return purple_book;
              default:
                return blue_hand;
            }
          }
      });
    }

  // add examiner speech
  for (i = 0; i < examinerSpeech.length; i++) {
    testsvg.append("circle")
      .attr({
        cx: 100 + (examinerSpeech[i].start - start).toFixed(2)*3,
        cy: 55,
        r: ((examinerSpeech[i].end - examinerSpeech[i].start)/2).toFixed(2)*3,
        'stroke-width': 1,
        fill: yellow_speech,
        stroke: yellow_speech
      });
    }



});