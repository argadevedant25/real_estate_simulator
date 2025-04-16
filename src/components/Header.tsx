
import React from 'react';
import { useGame } from '../context/GameContext';

const Header: React.FC = () => {
  const { money } = useGame();

  return (
    <div className="flex justify-between items-center px-4 py-2 bg-gray-100">
      <div className="text-xl font-bold">${money.toFixed(2)}</div>
      <div className="text-sm text-gray-600">Property Tycoon</div>
    </div>
  );
};

export default Header;
