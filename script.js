let operand1 = 0;
let operand2 = null, operator = null;
let displayValue = 0;

let numbers = document.querySelectorAll('.number');
let binOperators = document.querySelectorAll('.binary-operators');
let displayElement = document.querySelectorAll('.display-area');

function updateDisplay() {
  displayElement.textContent = displayValue;
}

function computeResult() {
  let result;
  if (operator === '+') {
    result = sum();
  }
  else if (operator === '-') {
    result = difference();
  }
  else if (operator === '/') {
    result = multiply();
  }
  else {
    result = divide();
  }
}

numbers.forEach((numberButton) => {
  numberButton.addEventListener('click', (event) => {
    const numValue = Number(numberButton.textContent);
    if (operator === null) {
      operand1 = 10 * operand1 + numValue;
      displayValue = operand1.toString();
      updateDisplay(displayValue);
    }
    else {
      if (operand2 === null)
        operand2 = 0;
      operand2 = 10 * operand2 + numValue;
    }
  })
});

binOperators.forEach((operatorButton) => {
  operatorButton.addEventListener('click', (event) => {
    const operatorVal = operatorButton.textContent;
    if (operator === null) {
      operator = operatorVal;
    }
    else {
      if (operand2 === null) {
        operator = operatorVal;
      }
      else {
        computeResult();
      }
    }
  });
});