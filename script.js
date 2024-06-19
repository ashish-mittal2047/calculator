let operand1 = 0;
let operand2 = null, operator = null;
let displayValue = 0;

const numbers = document.querySelectorAll('.number');
const binOperators = document.querySelectorAll('.binary-operators');
const displayElement = document.querySelectorAll('.display-area');
const equalsButton = document.querySelector('.eql-btn');

function updateDisplay() {
  displayElement.textContent = displayValue;
}

let sum = () => {
  return operand1 + operand2;
}

let difference = () => {
  return operand1 - operand2;
}

let multiply = () => {
  return operand1 * operand2;
}

let divide = () => {
  if (operand2 === 0)
    return "ERROR";
  return operand1 / operand2
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
  return result;
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
        let result = computeResult();
        displayValue = result;
        operand1 = result;
        operator = operatorVal;
        operand2 = null;
        updateDisplay();
      }
    }
  });
});

equalsButton.addEventListener('click', (event) => {
  if (operand2 === null) {
    // do nothing
  }
  else {
    let result = computeResult();
    operand1 = result;
    operand2 = null;
    operator = null;
    displayValue = result;
    updateDisplay();
  }
});

