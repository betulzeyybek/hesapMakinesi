const display = document.querySelector(".hesaplama-input");
const keys = document.querySelector(".hesaplama-tus");

let displayValue = "0";
let firstValue = null;
let islem = null;
let waitingForSecondValue = false;

function updateDisplay() {
    display.value = displayValue;
}

keys.addEventListener("click", (e) => {
    const element = e.target;

    if (!element.matches("button")) return;

    const value = element.value;

    if (["+", "-", "*", "/", "%", "="].includes(value)) {
        handleOperator(value);
    } else if (value === ".") {
        inputDecimal();
    } else if (value === "clear") {
        clear();
    } else if (value === "+/-") {
        toggleSign();
    } else {
        inputNumber(value);
    }

    updateDisplay();
});

function handleOperator(nextOperator) {
    const currentValue = parseFloat(displayValue);

    if (islem && waitingForSecondValue) {
        islem = nextOperator;
        return;
    }

    if (firstValue === null) {
        firstValue = currentValue;
    } else if (islem) {
        firstValue = calculate(firstValue, currentValue, islem);
        displayValue = `${parseFloat(firstValue.toFixed(7))}`;
    }

    islem = nextOperator;
    waitingForSecondValue = true;
}

function calculate(first, second, islem) {
    switch (islem) {
        case "+":
            return first + second;
        case "-":
            return first - second;
        case "*":
            return first * second;
        case "/":
            return first / second;
        case "%":
            return first % second;
        default:
            return second;
    }
}

function inputNumber(sayi) {
    displayValue = waitingForSecondValue ? sayi : displayValue === "0" ? sayi : displayValue + sayi;
    waitingForSecondValue = false;
}

function inputDecimal() {
    if (!displayValue.includes(".")) displayValue += ".";
}

function toggleSign() {
    if (displayValue !== "0") displayValue = (parseFloat(displayValue) * -1).toString();
}

function clear() {
    displayValue = "0";
    firstValue = null;
    islem = null;
    waitingForSecondValue = false;
}

updateDisplay();
document.addEventListener("keydown", (e) => {
    const keyMap = {
        "0": "0",
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
        "5": "5",
        "6": "6",
        "7": "7",
        "8": "8",
        "9": "9",
        "+": "+",
        "-": "-",
        "*": "*",
        "/": "/",
        "%": "%",
        Enter: "=",
        "=": "=",
        ".": ".",
        Backspace: "clear",
        c: "clear",
        C: "clear",
        "~": "+/-",
    };

    const value = keyMap[e.key];
    if (!value) return;

    const button = Array.from(keys.querySelectorAll("button")).find((btn) => btn.value === value);
    if (!button) return;

    button.classList.add("active");
    setTimeout(() => button.classList.remove("active"), 150);

    button.click();
});
