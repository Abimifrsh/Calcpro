const display = document.getElementById("display");
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const clearButton = document.querySelector(".clear");
const equalsButton = document.querySelector(".equals");
const sqrtButton = document.querySelector(".sqrt");
let currentInput = "";
let previousInput = "";
let operator = null;

// Numbers
numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (button.dataset.number === "." && currentInput.includes(".")) return;
    currentInput += button.dataset.number;
    display.textContent = currentInput;
  });
});

// Operators
operatorButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (!currentInput) return;
    if (previousInput) calculate();
    operator = button.dataset.operator;
    previousInput = currentInput;
    currentInput = "";
  });
});

// Equals
equalsButton.addEventListener("click", () => {
  if (!previousInput || !currentInput || !operator) return;
  calculate();
});

// Clear
clearButton.addEventListener("click", () => {
  currentInput = "";
  previousInput = "";
  operator = null;
  display.textContent = "0";
});
sqrtButton.addEventListener("click", () => {
  let num;

  // Prefer current input if exists, else last result
  if (currentInput) {
    num = parseFloat(currentInput);
  } else if (previousInput) {
    num = parseFloat(previousInput);
  } else {
    return; // nothing to sqrt
  }

  if (num < 0) { // square root of negative number is invalid
    display.textContent = "Error";
    currentInput = "";
    previousInput = "";
    operator = null;
    return;
  }

  const result = Math.sqrt(num);
  display.textContent = formatResult(result);

  // Update current input for next operation
  currentInput = formatResult(result).toString();
  previousInput = "";
  operator = null;
});

// Calculation function
function calculate() {
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  let result = 0;

  switch (operator) {
    case "+": result = prev + current; break;
    case "-": result = prev - current; break;
    case "*": result = prev * current; break;
    case "/": result = prev / current; break;
    case "%": result = prev % current; break;
    default: return;
  }

  display.textContent = result;
  currentInput = formatResult(result).toString();
  previousInput = "";
  operator = null;
}
function formatResult(num) {
  if (Number.isInteger(num)) return num;
  return parseFloat(num.toFixed(8));
}
const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
});