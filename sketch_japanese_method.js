var gap = 25; 
var groupGap = 100; // Gap between groups of lines 
var colors = { 
  tens: [0, 0, 255], // Blue for the tens digit 
  units: [255, 0, 0] // Red for the units digit 
};

function setup() { 
  createCanvas(1920, 1080); 
  background(0); 
  // drawLines(77, 77);
  
  textSize(32);
  fill(255); // White color
}

function getColor(digit) { 
  return digit === 'tens' ? colors.tens : colors.units; 
}

function drawLines(num1, num2) {
  const linesA = num1.toString().split('').map(Number); 
  const linesB = num2.toString().split('').map(Number);

  const startX = 500;

  const startY = 500;

  const lineLength = 600; // Set this to the desired length of the lines
  const endX = startX + lineLength;
  const endY = startY + lineLength;

  var intersections = [];
  var intersectionCounts = { tens: 0, units: 0, mixed: 0 };

  push();
  translate(width / 2, height / 2); 
  rotate(PI / 4); 
  translate(-width / 2, -height / 2);

  var linesAArray = [];
  stroke(getColor('tens')); 
  for (var i = 0; i < linesA[0]; i++) {
    var x1 = startX + i * gap;
    var y1 = startY;
    var x2 = startX + i * gap;
    var y2 = endY;
    line(x1, y1, x2, y2);
    linesAArray.push({x1, y1, x2, y2, color: 'tens'});
  } 

  stroke(getColor('units')); 
  for (var i = 0; i < linesA[1]; i++) {
    var x1 = startX + (i + linesA[0]) * gap + groupGap;
    var y1 = startY;
    var x2 = startX + (i + linesA[0]) * gap + groupGap;
    var y2 = endY;
    line(x1, y1, x2, y2);
    linesAArray.push({x1, y1, x2, y2, color: 'units'});
  }

  var linesBArray = [];
  stroke(getColor('tens')); 
  for (var i = 0; i < linesB[0]; i++) {
    var x1 = startX;
    var y1 = startY + i * gap;
    var x2 = endX;
    var y2 = startY + i * gap;
    line(x1, y1, x2, y2);
    linesBArray.push({x1, y1, x2, y2, color: 'tens'});
  } 

  stroke(getColor('units')); 
  for (var i = 0; i < linesB[1]; i++) {
    var x1 = startX;
    var y1 = startY + (i + linesB[0]) * gap + groupGap;
    var x2 = endX;
    var y2 = startY + (i + linesB[0]) * gap + groupGap;
    line(x1, y1, x2, y2);
    linesBArray.push({x1, y1, x2, y2, color: 'units'});
  }

  for (var lineA of linesAArray) {
    for (var lineB of linesBArray) {
      var intersection = getIntersection(lineA, lineB);
      if (intersection) {
        intersections.push(intersection);
        if (lineA.color === lineB.color) {
          intersectionCounts[lineA.color]++;
        } else {
          intersectionCounts.mixed++;
        }
      }
    }
  }

  stroke(255); 
  strokeWeight(5); 
  for (var i = 0; i < intersections.length; i++) {
    const [x, y] = intersections[i];
    point(x, y);
  }

  pop();

  var product = intersectionCounts.tens * 100 + intersectionCounts.units * 1 + intersectionCounts.mixed * 10;
  textSize(32);
  fill(255); // White color
  var tensProduct = intersectionCounts.tens * 100;
  var unitsProduct = intersectionCounts.units * 1;
  var mixedProduct = intersectionCounts.mixed * 10;

  var detailedCalculation = `${intersectionCounts.tens} * 100 + ${intersectionCounts.mixed} * 10 + ${intersectionCounts.units} * 1 = ${product}`;
  text(num1 + " * " + num2 + " = " + detailedCalculation, 10, 50); // Display the product at position (10, 50)
  // text(detailedCalculation, 10, 80); // Display the detailed calculation at position (10, 80)
}

function getIntersection(lineA, lineB) {
  var denominator = (lineA.x1 - lineA.x2) * (lineB.y1 - lineB.y2) - (lineA.y1 - lineA.y2) * (lineB.x1 - lineB.x2);
  if (denominator === 0) {
    return null; // The lines are parallel
  }

  var x = ((lineA.x1 * lineA.y2 - lineA.y1 * lineA.x2) * (lineB.x1 - lineB.x2) - (lineA.x1 - lineA.x2) * (lineB.x1 * lineB.y2 - lineB.y1 * lineB.x2)) / denominator;
  var y = ((lineA.x1 * lineA.y2 - lineA.y1 * lineA.x2) * (lineB.y1 - lineB.y2) - (lineA.y1 - lineA.y2) * (lineB.x1 * lineB.y2 - lineB.y1 * lineB.x2)) / denominator;

  return [x, y];
}
