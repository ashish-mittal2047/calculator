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

function isDisplayFull() {
  if (displayElement.textContent[0] === '-') {
    if (displayElement.textContent.length >= 10)
      return true;
  }
  else {
    if (displayElement.textContent.length >= 9)
      return true;
  }
  return false;
}

/********* Named event handlers ************/
function numberEventHandler(event) {
  let numValue;
  if (event instanceof KeyboardEvent) {
    numValue = event.key;
  }
  else numValue = event.target.textContent;

  if (operator === null) {
    if (isDisplayFull()) {
      return;
    }

    if (!operand1.includes('.') && Number(operand1) === 0) {
      operand1 = numValue;
    }
    else operand1 = operand1 + numValue;
    displayValue = operand1;
    updateDisplay();
  }
  else {
    if (operand2 === null)
      operand2 = "0";
    if (!operand2.includes('.') && Number(operand2) === 0)
      operand2 = numValue;
    else {
      if (isDisplayFull())
        return;
      operand2 = operand2 + numValue;
    }
    displayValue = operand2;
    updateDisplay();
  }
}

function binOperatorsEventHandler(event) {
  let operatorVal;
  if (event instanceof KeyboardEvent) {
    operatorVal = event.key;
  }
  else {
    operatorVal = event.target.textContent;
  }
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
}

function equalsButtonEventHandler(e) {
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
}

function decimalButtonEventHandler(e) {
  let displayString = displayElement.textContent;
  if (isDisplayFull())
    return;

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
}

function deleteButtonEventHandler(e) {
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
}

/*******************************************/
numbers.forEach((numberButton) => {
  numberButton.addEventListener('click', numberEventHandler);
});

binOperators.forEach((operatorButton) => {
  operatorButton.addEventListener('click', binOperatorsEventHandler);
});

equalsButton.addEventListener('click', equalsButtonEventHandler);

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

decimalButton.addEventListener('click', decimalButtonEventHandler);

deleteButton.addEventListener('click', deleteButtonEventHandler);

/****** Attach keyboard event listeners ******/

document.addEventListener('keydown', (event) => {
  const numKeys = "0123456789";
  const binOperatorKeys = "+-*/";
  const equalsKey = "=";
  if (numKeys.includes(event.key)) {
    numberEventHandler(event);
  }
  else if (binOperatorKeys.includes(event.key)) {
    binOperatorsEventHandler(event);
  }
  else if (equalsKey.includes(event.key)) {
    equalsButtonEventHandler(event);
  }
  else if (event.key === ".") {
    decimalButtonEventHandler(event);
  }
  else if (event.code === "Backspace") {
    deleteButtonEventHandler(event);
  }
});