import { drawLines } from './sketch_japanese_method.js';
import { drawRegularVisualization } from './sketch_regular_method.js';
import { drawGridMethod } from './sketch_grid_method.js';
import p5 from 'p5';

let currentP5Instance = null;   // Track the current p5 instance

function showVisualization() {
    const num1 = document.getElementById('num1').value;
    const num2 = document.getElementById('num2').value;
    const method = document.querySelector('input[name="method"]:checked').value;

    document.getElementById('visualizationCanvas').innerHTML = '';

    // Clear previous canvas if it exists
    if (currentP5Instance) {
        currentP5Instance,remove();
    }

    let canvasWidth = 700;
    let canvasHeight = 700;

    // Execute the appropriate method based on the selected option
    if (method === 'fujisawa') {
        currentP5Instance = new p5((p) => drawLines(num1, num2), document.getElementById('visualizationCanvas'));
    } else if (method === 'regular') {
        currentP5Instance = new p5((p) => drawRegularVisualization(num1, num2), document.getElementById('visualizationCanvas'));
    } else if (method === 'block') {
        currentP5Instance = new p5((p) => drawGridMethod(num1, num2), document.getElementById('visualizationCanvas'));
    } else {
        alert('Something went wrong.');
    return;
    }

    //Adjust modal size based on canvas
    var modalContent = document.querySelector('.modal-content');
    modalContent.style.width = canvasWidth + 'px';
    modalContent.style.height = canvasHeight + 'px';

    //Open the modal
    var modal = document.getElementById('visualizationModal');
    modal.style.display = "block";
}

// Attach functions to the window object to make them accessible globally
window.showVisualization = showVisualization;
window.genNum = function genNum() {
  const num1Inp = document.getElementById("num1");
  const num2Inp = document.getElementById("num2");

  const num1 = Math.floor(Math.random() * 90) + 10;
  const num2 = Math.floor(Math.random() * 90) + 10;

  num1Inp.value = num1;
  num2Inp.value = num2;
};

// Close the modal when the user clicks on <span> (x)
var span = document.getElementsByClassName("close")[0];
span.onclick = function () {
  var modal = document.getElementById('visualizationModal');
  modal.style.display = "none";
};