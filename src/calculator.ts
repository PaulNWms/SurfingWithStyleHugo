enum FsmState { Number1, Number2display1, Number2, Equals };

let state: FsmState;
let display: HTMLInputElement = document.getElementById("display") as HTMLInputElement;
let value: number = 0.0;
let oldValue: number = 0.0;
let newValue: number = 0.0;
let binaryOp: string = ' ';

function negate() { setValue(-value); }
function squareRoot() { setValue(Math.sqrt(value)); }
function invert() { setValue(1.0 / value); }
function percent() { setValue(oldValue * value / 100.0); }
function correctError() { display.value = "0"; }

function clear() {
    oldValue = newValue = 0;
    correctError();
    state = FsmState.Number1;
}

function equals() {
    if (state === FsmState.Number2) {
        newValue = value;
    }

    switch (binaryOp) {
        case '+':
            setValue(oldValue + newValue);
            break;
        case '-':
            setValue(oldValue - newValue);
            break;
        case '*':
            setValue(oldValue * newValue);
            break;
        case '/':
            setValue(oldValue / newValue);
            break;
    }

    oldValue = value;
    state = FsmState.Equals;
}

function setValue(n: number) {
    value = n;
    display.value = value.toString();
}

function binaryOperator(op: string) {
    binaryOp = op;
    oldValue = value;
    value = 0.0;
    state = FsmState.Number2display1;
}

function digit(c: string) {
    switch (state) {
        case FsmState.Number2display1:
        case FsmState.Equals:
            setValue(0);
            state = FsmState.Number2;
            break;
        default:
            break;
    }

    parseAndFormat(c);
}

function parseAndFormat(c: string) {
    // backspace
    if (c === '\b') {
        if (display.value.length > 1) {
            display.value = display.value.substring(0, display.value.length - 1);
        }
        else {
            display.value = "0";
        }
    }
    else {
        display.value += c;
    }

    if (c !== '0') {
        value = parseFloat(display.value);
        display.value = value.toString();
    }

    if (c === '.') {
        let isInteger: boolean = ((value % 1) === 0);

        if (isInteger) {
            display.value += '.';
        }
    }
}

(function () {
    clear();
    let w = window as any;
    w.binaryOperator = binaryOperator;
    w.clear = clear;
    w.correctError = correctError;
    w.digit = digit;
    w.equals = equals;
    w.invert = invert;
    w.negate = negate;
    w.percent = percent;
    w.setValue = setValue;
    w.squareRoot = squareRoot;
})();
