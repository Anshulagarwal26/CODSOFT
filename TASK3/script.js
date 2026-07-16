const display = document.getElementById("display");

let currentInput = "0";      // number being typed
let storedValue = null;      // left operand
let pendingOperator = null;  // + - * /
let lastEquals = false;

let expression = "";         // what we show on display (e.g., "4+4")

function setDisplay(value) {
  display.textContent = value;
}

function formatNumber(n) {
  if (!isFinite(n)) return "Error";
  const s = String(n);
  return s.length > 14 ? n.toPrecision(10) : s;
}

function compute(a, op, b) {
  if (op === "+") return a + b;
  if (op === "-") return a - b;
  if (op === "*") return a * b;
  if (op === "/") return b === 0 ? NaN : a / b;
  return b;
}

function clearAll() {
  currentInput = "0";
  storedValue = null;
  pendingOperator = null;
  lastEquals = false;
  expression = "";
  setDisplay("0");
}

function inputDigit(d) {
  if (lastEquals) {
    currentInput = "0";
    storedValue = null;
    pendingOperator = null;
    expression = "";
    lastEquals = false;
  }

  if (currentInput === "0") currentInput = d;
  else currentInput += d;

  // update expression to "...op<currentInput>"
  if (pendingOperator === null) {
    setDisplay(currentInput);
  } else {
    setDisplay(expression + currentInput);
  }
}

function inputDot() {
  if (lastEquals) {
    currentInput = "0";
    storedValue = null;
    pendingOperator = null;
    expression = "";
    lastEquals = false;
  }

  if (!currentInput.includes(".")) {
    currentInput += ".";
    if (pendingOperator === null) setDisplay(currentInput);
    else setDisplay(expression + currentInput);
  }
}

function backspace() {
  if (lastEquals) return;

  if (currentInput.length <= 1) currentInput = "0";
  else currentInput = currentInput.slice(0, -1);

  if (pendingOperator === null) setDisplay(currentInput);
  else setDisplay(expression + currentInput);
}

function operatorSymbol(op) {
  if (op === "+") return "+";
  if (op === "-") return "-";
  if (op === "*") return "*";
  if (op === "/") return "/";
  return op;
}

function applyOperator(op) {
  const inputNumber = Number(currentInput);

  if (storedValue === null) {
    storedValue = inputNumber;
  } else if (pendingOperator !== null) {
    // chaining: if user does 4 + 4 + 3, we compute 4+4 when second + is pressed
    const result = compute(storedValue, pendingOperator, inputNumber);
    storedValue = result;
    expression = formatNumber(result) + operatorSymbol(op);
    currentInput = "0";
    pendingOperator = op;
    setDisplay(expression + currentInput);
    return;
  }

  pendingOperator = op;
  expression = formatNumber(storedValue) + operatorSymbol(op);
  currentInput = "0";
  lastEquals = false;

  setDisplay(expression + currentInput);
}

function equals() {
  if (pendingOperator === null || storedValue === null) return;

  const inputNumber = Number(currentInput);
  const result = compute(storedValue, pendingOperator, inputNumber);

  setDisplay(formatNumber(result));

  currentInput = String(result);
  storedValue = null;
  pendingOperator = null;
  expression = "";
  lastEquals = true;
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  if (btn.dataset.value !== undefined) {
    inputDigit(btn.dataset.value);
    return;
  }

  if (btn.dataset.operator) {
    applyOperator(btn.dataset.operator);
    return;
  }

  const action = btn.dataset.action;

  if (action === "clear") clearAll();
  else if (action === "back") backspace();
  else if (action === "dot") inputDot();
  else if (action === "equals") equals();
});

// initial display
setDisplay("0");