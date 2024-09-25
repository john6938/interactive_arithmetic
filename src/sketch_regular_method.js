import p5 from "p5";

export function drawRegularVisualization(num1, num2) {
  const sketch = (p) => {
    p.setup = () => {
      p.createCanvas(700, 700); // Create a 700x700 canvas
      p.clear(); // Clear the canvas for redrawing
      p.background(0); // Set the background to black
      p.fill(255); // Set the fill color to white for the text
      p.textSize(32); // Set the base text size
      p.textAlign(p.CENTER, p.CENTER); // Align text to the center

      // Define the box size and calculate the offsets
      let boxSize = 48;
      let xOffset = (p.width - (Math.max(num1.length, num2.length) + 2) * boxSize) / 2;
      let yOffset = (p.height - (num2.length + 3) * boxSize) / 2;

      // Draw the multiplication symbol '×' and the numbers
      p.text('×', xOffset, yOffset);
      for (let i = 0; i < num1.length; i++) {
        p.text(num1[i], xOffset + boxSize * (i + 1), yOffset);
      }
      for (let i = 0; i < num2.length; i++) {
        p.text(num2[i], xOffset + boxSize * (i + 1), yOffset + boxSize);
      }

      p.stroke(255);
      p.line(180, 330, 400, 330);

      // Calculate the partial results, carries, and their positions
      let carries = [];
      let partialResults = [];

      for (let i = num2.length - 1; i >= 0; i--) {
        let currentMultiplier = parseInt(num2[i]);
        let partialResult = '';
        let carry = 0;
        let partialCarries = [];

        for (let j = num1.length - 1; j >= 0; j--) {
          let product = currentMultiplier * parseInt(num1[j]) + carry;
          carry = Math.floor(product / 10);
          partialResult = (product % 10) + partialResult;
          if (carry > 0 && j !== 0) { // Store carries except for the leftmost digit
            partialCarries[num1.length - j - 1] = carry;
          }
        }

        // If there's a carry for the leftmost digit, add it to the result
        if (carry > 0) {
          partialResult = carry + partialResult;
          partialCarries.unshift(carry);
        }

        partialResults.push(partialResult.padStart(num1.length, '0'));
        carries.push(partialCarries);
      }

      // Draw the partial results and their carries
      for (let i = 0; i < partialResults.length; i++) {
        let result = partialResults[i];
        let resultXOffset = xOffset + boxSize * (num1.length - result.length + 1);

        // Shift the second partial result one column to the left
        if (i === 1) {
          resultXOffset -= boxSize;
        }

        let yPosition = yOffset + boxSize * (2 + i) + 50;

        // Draw the partial result
        for (let j = 0; j < result.length; j++) {
          p.text(result[j], resultXOffset + boxSize * j, yPosition);
        }

        // Draw the carries above the partial result
        p.textSize(16); // Smaller size for the carry numbers
        let carryYPosition = yPosition - boxSize / 2; // Position the carry halfway above the current row

        for (let j = 0; j < carries[i].length; j++) {
          let carryXPosition = resultXOffset + boxSize * (j - (carries[i].length - result.length)) - 48;

          // Do not draw the leftmost carry for the first partial result
          if (i === 0 && j === 0) continue;

          if (carries[i][j] > 0) {
            p.text(carries[i][j], carryXPosition, carryYPosition);
          }
        }
        p.textSize(32); // Reset the text size for numbers
      }

      p.stroke(255);
      p.line(180, 480, 400, 480);

      // Calculate and display the final result
      let finalResult = (parseInt(num1) * parseInt(num2)).toString();
      let finalXOffset = xOffset + boxSize * (num1.length + 1 - finalResult.length);
      let finalYPosition = yOffset + boxSize * (2 + num2.length) + 100;
      for (let i = 0; i < finalResult.length; i++) {
        p.text(finalResult[i], finalXOffset + boxSize * i, finalYPosition);
      }
    };
  };

  // Attach the sketch to a specific element
  new p5(sketch, document.getElementById('visualizationCanvas'));
}
