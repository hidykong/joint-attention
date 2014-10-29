function drawGrid ( viz ){

  viz.append("line") // top dashed line
        .attr({
          x1: 120,
          y1: 50,
          x2: 1200,
          y2: 50,
          'stroke-dasharray': "5, 5",
          stroke: line_color
        });
      viz.append("line") // bottom dashed line
        .attr({
          x1: 120,
          y1: 150,
          x2: 1200,
          y2: 150,
          'stroke-dasharray': "5, 5",
          stroke: line_color
        });
      viz.append("line") // back solid line
        .attr({
          x1: 1200,
          y1: 10,
          x2: 1200,
          y2: 190,
          stroke: "#737373"
        });
      viz.append("line") // front solid line
        .attr({
          x1: 200,
          y1: 10,
          x2: 200,
          y2: 190,
          stroke: line_color
        });
      viz.append("line") // middle solid line
        .attr({
          x1: 50,
          y1: 100,
          x2: 1200,
          y2: 100,
          stroke: line_color
        });

      viz.append("text").text("CHILD")
        .attr({
          x: 50,
          y: 54,
          "font-size": 10,
          fill: text_color_dark
        });
      viz.append("text").text("EXAMINER")
        .attr({
          x: 50,
          y: 154,
          "font-size": 10,
          fill: text_color_dark
        });

      // talk gaze for child
      viz.append("text").text("Talk")
        .attr({
          x: 150,
          y: 32,
          "font-size": 10,
          fill: text_color_light
        });
      viz.append("text").text("Gaze")
        .attr({
          x: 150,
          y: 78,
          "font-size": 10,
          fill: text_color_light
        });

      // talk gaze for child
      viz.append("text").text("Talk")
        .attr({
          x: 150,
          y: 130,
          "font-size": 10,
          fill: text_color_light
        });
      viz.append("text").text("Gaze")
        .attr({
          x: 150,
          y: 175,
          "font-size": 10,
          fill: text_color_light
        });
}

function renderChild( viz, childData, start){
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
}

function renderExaminer(viz, examinerData, start){
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
}


function renderExaminer2(viz, examiner_ball, examiner_book, examiner_child, start){
  for (i = 0; i < examiner_child.length; i++) {
    if (examiner_child[i] == 1)
    {
       viz.append("rect")
        .attr({
          x: 250 + (i/10).toFixed(2)*3, //(examinerData[i].start - start).toFixed(2)*3,
          y: 100,
          width: ((0.1)*3).toFixed(2),//(examinerData[i].end - examinerData[i].start).toFixed(2)*3,
          height: 50,
          fill: pink_eye
      });
    }
    if (examiner_ball[i] == 1)
    {
       viz.append("rect")
        .attr({
          x: 250 + (i/10).toFixed(2)*3, //(examinerData[i].start - start).toFixed(2)*3,
          y: 100,
          width: ((0.1)*3).toFixed(2),//(examinerData[i].end - examinerData[i].start).toFixed(2)*3,
          height: 50,
          fill: green_ball
      });
    }
    if (examiner_book[i] == 1)
    {
       viz.append("rect")
        .attr({
          x: 250 + (i/10).toFixed(2)*3, //(examinerData[i].start - start).toFixed(2)*3,
          y: 100,
          width: ((0.1)*3).toFixed(2),//(examinerData[i].end - examinerData[i].start).toFixed(2)*3,
          height: 50,
          fill: purple_book
      });
    }
  }
}


function renderExaminerSpeech( viz, examinerSpeech, start ){
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
}

function renderChildSpeech( viz, childVocal, start){
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

function childSpeechCircles(){
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
}

function examinerSpeechCircles(){
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
}

function renderJoint(viz, child_ex, examiner_child, start){
  for (i = 0; i < examiner_child.length; i++) {

    // EYE CONTACT
    if (examiner_child[i] == 1 && child_ex[i] == 1)
    {
       viz.append("rect")
        .attr({
          x: 250 + (i/10).toFixed(2)*3, //(examinerData[i].start - start).toFixed(2)*3,
          y: 50,
          width: ((0.1)*3).toFixed(2),//(examinerData[i].end - examinerData[i].start).toFixed(2)*3,
          height: 100,
          fill: "#ffee00"
      });
    }

    // BACK AND FORTH
    var limit = 30;
    var ex = checkLeft(examiner_child, i, limit) || checkRight(examiner_child, i, limit);
    var child = checkLeft(child_ex, i, limit) || checkRight(child_ex, i, limit);
    if ( ex && child )
    {
       viz.append("rect")
        .attr({
          x: 250 + (i/10).toFixed(2)*3, //(examinerData[i].start - start).toFixed(2)*3,
          y: 50,
          width: ((0.1)*3).toFixed(2),//(examinerData[i].end - examinerData[i].start).toFixed(2)*3,
          height: 100,
          fill: "#ffee00"
      });
    }
  }
}

function checkLeft( arr, index, limit )
{
  var val = false;
  for (j = 1; j <= limit; j++)
  {
    if( index - j < 0 )
      return val;
    if( arr[index - j] == 1)
    {
      val = true;
      return val;
    }
  }
  return val;
}

function checkRight( arr, index, limit )
{
  var val = false;
  for (k = 1; k <= limit; k++)
  {
    if( index + k >= arr.length )
      return val;
    if( arr[index + k] == 1)
    {
      val = true;
      return val;
    }
  }
  return val;
}
//"#ffee00"
