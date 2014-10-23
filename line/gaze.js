var childActions = ["child_ball", "child_ex_face", "child_book", "child_ex_hands"];
var examinerActions = ["examiner_ball", "examiner_book", "examiner_c_face"];
var arr = ["RA024_complete_edited.json",
  "RA043_complete_edited.json", "RA038_FU_complete_edited.json", "RA054_complete_edited.json",
  "RA052_complete_edited.json", "RA057_complete_edited.json"];

var blue = "#6F99C2";
var orange = "#EA9153";
var pink = "#E686A1";
var grey = "#BEBEBE";

var green_ball = "#42BC8F";
var pink_eye = "#E964A6";
var purple_book = "#775DA8";
var blue_hand = "#5869B1";
var yellow_speech = "#fff24a";
var background_color = "#E5E7E5";
var line_color = "#b4b0b6";
var text_color_light = "#989399";
var text_color_dark = "#626363";

$( "#toggle" ).click( function(){

  if ( $(".audio").attr("opacity") == 1)
  {
    d3.selectAll(".audio").attr("opacity", 1).transition()
    .duration(function(d, i){ return i * 30;})
    .attr("opacity", 0);
  }
  else
  {
    d3.selectAll(".audio").attr("opacity", 0).transition()
      .duration(function(d, i){ return i * 30;})
      .attr("opacity", 1);
  }
});

function render( audio ){
  $('.visualization').empty();
  $.each( arr, function( index, val ) {

    var className = "viz_" + index.toString();
    var viz = d3.select(".visualization").append("svg")
          .attr("class", className)
          .attr("width", "100%")
          .attr("height", 200);

    d3.json( val , function(error, data) {

      var childData = data.child;
      var examinerData = data.examiner;
      var aggregateData = data.aggregate;
      var examinerSpeech = data.filled;
      var childVocal = data.red;
      examinerSpeech.push.apply(examinerSpeech, data.unfilled);

      var joint = data.joint;
      var start = data.duration[0].start;
      var end = data.duration[0].end;

      drawGrid( viz );

      for (i = 0; i < childData.length; i++) {
        viz.append("rect")
          .attr({
            x: 250 + (childData[i].start - start).toFixed(2)*3,
            y: 50,
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
        viz.append("rect")
          .attr({
            x: 250 + (examinerData[i].start - start).toFixed(2)*3,
            y: 100,
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


      // speech circles
      /*
      // add child speech
      for (i = 0; i < childVocal.length; i++) {
        viz.append("circle")
          .attr({
            cx: 250 + (childVocal[i].start - start).toFixed(2)*3,
            cy: 50,
            r: ((childVocal[i].end - childVocal[i].start)/2).toFixed(2)*3,
            'stroke-width': 1,
            fill: yellow_speech,
            stroke: yellow_speech
          });
        }

      // add examiner speech
      for (i = 0; i < examinerSpeech.length; i++) {
        viz.append("circle")
          .attr({
            cx: 250 + (examinerSpeech[i].start - start).toFixed(2)*3,
            cy: 150,
            r: ((examinerSpeech[i].end - examinerSpeech[i].start)/2).toFixed(2)*3,
            'stroke-width': 1,
            fill: yellow_speech,
            stroke: yellow_speech
          });
        }
      */

      // speech dashed lines

      // add examiner speech

      if ( audio || audio == null) {
        for (i = 0; i < examinerSpeech.length; i++) {
        viz.append("line") // bottom dashed line
          .attr({
            class: "audio",
            x1: 250 + (examinerSpeech[i].start - start).toFixed(2)*3,
            y1: 150 + 5,
            x2: 250 + (examinerSpeech[i].end - start).toFixed(2)*3,
            y2: 150 + 5,
            'stroke-dasharray': "1",
            'stroke-width': 10,
            stroke: text_color_dark,
            opacity: 1
          });
        }

        // add child speech
        for (i = 0; i < childVocal.length; i++) {
          viz.append("line") // bottom dashed line
            .attr({
              class: "audio",
              x1: 250 + (childVocal[i].start - start).toFixed(2)*3,
              y1: 50 - 5,
              x2: 250 + (childVocal[i].end - start).toFixed(2)*3,
              y2: 50 - 5,
              'stroke-dasharray': "1",
              'stroke-width': 10,
              stroke: text_color_dark,
              opacity: 1
            });
        }
      }
    });
  });
}

render();