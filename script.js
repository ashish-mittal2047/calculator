let operand1 = "0";
let operand2 = null, operator = null;
let displayValue = "0";

const numbers = document.querySelectorAll('.number');
const binOperators = document.querySelectorAll('.binary-operator');
const displayElement = document.querySelector('.display-area');
const equalsButton = document.querySelector('.eql-btn');

function updateDisplay() {
  displayElement.textContent = displayValue;
}

let sum = () => {
  return Number(operand1) + Number(operand2);
}

let difference = () => {
  return Number(operand1) - Number(operand2);
}

let multiply = () => {
  return Number(operand1) * Number(operand2);
}

let divide = () => {
  if (Number(operand2) === 0)
    return "ERROR";
  return Number(operand1) / Number(operand2);
}

function adjustPrecision(result) {
  if (result != "ERROR") {
    result = result.toString();
    let preDecimalPart = result.split('.')[0];
    let fractionPrecision;
    if (preDecimalPart[0] === '-') {
      if (preDecimalPart.length > 10) {
        return "TOO BIG";
      }
      fractionPrecision = 10 - preDecimalPart.length - 1;
    }
    else {
      if (preDecimalPart.length > 9) {
        return "TOO BIG";
      }
      fractionPrecision = 9 - preDecimalPart.length - 1;
    }
    if (result.includes('.')) {
      if (fractionPrecision >= 1) {
        result = Number(result).toFixed(fractionPrecision);
      }
      else {
        result = Number(result).toFixed(0);
      }
      return result.toString();
    }
  }
  return result;
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
    result = divide();
  }
  else {
    result = multiply();
  }

  result = adjustPrecision(result);
  return result;
}

numbers.forEach((numberButton) => {
  numberButton.addEventListener('click', (event) => {
    const numValue = numberButton.textContent;
    if (displayElement.textContent[0] === '-') {
      if (displayElement.textContent.length >= 10)
        return;
    }
    else {
      if (displayElement.textContent.length >= 9)
        return;
    }
    if (operator === null) {
      if (Number(operand1) === 0) {
        operand1 = numValue;
      }
      else operand1 = operand1 + numValue;
      displayValue = operand1;
      updateDisplay();
    }
    else {
      if (operand2 === null)
        operand2 = "0";
      if (Number(operand2) === 0)
        operand2 = numValue;
      else operand2 = operand2 + numValue;
      displayValue = operand2;
      updateDisplay();
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
        if (result === 'TOO BIG') {
          operand1 = "0";
          operator = null;
        }
        else {
          operand1 = result;
          operator = operatorVal;
        }
        operand2 = null;
        displayValue = result;
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
    if (result === 'TOO BIG') {
      operand1 = "0";
    }
    else {
      operand1 = result;
    }
    operator = null;
    operand2 = null;
    displayValue = result;
    updateDisplay();
  }
});

const clearButton = document.querySelector('.clr-btn');
const signReverseButton = document.querySelector('.sign-reverse-btn');
const percentButton = document.querySelector('.percent-btn');
const decimalButton = document.querySelector('.decimal-btn');
const deleteButton = document.querySelector('.del-btn');

clearButton.addEventListener('click', (event) => {
  operand1 = "0";
  operand2 = null;
  operator = null;
  displayValue = "0";
  updateDisplay();
});

signReverseButton.addEventListener('click', (event) => {
  if (operand2 === null) {
    if (operand1[0] != '-')
      operand1 = "-" + operand1;
    else operand1 = operand1.slice(1);
    displayValue = operand1;
    updateDisplay();
    operator = null;
  }
  else {
    if (operand2[0] != '-')
      operand2 = "-" + operand2;
    else operand2 = operand2.slice(1);
    displayValue = operand2;
    updateDisplay();
    operator = null;
  }
});

percentButton.addEventListener('click', (event) => {
  if (operand2 === null) {
    operand1 = Number(operand1) * 0.01;
    operand1 = adjustPrecision(operand1);
    displayValue = operand1;
    updateDisplay();
    operator = null;
  }
  else {
    operand2 = Number(operand2) * 0.01;
    operand2 = adjustPrecision(operand2);
    displayValue = operand2;
    updateDisplay();
  }
});

decimalButton.addEventListener('click', (event) => {
  let displayString = displayElement.textContent;
  if (displayString[0] === '-') {
    if (displayString.length >= 10)
      return;
  }
  else {
    if (displayString.length >= 9)
      return;
  }
  if (displayString.includes('.')) {
    return;
  }
  else {
    if (operand2 === null) {
      operand1 = operand1 + '.';
      displayValue = operand1;
    }
    else {
      operand2 = operand2 + '.';
      displayValue = operand2;
    }
    updateDisplay();
  }
});

deleteButton.addEventListener('click', (event) => {
  if (operand2 === null) {
    operand1 = operand1.slice(0, -1);
    if (operand1 === '')
      operand1 = "0";
    displayValue = operand1;
  }
  else {
    operand2 = operand2.slice(0, -1);
    if (operand2 === '')
      operand2 = "0";
    displayValue = operand2;
  }
  updateDisplay();
});
