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
      let verticalSpacing = 60; // Increased vertical spacing
      let xOffset = (p.width - (Math.max(num1.length, num2.length) + 3) * boxSize) / 2;
      let yOffset = (p.height - (num2.length + 5) * boxSize) / 2;

      // Draw the multiplication symbol '×' and the numbers
      // p.text('×', xOffset, yOffset);
      for (let i = 0; i < num1.length; i++) {
        p.text(num1[i], xOffset + boxSize * (i + 2), yOffset);
      }
      p.text('×', 290, 210); //multiplication siggn between two numbers
      for (let i = 0; i < num2.length; i++) {
        p.text(num2[i], xOffset + boxSize * (i + 2), yOffset + verticalSpacing);
      }

      p.stroke(255);
      // p.line(180, 330, 400, 330);
      p.line(xOffset - boxSize, yOffset + verticalSpacing*2 + 10, xOffset + boxSize*(num1.length + 3), yOffset + verticalSpacing*2 + 10);

      // Calculate the partial results, carries, and their positions
      let carries = [];
      let partialResults = [];

      for (let i = num2.length - 1; i >= 0; i--) {
        let currentMultiplier = parseInt(num2[i]);
        let partialResult = '';
        let carry = 0;
        // let partialCarries = [];
        let partialCarries = new Array(num1.length).fill(0);

        for (let j = num1.length - 1; j >= 0; j--) {
          let product = currentMultiplier * parseInt(num1[j]) + carry;
          carry = Math.floor(product / 10);
          partialResult = (product % 10) + partialResult;
          if (carry > 0 && j > 0) { // Store carries except for the leftmost digit
            partialCarries[j - 1] = carry;
          }
        }

        // If there's a carry for the leftmost digit, add it to the result
        if (carry > 0) {
          partialResult = carry + partialResult;
          // partialCarries.unshift(carry);
        }

        partialResults.push(partialResult.padStart(num1.length, '0'));
        carries.push(partialCarries);
      }

      // Draw the partial results and their carries
      for (let i = 0; i < partialResults.length; i++) {
        let result = partialResults[i];
        let resultXOffset = xOffset + boxSize * (num1.length - result.length + 2);

        // Shift the second partial result one column to the left
        if (i === 1) {
          resultXOffset -= boxSize;
        }

        let yPosition = yOffset + verticalSpacing * (3 + i) + 20;

        // Draw the partial result
        for (let j = 0; j < result.length; j++) {
          p.text(result[j], resultXOffset + boxSize * j, yPosition);
        }

        // Draw the carries above the partial result
        p.textSize(16); // Smaller size for the carry numbers
        //Ensuring that carries do not overlap
        let carryYPosition = yPosition - verticalSpacing / 1.5; // Position the carry halfway above the current row

        for (let j = 0; j < carries[i].length; j++) {
          let carryXPosition = resultXOffset + boxSize * (j - (carries[i].length - result.length)) - 48;

          // Do not draw the leftmost carry for the first partial result
          if (i === 0 && j === 0) continue;

          if (carries[i][j] > 0) {
            let carryXPosition = resultXOffset + boxSize * j;
            p.text(carries[i][j], carryXPosition, carryYPosition);
          }
        }
        p.textSize(32); // Reset the text size for numbers
      }

      p.stroke(255);
      // p.line(180, 480, 400, 480);
      p.line(xOffset - boxSize, yOffset + verticalSpacing * (3 + num2.length) + 10, xOffset + boxSize * (num1.length + 3), yOffset + verticalSpacing * (3 + num2.length) + 10);

      // Calculate and display the final result
      let finalResult = (parseInt(num1) * parseInt(num2)).toString();
      let finalXOffset = xOffset + boxSize * (num1.length + 2 - finalResult.length);
      let finalYPosition = yOffset + verticalSpacing * (3 + num2.length) + 80;
      for (let i = 0; i < finalResult.length; i++) {
        p.text(finalResult[i], finalXOffset + boxSize * i, finalYPosition);
      }
    };
  };

  // Attach the sketch to a specific element
  new p5(sketch, document.getElementById('visualizationCanvas'));

  //Show modal when visualization is initiated
  const modal = document.getElementById("visualizationModal");
  modal.style.display = "block";

  //close Modal function
  function closeModal(){
    modal.style.display = "none";
  }

  //event listener to close modal when clicking outside of the canvas
  window.addEventListener("click", function (event) {
    if(event.target === modal){
      closeModal();
    }
  });
}
