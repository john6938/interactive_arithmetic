const regularHints = [
  "Hint 1: First, focus on multiplying the ones places of both numbers.",
  "Hint 2: Then multiply the tens place of the first number with the ones place of the second number.",
  "Hint 3: Next, multiply the ones place of the first number with the tens place of the second number.",
  "Hint 4: Multiply the tens places of both numbers.",
  "Final Hint: Now, add all the results together."
];
const blockHints = [
  "Hint 1: Break the first number into tens and ones.",
  "Hint 2: Break the second number into tens and ones.",
  "Hint 3: Create a grid with rows for tens and ones of the first number and columns for tens and ones of the second number.",
  "Hint 4: Multiply the numbers at each row and column intersection to fill in the grid.",
  "Final Hint: Sum up all the products to get the result."
];
const fujisawaHints = [
  "Hint 1: Break the numbers into tens and ones.",
  "Hint 2: Draw diagonal lines correspondingly to the tens and ones of the first number.",
  "Hint 3: Draw diagonal lines correspondingly to the tens and ones of the second number, but this time, let's draw it over the lines that we've already drawn.",
  "Hint 4: Count the number of tens intersections and multiply them by 100.",
  "Hint 5: Count the number of intersections between tens and ones and multiply them by 10.",
  "Hint 6: Count the number of ones intersections and multiply them by 1.",
  "Final Hint: Sum up all the products to get the result."
];
// Initialize hints to regularHints as default
let hints = [...regularHints];

document.addEventListener("DOMContentLoaded", function () {
  const methodRadios = document.querySelectorAll('input[name="method"]');
  methodRadios.forEach(function (radio) {
    radio.addEventListener("change", function () {
      // Reset steps and hints when radio button changes
      document.getElementById("steps").innerHTML = "";
      document.getElementById("hints").innerHTML = "";
      
      stepIndex = 0;
      hintIndex = 0;
      
      const method = document.querySelector('input[name="method"]:checked').value;
      if (method === "regular") {
        hints = [...regularHints];
      } else if (method === "block"){
        hints = [...blockHints];
      } else if (method === "fujisawa"){
        hints = [...fujisawaHints];
      }
    });
  });
});

let hintIndex = 0;
let stepIndex = 0;
let steps = [];


function prepareCalculation() {
  const num1 = parseInt(document.getElementById("num1").value);
  const num2 = parseInt(document.getElementById("num2").value);
  const method = document.querySelector('input[name="method"]:checked').value;

  if (isNaN(num1) || isNaN(num2) || num1 > 99 || num2 > 99) {
    alert("Please enter two two-digit numbers.");
    return false;
  }
  switch (method) {
    case "regular":
      // Regular method
      prepareRegularCalculation(num1, num2);
      hints = regularHints;
      break;
    case "block":
      // Block method
      prepareBlockCalculation(num1, num2);
      hints = blockHints;
      break;
    case "fujisawa":
      // Fujisawa - Japanese method
      prepareFujisawaCalculation(num1, num2);
      hints = fujisawaHints;
      break;
  }
  return true;
}

function prepareRegularCalculation(num1, num2) {
  if (stepIndex === 0) {
    // Prepare steps if this is the first click
    document.getElementById("steps").innerHTML = "";
    const num1 = parseInt(document.getElementById("num1").value);
    const num2 = parseInt(document.getElementById("num2").value);
    
    if (isNaN(num1) || isNaN(num2) || num1 > 99 || num2 > 99) {
      alert("Please enter two two-digit numbers.");
      return;
    }

    const tens1 = Math.floor(num1 / 10);
    const ones1 = num1 % 10;
    const tens2 = Math.floor(num2 / 10);
    const ones2 = num2 % 10;
    
    const step1 = ones1 * ones2;
    const step2 = tens1 * ones2;
    const step3 = ones1 * tens2;
    const step4 = tens1 * tens2;
    const finalStep = (step4 * 100) + (step3 * 10) + (step2 * 10) + step1;

    steps = [
      `Step 1: Multiply the ones places: ${ones1} * ${ones2} = ${step1}`,
      `Step 2: Multiply the tens place of the first number with the ones place of the second number: ${tens1} * ${ones2} = ${step2}`,
      `Step 3: Multiply the ones place of the first number with the tens place of the second number: ${ones1} * ${tens2} = ${step3}`,
      `Step 4: Multiply the tens places: ${tens1} * ${tens2} = ${step4}`,
      `Final Step: Add all the subtotals together: (${step4} * 100) + (${step3} * 10) + (${step2} * 10) + ${step1} = ${finalStep}`
    ];
  }
}

function prepareBlockCalculation(num1, num2) {
  const tens1 = Math.floor(num1 / 10) * 10; // Extract the tens digit and multiply back by 10
  const ones1 = num1 % 10;
  const tens2 = Math.floor(num2 / 10) * 10;
  const ones2 = num2 % 10;

  const block1 = tens1 * tens2;
  const block2 = tens1 * ones2;
  const block3 = ones1 * tens2;
  const block4 = ones1 * ones2;
  const finalResult = block1 + block2 + block3 + block4;

  steps = [
    `Step 1: Multiply tens of the first and second numbers: ${tens1} * ${tens2} = ${block1}`,
    `Step 2: Multiply tens of the first number with ones of the second number: ${tens1} * ${ones2} = ${block2}`,
    `Step 3: Multiply ones of the first number with tens of the second number: ${ones1} * ${tens2} = ${block3}`,
    `Step 4: Multiply ones of both numbers: ${ones1} * ${ones2} = ${block4}`,
    `Final Step: Add all the products together: ${block1} + ${block2} + ${block3} + ${block4} = ${finalResult}`
  ];
}

function prepareFujisawaCalculation(num1, num2) {
  const tens1 = Math.floor(num1/10);
  const ones1 = num1%10;
  const tens2 = Math.floor(num2/10);
  const ones2 = num2%10;
  const res = num1 * num2;
  const group2 = ((tens1 * ones2) + (tens2 * ones1))*10;
  const group1 = (tens1 * tens2) * 100;
  const group3 = (ones1 * ones2);

  steps = [
    `Step 1: Draw ${tens1} line segments, and a little further away, draw ${ones1} line segments correspondingly to the first number.`,
    `Step 2: Draw ${tens2} line segments, and a little further away, draw ${ones2} line segments over the drawn line segments correspondingly to the second number.`,
    `Step 3: Count the intersections amongst the tens groups and multiply it by 100, we get ${group1}.`,
    `Step 4: Count the intersections amongst the tens and ones groups and multiply it by 10, we get ${group2}.`,
    `Step 5: Count the intersections amongst the ones groups and multiply it by 1, we get ${group3}.`,
    `Step 6: Sum up all the products calculated: ${group1} + ${group2} + ${group3} = ${res}.`
  ]
}

function showStep() {
  console.log("showStep function called"); // Debug log
  
  if (stepIndex === 0) {
    console.log("Preparing Calculation"); // Debug log
    if (!prepareCalculation()) {
      return;
    }
  }

  console.log("showStep function processing", steps); // Debug log
  
  if (stepIndex < steps.length) {
    console.log("Adding new step"); // Debug log
    let stepDiv = document.getElementById("steps");
    let newStep = document.createElement("div");
    newStep.innerHTML = steps[stepIndex];
    stepDiv.appendChild(newStep);
    stepIndex++;
  } else {
    console.log("Resetting steps"); // Debug log
    document.getElementById("steps").innerHTML = "";
    stepIndex = 0;
  }
}

function showHint() {
  if (hintIndex < hints.length) {
    let hintDiv = document.getElementById("hints");
    let newHint = document.createElement("div");
    newHint.innerHTML = hints[hintIndex];
    hintDiv.appendChild(newHint);
    hintIndex++;
  } else {
    document.getElementById("hints").innerHTML = "";
    hintIndex = 0;
  }
}
