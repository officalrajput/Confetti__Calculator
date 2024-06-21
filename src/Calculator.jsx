import React from 'react';
import Display from './components/Display';
import Button from './components/Button';
import useCalculator from './hooks/useCalculator';
import useConfetti from './hooks/useConfetti';
import ConfettiExplosion from 'react-confetti-explosion';
import History from './components/History'; // Import History component
import './styles/Calculator.css';
import { useState } from 'react';

const Calculator = ({ thememode }) => { // Change themeMode to thememode
  const { handleInput, displayValue, history } = useCalculator();
  const { isExploding, triggerConfetti } = useConfetti();
  const [previousValue, setPreviousValue] = useState(null);
  const [previousOperator, setPreviousOperator] = useState(null);
  const buttons = [
    { label: '(', className: 'number2' },
    { label: ')' , className: 'number2' },
    { label: 'MC' , className: 'number2' },
    { label: 'M+' , className: 'number2' },
    { label: 'M-' , className: 'number2' },
    { label: 'MR' ,className: 'number2' },
    { label: 'C' ,className: 'number2' },
    { label: '+/-' ,className: 'number2' },
    { label: '%' ,className: 'number2' },
    { label: '÷' ,className: 'orange' },
    { label: '2nd' ,className: 'number2' },
    { label: 'x²' ,className: 'number2' },
    { label: 'x³' ,className: 'number2' },
    { label: 'x^y' ,className: 'number2' },
    { label: 'e^x' ,className: 'number2' },
    { label: '10x' ,className: 'number2' },
    { label: '7' ,className: 'number' },
    { label: '8' ,className: 'number' },
    { label: '9' ,className: 'number' },
    { label: '*' ,className: 'orange' },
    { label: '1/x' ,className: 'number2' },
    { label: '√x' ,className: 'number2' },
    { label: '³√x' ,className: 'number2' },
    { label: 'y√x' ,className: 'number2' },
    { label: 'In'  ,className: 'number2' },
    { label: 'log10'  ,className: 'number2' },
    { label: '4'  ,className: 'number' },
    { label: '5'  ,className: 'number' },
    { label: '6'  ,className: 'number' },
    { label: '-'  ,className: 'orange' },
    { label: 'x!'  ,className: 'number2' },
    { label: 'sin'  ,className: 'number2' },
    { label: 'cos'  ,className: 'number2' },
    { label: 'tan'  ,className: 'number2' },
    { label: 'e'  ,className: 'number2' },
    { label: 'EE'  ,className: 'number2' },
    { label: '1'  ,className: 'number' },
    { label: '2'  ,className: 'number' },
    { label: '3'  ,className: 'number' },
    { label: '+'  ,className: 'orange' },
    { label: 'Rad'  ,className: 'rad number2' },
    { label: 'sinh'  ,className: 'number2' },
    { label: 'cosh'  ,className: 'number2' },
    { label: 'tanh' ,className: 'number2' },
    { label: 'π'  ,className: 'number2' },
    { label: 'Rand'  ,className: 'number2' },
    { label: '0' ,className: 'zero number' },
    { label: '.' ,className: 'number' },
    { label: '=', className: 'orange  equal' }
  ];

  const handleButtonClick = (label) => {
    if (!isNaN(label) || label === '=') {
      handleInput(label);
    } else if (['+', '-', '*', '÷'].includes(label)) {
      setPreviousOperator(label);
      setPreviousValue(displayValue);
      handleInput(label);
    } else {
      setPreviousValue(null);
      handleInput(label);
    }
    if (label === '=' && previousOperator && previousValue && parseInt(previousValue) + 1 === parseInt(displayValue)) {
      triggerConfetti();
    }
  }

  return (
    <div className={`calculator ${thememode}`}> {/* Use thememode here */}
      {isExploding && <ConfettiExplosion />}
      <Display value={displayValue} />
      <History history={history} thememode={thememode} /> {/* Pass thememode to History component */}
      <div className="buttons">
        {buttons.map((btn) => (
          <Button
            key={btn.label}
            label={btn.label}
            onClick={() => handleButtonClick(btn.label)}
            className={btn.className}
          />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
