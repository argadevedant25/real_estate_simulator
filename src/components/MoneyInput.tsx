
import React, { useState } from 'react';
import { useGame } from '../context/GameContext';

const MoneyInput: React.FC = () => {
  const { saveMoney, savedAmount } = useGame();
  const [inputValue, setInputValue] = useState<string>(savedAmount.toString());

  const handleSave = () => {
    const amount = parseFloat(inputValue);
    if (!isNaN(amount)) {
      saveMoney(amount);
    }
  };

  return (
    <div className="flex border rounded-lg border-green-200 my-4 mx-auto w-full max-w-md overflow-hidden">
      <input
        type="text"
        className="currency-input"
        value={`$${inputValue}`}
        onChange={(e) => {
          const value = e.target.value.replace('$', '');
          setInputValue(value);
        }}
      />
      <button onClick={handleSave} className="save-button">
        Save
      </button>
    </div>
  );
};

export default MoneyInput;
