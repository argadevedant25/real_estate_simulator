
import React from 'react';
import { GameProvider } from '../context/GameContext';
import GameScreen from '../components/GameScreen';

const Index = () => {
  return (
    <GameProvider>
      <div className="max-w-lg mx-auto bg-gray-100 min-h-screen">
        <div className="flex items-center justify-center py-2 bg-gray-200 border-b border-gray-300">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
            <div className="text-gray-700 text-sm">f6.onrender.com</div>
          </div>
        </div>
        <GameScreen />
      </div>
    </GameProvider>
  );
};

export default Index;
