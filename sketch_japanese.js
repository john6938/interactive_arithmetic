let gap = 25; 
let groupGap = 100; // Gap between groups of lines 
let colors = { 
  tens: [0, 0, 255], // Blue for the tens digit 
  units: [255, 0, 0] // Red for the units digit 
};

function setup() { 
  createCanvas(1920, 1080); 
  background(0); 
  drawLines(num1, num2);
  
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

  let intersections = [];
  let intersectionCounts = { tens: 0, units: 0, mixed: 0 };

  push();
  translate(width / 2, height / 2); 
  rotate(PI / 4); 
  translate(-width / 2, -height / 2);

  let linesAArray = [];
  stroke(getColor('tens')); 
  for (let i = 0; i < linesA[0]; i++) {
    let x1 = startX + i * gap;
    let y1 = startY;
    let x2 = startX + i * gap;
    let y2 = endY;
    line(x1, y1, x2, y2);
    linesAArray.push({x1, y1, x2, y2, color: 'tens'});
  } 

  stroke(getColor('units')); 
  for (let i = 0; i < linesA[1]; i++) {
    let x1 = startX + (i + linesA[0]) * gap + groupGap;
    let y1 = startY;
    let x2 = startX + (i + linesA[0]) * gap + groupGap;
    let y2 = endY;
    line(x1, y1, x2, y2);
    linesAArray.push({x1, y1, x2, y2, color: 'units'});
  }

  let linesBArray = [];
  stroke(getColor('tens')); 
  for (let i = 0; i < linesB[0]; i++) {
    let x1 = startX;
    let y1 = startY + i * gap;
    let x2 = endX;
    let y2 = startY + i * gap;
    line(x1, y1, x2, y2);
    linesBArray.push({x1, y1, x2, y2, color: 'tens'});
  } 

  stroke(getColor('units')); 
  for (let i = 0; i < linesB[1]; i++) {
    let x1 = startX;
    let y1 = startY + (i + linesB[0]) * gap + groupGap;
    let x2 = endX;
    let y2 = startY + (i + linesB[0]) * gap + groupGap;
    line(x1, y1, x2, y2);
    linesBArray.push({x1, y1, x2, y2, color: 'units'});
  }

  for (let lineA of linesAArray) {
    for (let lineB of linesBArray) {
      let intersection = getIntersection(lineA, lineB);
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
  for (let i = 0; i < intersections.length; i++) {
    const [x, y] = intersections[i];
    point(x, y);
  }

  pop();

  let product = intersectionCounts.tens * 100 + intersectionCounts.units * 1 + intersectionCounts.mixed * 10;
  textSize(32);
  fill(255); // White color
  let tensProduct = intersectionCounts.tens * 100;
  let unitsProduct = intersectionCounts.units * 1;
  let mixedProduct = intersectionCounts.mixed * 10;

  let detailedCalculation = `${intersectionCounts.tens} * 100 + ${intersectionCounts.mixed} * 10 + ${intersectionCounts.units} * 1 = ${product}`;
  text(num1 + " * " + num2 + " = " + detailedCalculation, 10, 50); // Display the product at position (10, 50)
  // text(detailedCalculation, 10, 80); // Display the detailed calculation at position (10, 80)
}

function getIntersection(lineA, lineB) {
  let denominator = (lineA.x1 - lineA.x2) * (lineB.y1 - lineB.y2) - (lineA.y1 - lineA.y2) * (lineB.x1 - lineB.x2);
  if (denominator === 0) {
    return null; // The lines are parallel
  }

  let x = ((lineA.x1 * lineA.y2 - lineA.y1 * lineA.x2) * (lineB.x1 - lineB.x2) - (lineA.x1 - lineA.x2) * (lineB.x1 * lineB.y2 - lineB.y1 * lineB.x2)) / denominator;
  let y = ((lineA.x1 * lineA.y2 - lineA.y1 * lineA.x2) * (lineB.y1 - lineB.y2) - (lineA.y1 - lineA.y2) * (lineB.x1 * lineB.y2 - lineB.y1 * lineB.x2)) / denominator;

  return [x, y];
}