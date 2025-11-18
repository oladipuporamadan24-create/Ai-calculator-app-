import React from 'react';
import Button from './Button';
import { create, all } from 'mathjs';

// Configure mathjs
const math = create(all);

interface ScientificPadProps {
  onInput: (val: string) => void;
  onClear: () => void;
  onDelete: () => void;
  onEqual: () => void;
  onFunction: (func: string) => void;
}

const ScientificPad: React.FC<ScientificPadProps> = ({ onInput, onClear, onDelete, onEqual, onFunction }) => {
  
  return (
    <div className="grid grid-cols-5 gap-3">
      {/* Row 1 */}
      <Button label="deg/rad" variant="scientific" onClick={() => {}} className="opacity-50 cursor-not-allowed" />
      <Button label="(" onClick={() => onInput('(')} variant="scientific" />
      <Button label=")" onClick={() => onInput(')')} variant="scientific" />
      <Button label="C" onClick={onClear} variant="operator" className="!bg-red-100 dark:!bg-red-900/30 !text-red-600 dark:!text-red-400 hover:!bg-red-200" />
      <Button label="DEL" onClick={onDelete} variant="operator" />

      {/* Row 2 */}
      <Button label="sin" onClick={() => onFunction('sin(')} variant="scientific" />
      <Button label="cos" onClick={() => onFunction('cos(')} variant="scientific" />
      <Button label="tan" onClick={() => onFunction('tan(')} variant="scientific" />
      <Button label="%" onClick={() => onInput('%')} variant="scientific" />
      <Button label="÷" onClick={() => onInput('/')} variant="operator" />

      {/* Row 3 */}
      <Button label="ln" onClick={() => onFunction('log(')} variant="scientific" />
      <Button label="7" onClick={() => onInput('7')} />
      <Button label="8" onClick={() => onInput('8')} />
      <Button label="9" onClick={() => onInput('9')} />
      <Button label="×" onClick={() => onInput('*')} variant="operator" />

      {/* Row 4 */}
      <Button label="log" onClick={() => onFunction('log10(')} variant="scientific" />
      <Button label="4" onClick={() => onInput('4')} />
      <Button label="5" onClick={() => onInput('5')} />
      <Button label="6" onClick={() => onInput('6')} />
      <Button label="−" onClick={() => onInput('-')} variant="operator" />

      {/* Row 5 */}
      <Button label="√" onClick={() => onFunction('sqrt(')} variant="scientific" />
      <Button label="1" onClick={() => onInput('1')} />
      <Button label="2" onClick={() => onInput('2')} />
      <Button label="3" onClick={() => onInput('3')} />
      <Button label="+" onClick={() => onInput('+')} variant="operator" />

      {/* Row 6 */}
      <Button label={<span>x<sup>y</sup></span>} onClick={() => onInput('^')} variant="scientific" />
      <Button label="e" onClick={() => onInput('e')} variant="scientific" />
      <Button label="0" onClick={() => onInput('0')} />
      <Button label="." onClick={() => onInput('.')} />
      <Button label="=" onClick={onEqual} variant="action" />
    </div>
  );
};

export default ScientificPad;
