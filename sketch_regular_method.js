function setup() {
  createCanvas(400, 400); // Set the size of the canvas as needed
  drawRegularVisualization('23', '45');
}

function drawRegularVisualization(num1, num2) {
  clear(); // Clear the canvas for redrawing
  background(0); // Set the background to black
  fill(255); // Set the fill color to white for the text
  textSize(32); // Set the base text size
  textAlign(CENTER, CENTER); // Align text to the center

  // Define the box size and calculate the offsets
  let boxSize = 48;
  let xOffset = (width - (Math.max(num1.length, num2.length) + 2) * boxSize) / 2;
  let yOffset = (height - (num2.length + 3) * boxSize) / 2;

  // Draw the multiplication symbol '×' and the numbers
  text('×', xOffset, yOffset);
  for (let i = 0; i < num1.length; i++) {
    text(num1[i], xOffset + boxSize * (i + 1), yOffset);
  }
  for (let i = 0; i < num2.length; i++) {
    text(num2[i], xOffset + boxSize * (i + 1), yOffset + boxSize);
  }

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
    let resultXOffset = xOffset/2 + boxSize * (num1.length - result.replace(/^0+/, '').length + 1);
    let yPosition = yOffset + boxSize * (2 + i);

    // Draw the partial result
    for (let j = 0; j < result.length; j++) {
      text(result[j], resultXOffset + boxSize * j, yPosition);
    }

    // // Draw the carries above the partial result
    // textSize(14); // Smaller size for the carry numbers
    // let carryYPosition = (yPosition - 1) - boxSize / 2 ; // Position the carry halfway above the current row
    // let carryXOffset = resultXOffset - 49;
    // for (let j = 0; j < carries[i].length; j++) {
    //   if (carries[i][j] > 0) {
    //     let carryXPosition = carryXOffset + boxSize * (j - (carries[i].length - result.length));
    //     text(carries[i][j], carryXPosition, carryYPosition);
    //   }
    // }
    textSize(32); // Reset the text size for numbers
  }

  // Calculate and display the final result
  let finalResult = (parseInt(num1) * parseInt(num2)).toString();
  let finalXOffset = xOffset + boxSize * (num1.length + 1 - finalResult.length);
  let finalYPosition = yOffset + boxSize * (2 + num2.length);
  for (let i = 0; i < finalResult.length; i++) {
    text(finalResult[i], finalXOffset + boxSize * i, finalYPosition);
  }
}