import p5 from 'p5';

export function drawLines(num1, num2) {
  const sketch = (p) => {
    const gap = 9;
    const groupGap = 100; // Gap between groups of lines
    const colors = {
      tens: [0, 0, 255], // Blue for the tens digit
      units: [255, 0, 0], // Red for the units digit
    };

    function getColor(digit) {
      return digit === 'tens' ? colors.tens : colors.units;
    }

    function getIntersection(lineA, lineB) {
      const denominator =
        (lineA.x1 - lineA.x2) * (lineB.y1 - lineB.y2) -
        (lineA.y1 - lineA.y2) * (lineB.x1 - lineB.x2);
      if (denominator === 0) {
        return null; // The lines are parallel
      }

      const x =
        ((lineA.x1 * lineA.y2 - lineA.y1 * lineA.x2) * (lineB.x1 - lineB.x2) -
          (lineA.x1 - lineA.x2) * (lineB.x1 * lineB.y2 - lineB.y1 * lineB.x2)) /
        denominator;
      const y =
        ((lineA.x1 * lineA.y2 - lineA.y1 * lineA.x2) * (lineB.y1 - lineB.y2) -
          (lineA.y1 - lineA.y2) * (lineB.x1 * lineB.y2 - lineB.y1 * lineB.x2)) /
        denominator;

      return [x, y];
    }

    p.setup = () => {
      p.createCanvas(700, 700);
      const linesA = num1.toString().split('').map(Number);
      const linesB = num2.toString().split('').map(Number);

      p.background(0);
      
      //Shift to left and top
      const startX = 150;
      const startY = 150;

      //Increase line length
      const lineLength = 300; // Set this to the desired length of the lines
      const endX = startX + lineLength;
      const endY = startY + lineLength;

      let intersections = [];
      let intersectionCounts = { tens: 0, units: 0, mixed: 0 };

      p.push();
      p.translate(p.width / 2, p.height / 2);
      p.rotate(p.PI / 4);
      p.scale(1, -1);

      p.translate(-p.width / 2, -p.height / 2);

      let linesAArray = [];
      p.strokeWeight(2);
      p.stroke(getColor('tens'));
      for (let i = 0; i < linesA[0]; i++) {
        let x1 = startX + i * gap;
        let y1 = startY;
        let x2 = startX + i * gap;
        let y2 = endY;
        p.line(x1, y1, x2, y2);
        linesAArray.push({ x1, y1, x2, y2, color: 'tens' });
      }

      p.stroke(getColor('units'));
      for (let i = 0; i < linesA[1]; i++) {
        let x1 = startX + (i + linesA[0]) * gap + groupGap;
        let y1 = startY;
        let x2 = startX + (i + linesA[0]) * gap + groupGap;
        let y2 = endY;
        p.line(x1, y1, x2, y2);
        linesAArray.push({ x1, y1, x2, y2, color: 'units' });
      }

      let linesBArray = [];
      p.stroke(getColor('tens'));
      for (let i = 0; i < linesB[0]; i++) {
        let x1 = startX;
        let y1 = startY + i * gap;
        let x2 = endX;
        let y2 = startY + i * gap;
        p.line(x1, y1, x2, y2);
        linesBArray.push({ x1, y1, x2, y2, color: 'tens' });
      }

      p.stroke(getColor('units'));
      for (let i = 0; i < linesB[1]; i++) {
        let x1 = startX;
        let y1 = startY + (i + linesB[0]) * gap + groupGap;
        let x2 = endX;
        let y2 = startY + (i + linesB[0]) * gap + groupGap;
        p.line(x1, y1, x2, y2);
        linesBArray.push({ x1, y1, x2, y2, color: 'units' });
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

      p.stroke(255);
      p.strokeWeight(5);
      for (let i = 0; i < intersections.length; i++) {
        const [x, y] = intersections[i];
        p.point(x, y);
      }

      p.pop();

      let product =
        intersectionCounts.tens * 100 +
        intersectionCounts.units * 1 +
        intersectionCounts.mixed * 10;

      p.textSize(20);

      // Split num1 and num2 into tens and units digits
      let num1Tens = Math.floor(num1 / 10);
      let num1Units = num1 % 10;
      let num2Tens = Math.floor(num2 / 10);
      let num2Units = num2 % 10;

      let xPosition = 10;
      const yPosition = 50;

      // Draw num1 tens digit in blue
      p.fill(0, 0, 255); // Blue color
      p.text(num1Tens, xPosition, yPosition);
      xPosition += p.textWidth(num1Tens.toString());

      // Draw num1 units digit in red
      p.fill(255, 0, 0); // Red color
      p.text(num1Units, xPosition, yPosition);
      xPosition += p.textWidth(num1Units.toString());

      // Draw multiplication symbol in white
      p.fill(255, 255, 255); // White color
      p.text(' x ', xPosition, yPosition);
      xPosition += p.textWidth(' x ');

      // Draw num2 tens digit in blue
      p.fill(0, 0, 255); // Blue color
      p.text(num2Tens, xPosition, yPosition);
      xPosition += p.textWidth(num2Tens.toString());

      // Draw num2 units digit in red
      p.fill(255, 0, 0); // Red color
      p.text(num2Units, xPosition, yPosition);
      xPosition += p.textWidth(num2Units.toString());

      // Draw equals symbol and detailed calculation in white
      p.fill(255); // White color
      let detailedCalculation = ` = ${intersectionCounts.tens} x 100 + ${intersectionCounts.mixed} x 10 + ${intersectionCounts.units} x 1 = ${product}`;
      p.text(detailedCalculation, xPosition, yPosition);
    };
  };

  new p5(sketch, document.getElementById('visualizationCanvas'));

  //Show modal when visualization is initiated
  const modal = document.getElementById("visualizationModal");
  modal.style.display = "block";

  //Close modal
  function closeModal(){
    modal.style.display = "none";
  }

  //add eventlistener to close modal when clicking outside of the canvas
  window.addEventListener("click", function (event){
    if (event.target === modal) {
      closeModal()
    }
  });
}
