function setup() {
    clear();
}

function drawGridMethod(num1, num2) {
    clear(); // Clear the canvas for redrawing
    background(0); // Set the background to black again

    const [num1Tens, num1Units] = splitIntoTensAndUnits(num1);
    const [num2Tens, num2Units] = splitIntoTensAndUnits(num2);

    let cellWidth = 60; // Width of each cell in the grid
    let cellHeight = 60; // Height of each cell in the grid
    let headerSpace = 30; // Space for the header numbers

    // Centering the grid on the canvas
    let gridWidth = cellWidth * 2; // Total grid width
    let gridHeight = cellHeight * 2; // Total grid height
    let offsetX = (width - gridWidth) / 2; // X offset for the grid center
    let offsetY = (height - gridHeight) / 2 - headerSpace; // Y offset for the grid center, adjusted up for headers

    textSize(20);
    textAlign(CENTER, CENTER);
    // The color setting for the headers will be done individually
    stroke(255); // Set stroke color to white for the grid lines

    // Draw the column headers (num2 parts)
    fill(0, 0, 255); // Set text color to blue for tens
    text(num2Tens, offsetX + cellWidth * 0.5, offsetY - headerSpace);
    fill(255, 0, 0); // Set text color to red for units
    text(num2Units, offsetX + cellWidth * 1.5, offsetY - headerSpace);

    // Draw the row headers (num1 parts)
    fill(0, 0, 255); // Set text color to blue for tens
    text(num1Tens, offsetX - headerSpace, offsetY + cellHeight * 0.5);
    fill(255, 0, 0); // Set text color to red for units
    text(num1Units, offsetX - headerSpace, offsetY + cellHeight * 1.5);

    // Set the stroke color to black for the grid lines within the cells
    stroke(0);

    // Draw the grid and calculate the products
    let products = [
        [num1Tens * num2Tens, num1Tens * num2Units],
        [num1Units * num2Tens, num1Units * num2Units]
    ];

    let sumText = '';
    let accumulatedSum = 0;
    let sumX = width / 2; // Center of the canvas width
    let sumY = offsetY + gridHeight + headerSpace * 2; // Below the grid

    for (let i = 0; i < products.length; i++) {
        for (let j = 0; j < products[i].length; j++) {
            let x = offsetX + j * cellWidth;
            let y = offsetY + i * cellHeight;

            // Draw the cell
            fill(255);
            rect(x, y, cellWidth, cellHeight);

            // Set the fill color based on the type of multiplication
            if (i === 0 && j === 0) {
                // Tens multiplied by tens
                fill(0, 0, 255); // Blue
            } else if (i === 1 && j === 1) {
                // Units multiplied by units
                fill(255, 0, 0); // Red
            } else {
                // Tens multiplied by units or units multiplied by tens
                fill(0, 255, 0); // Green
            }

            // Draw the product number
            let product = products[i][j];
            text(product, x + cellWidth / 2, y + cellHeight / 2);

            // Reset fill color to white for the sum text
            fill(255);

            // Accumulate the sum
            accumulatedSum += product;
            sumText += product + (i === products.length - 1 && j === products[i].length - 1 ? '' : ' + ');
        }
    }

    // Display the accumulated sum as a formula below the grid
    fill(255); // White text color
    textSize(24);
    text(sumText + ' = ' + accumulatedSum, sumX, sumY); // Adjust the position as needed
}


function splitIntoTensAndUnits(number) {
    let tens = Math.floor(number / 10) * 10;
    let units = number % 10;
    return [tens, units];
}