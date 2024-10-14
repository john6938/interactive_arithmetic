import p5 from "p5";

export function drawGridMethod(num1, num2) {
    const sketch = (p) => {
        p.setup = () => {
            p.createCanvas(700, 700); // Create the canvas
            p.clear(); // Clear the canvas for redrawing
            p.background(0); // Set the background to black again

            const [num1Tens, num1Units] = splitIntoTensAndUnits(num1);
            const [num2Tens, num2Units] = splitIntoTensAndUnits(num2);

            let cellWidth = 60; // Width of each cell in the grid
            let cellHeight = 60; // Height of each cell in the grid
            let headerSpace = 30; // Space for the header numbers

            // Centering the grid on the canvas
            let gridWidth = cellWidth * 2; // Total grid width
            let gridHeight = cellHeight * 2; // Total grid height
            let offsetX = (p.width - gridWidth) / 2; // X offset for the grid center
            let offsetY = (p.height - gridHeight) / 2 - headerSpace; // Y offset for the grid center, adjusted up for headers

            p.textSize(20);
            p.textAlign(p.CENTER, p.CENTER);
            p.stroke(255); // Set stroke color to white for the grid lines

            // Draw the column headers (num2 parts)
            p.fill(0, 0, 255); // Set text color to blue for tens
            p.text(num2Tens, offsetX + cellWidth * 0.5, offsetY - headerSpace);
            p.fill(255, 0, 0); // Set text color to red for units
            p.text(num2Units, offsetX + cellWidth * 1.5, offsetY - headerSpace);

            // Draw the row headers (num1 parts)
            p.fill(0, 0, 255); // Set text color to blue for tens
            p.text(num1Tens, offsetX - headerSpace, offsetY + cellHeight * 0.5);
            p.fill(255, 0, 0); // Set text color to red for units
            p.text(num1Units, offsetX - headerSpace, offsetY + cellHeight * 1.5);

            p.stroke(0); // Set the stroke color to black for the grid lines within the cells

            // Draw the grid and calculate the products
            let products = [
                [num1Tens * num2Tens, num1Tens * num2Units],
                [num1Units * num2Tens, num1Units * num2Units]
            ];

            let sumText = '';
            let accumulatedSum = 0;
            let sumX = p.width / 2; // Center of the canvas width
            let sumY = offsetY + gridHeight + headerSpace * 2; // Below the grid

            for (let i = 0; i < products.length; i++) {
                for (let j = 0; j < products[i].length; j++) {
                    let x = offsetX + j * cellWidth;
                    let y = offsetY + i * cellHeight;

                    // Draw the cell
                    p.fill(255);
                    p.rect(x, y, cellWidth, cellHeight);

                    // Set the fill color based on the type of multiplication
                    if (i === 0 && j === 0) {
                        // Tens multiplied by tens
                        p.fill(0, 0, 255); // Blue
                    } else if (i === 1 && j === 1) {
                        // Units multiplied by units
                        p.fill(255, 0, 0); // Red
                    } else {
                        // Tens multiplied by units or units multiplied by tens
                        p.fill(0, 255, 0); // Green
                    }

                    // Draw the product number
                    let product = products[i][j];
                    p.text(product, x + cellWidth / 2, y + cellHeight / 2);

                    // Reset fill color to white for the sum text
                    p.fill(255);

                    // Accumulate the sum
                    accumulatedSum += product;
                    sumText += product + (i === products.length - 1 && j === products[i].length - 1 ? '' : ' + ');
                }
            }

            // Display the accumulated sum as a formula below the grid
            p.fill(255); // White text color
            p.textSize(24);
            p.text(sumText + ' = ' + accumulatedSum, sumX, sumY); // Adjust the position as needed
        };
    };

    new p5(sketch, document.getElementById('visualizationCanvas')); // Create a new p5 instance

       // Show the modal when visualization is initiated
       const modal = document.getElementById("visualizationModal");
       modal.style.display = "block";
       // Function to close the modal
       function closeModal() {
           modal.style.display = "none";
       }
       // Event listener to close modal when clicking outside of the canvas
       window.addEventListener("click", function (event) {
           if (event.target === modal) {
               closeModal();
           }
       });
}

function splitIntoTensAndUnits(number) {
    let tens = Math.floor(number / 10) * 10;
    let units = number % 10;
    return [tens, units];
}
