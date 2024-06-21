import { useState } from 'react';
import { evaluate, sqrt, pow, log10, exp, factorial, sin, cos, tan, pi, e, random } from 'mathjs';

const useCalculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [operand1, setOperand1] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [memory, setMemory] = useState(null);
  const [isRadians, setIsRadians] = useState(true);
  const [history, setHistory] = useState([]);

  const handleInput = (input) => {
    if (input === 'AC') {
      clearAll();
    } else if (input === 'MC') {
      clearHistory(); // Updated to clear history
    } else if (input === 'MR') {
      recallMemory();
    } else if (input === 'M+') {
      addToMemory();
    } else if (input === 'M-') {
      subtractFromMemory();
    } else if (input === 'C') {
      clearDisplayValue(); // Updated to clear only display value
    } else if (['+', '-', '*', '÷'].includes(input)) {
      handleOperator(input);
    } else if (input === '=') {
      calculateResult();
    } else if (input === '.') {
      addDecimal();
    } else if (input === '+/-') {
      toggleSign();
    } else if (input === '%') {
      calculatePercentage();
    } else if (input === '√') {
      calculateSquareRoot();
    } else if (input === 'x²') {
      calculateSquare();
    } else if (input === 'x³') {
      calculateCube();
    } else if (input === '1/x') {
      calculateReciprocal();
    } else if (input === 'x!') {
      calculateFactorial();
    } else if (input === 'sin' || input === 'cos' || input === 'tan') {
      handleTrigonometric(input);
    } else if (input === 'π') {
      insertPi();
    } else if (input === 'Rand') {
      generateRandomNumber();
    } else if (input === 'log10') {
      calculateLog10();
    } else {
      appendDigit(input);
    }
  };

  const clearAll = () => {
    setDisplayValue('0');
    setOperator(null);
    setOperand1(null);
    setWaitingForOperand(false);
    setMemory(null);
    setIsRadians(true);
    setHistory([]);
  };

  const clearMemory = () => {
    setMemory(null);
  };

  const recallMemory = () => {
    if (memory !== null) {
      setDisplayValue(memory.toString());
    }
  };

  const addToMemory = () => {
    if (memory !== null) {
      setMemory(memory + parseFloat(displayValue));
    } else {
      setMemory(parseFloat(displayValue));
    }
  };

  const subtractFromMemory = () => {
    if (memory !== null) {
      setMemory(memory - parseFloat(displayValue));
    } else {
      setMemory(-parseFloat(displayValue));
    }
  };

  const clearDisplayValue = () => {
    setDisplayValue('0');
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const clearLastEntry = () => {
    setDisplayValue(displayValue.slice(0, -1) || '0');
    if (displayValue.length === 1) {
      setDisplayValue('0');
    }
  };

  const handleOperator = (op) => {
    if (operator && waitingForOperand) {
      setOperator(op);
      return;
    }

    if (operator) {
      performOperation();
    }

    setOperand1(parseFloat(displayValue));
    setDisplayValue(displayValue + op);
    setWaitingForOperand(true);
    setOperator(op);
  };

  const performOperation = () => {
    const currentValue = parseFloat(displayValue);
    let newValue = operand1;

    switch (operator) {
      case '+':
        newValue += currentValue;
        break;
      case '-':
        newValue -= currentValue;
        break;
      case '*':
        newValue *= currentValue;
        break;
      case '÷':
        if (currentValue === 0) {
          setDisplayValue('Invalid input'); // Handling division by zero
          setOperand1(null);
          setOperator(null);
          setWaitingForOperand(false);
          return;
        }
        newValue /= currentValue;
        break;
      default:
        break;
    }

    const historyEntry = `${operand1} ${operator} ${currentValue} = ${newValue}`;
    setHistory([...history, historyEntry]);

    setDisplayValue(newValue.toString());
    setOperand1(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const calculateResult = () => {
    if (!operator || waitingForOperand) {
      return;
    }

    performOperation();
  };

  const addDecimal = () => {
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const toggleSign = () => {
    setDisplayValue((parseFloat(displayValue) * -1).toString());
  };

  const calculatePercentage = () => {
    const percentValue = parseFloat(displayValue) / 100;
    setDisplayValue(percentValue.toString());
  };

  const calculateSquareRoot = () => {
    const squareRoot = sqrt(parseFloat(displayValue));
    setDisplayValue(squareRoot.toString());
  };

  const calculateSquare = () => {
    const squaredValue = pow(parseFloat(displayValue), 2);
    setDisplayValue(squaredValue.toString());
  };

  const calculateCube = () => {
    const cubedValue = pow(parseFloat(displayValue), 3);
    setDisplayValue(cubedValue.toString());
  };

  const calculateReciprocal = () => {
    const reciprocalValue = 1 / parseFloat(displayValue);
    setDisplayValue(reciprocalValue.toString());
  };

  const calculateFactorial = () => {
    const factorialValue = factorial(parseFloat(displayValue));
    setDisplayValue(factorialValue.toString());
  };

  const handleTrigonometric = (func) => {
    let result;
    if (func === 'sin') {
      result = isRadians ? sin(parseFloat(displayValue)) : sin(parseFloat(displayValue) * (pi / 180));
    } else if (func === 'cos') {
      result = isRadians ? cos(parseFloat(displayValue)) : cos(parseFloat(displayValue) * (pi / 180));
    } else if (func === 'tan') {
      result = isRadians ? tan(parseFloat(displayValue)) : tan(parseFloat(displayValue) * (pi / 180));
    }
    setDisplayValue(result.toString());
  };

  const insertPi = () => {
    setDisplayValue(pi.toString());
  };

  const generateRandomNumber = () => {
    const randomValue = random();
    setDisplayValue(randomValue.toString());
  };

  const calculateLog10 = () => {
    const logValue = log10(parseFloat(displayValue));
    setDisplayValue(logValue.toString());
  };

  const appendDigit = (digit) => {
    if (waitingForOperand) {
      setDisplayValue(digit);
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  };

  return {
    handleInput,
    displayValue,
    history,
  };
};

export default useCalculator;
