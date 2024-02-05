// sketch_regular_method.js

function drawRegularVisualization(num1, num2) {
  clear(); // Clear the canvas for redrawing

  // Convert input to strings for easier manipulation
  num1 = num1.toString();
  num2 = num2.toString();

  // Set up the drawing environment
  textSize(32); // Adjust text size as needed
  textAlign(RIGHT, CENTER); // Align text to the right
  fill(0);

  // Starting position for drawing the numbers
  let x = width / 2 + 100; // Set x to the middle of the canvas, adjust as needed
  let y = 60; // Starting Y position
  let stepY = 64; // Vertical spacing between lines

  // Draw the first and second numbers
  text(num1, x, y);
  y += stepY;
  text('× ' + num2, x, y);
  y += stepY * 1.5; // Slightly more space before starting the multiplication steps

  // Drawing the multiplication steps
  let partials = [];
  let partialYStart = y; // Remember the Y position where partials start

  for (let i = num2.length - 1; i >= 0; i--) {
    let digit = num2[i];
    let partialResult = (parseInt(num1) * parseInt(digit)).toString();
    let offset = (num2.length - (i + 1)) * (textWidth('0') / 2); // Calculate offset based on place value
    text(partialResult, x - offset, y);
    partials.push(partialResult.padEnd(partialResult.length + num2.length - (i + 1), '0')); // Pad the partial result with zeros based on its place value
    y += stepY; // Move down a line for the next partial result
  }

  // Draw the separator line before the final result
  stroke(0);
  line(x - 100, y, x, y); // Line length and position may need to be adjusted
  y += stepY / 2; // Slightly more space before the final result

  // Calculate and draw the final result
  let finalResult = partials.reduce((sum, current) => sum + parseInt(current), 0);
  text(finalResult, x, y + stepY);
}
