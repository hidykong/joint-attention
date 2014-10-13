
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
  ans = function(d) {return d;}
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
  element.transition().duration(function(d, i){ return i * 50;})
    .attr("opacity", function(d){
      if (d.objectGaze) {return 1}
      else { return 0.1};
    }); 
}