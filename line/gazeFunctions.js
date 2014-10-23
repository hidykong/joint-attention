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