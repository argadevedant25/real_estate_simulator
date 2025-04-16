
import React from 'react';
import Header from './Header';
import MoneyInput from './MoneyInput';
import CategorySelector from './CategorySelector';
import PropertyList from './PropertyList';

const GameScreen: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="p-2">
        <MoneyInput />
        <CategorySelector />
        <PropertyList />
      </div>
    </div>
  );
};

export default GameScreen;
