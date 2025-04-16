
import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { Property, propertyCategories } from '../data/properties';

interface GameContextType {
  money: number;
  addMoney: (amount: number) => void;
  subtractMoney: (amount: number) => void;
  ownedProperties: Property[];
  buyProperty: (property: Property) => void;
  collectRent: (property: Property) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  saveMoney: (amount: number) => void;
  savedAmount: number;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [money, setMoney] = useState<number>(20);
  const [ownedProperties, setOwnedProperties] = useState<Property[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("starter");
  const [savedAmount, setSavedAmount] = useState<number>(10);
  
  // We'll remove the automatic income intervals since we're using manual collection
  
  // Load game state from localStorage on initial render
  useEffect(() => {
    const savedState = localStorage.getItem('propertyGameState');
    
    if (savedState) {
      const { money, ownedProperties, activeCategory, savedAmount } = JSON.parse(savedState);
      setMoney(money);
      setOwnedProperties(ownedProperties);
      setActiveCategory(activeCategory);
      setSavedAmount(savedAmount);
    }
  }, []);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('propertyGameState', JSON.stringify({
      money,
      ownedProperties,
      activeCategory,
      savedAmount
    }));
  }, [money, ownedProperties, activeCategory, savedAmount]);

  const addMoney = (amount: number) => {
    setMoney(prevMoney => prevMoney + amount);
  };

  const subtractMoney = (amount: number) => {
    setMoney(prevMoney => Math.max(0, prevMoney - amount));
  };

  const collectRent = (property: Property) => {
    addMoney(property.rent);
    console.log(`Collected ${property.rent} from ${property.name}`);
  };

  const buyProperty = (property: Property) => {
    if (money >= property.cost) {
      subtractMoney(property.cost);
      setOwnedProperties(prevOwnedProperties => {
        // Check if property is already owned
        if (prevOwnedProperties.some(p => p.id === property.id)) {
          return prevOwnedProperties;
        }
        
        // Add the property
        return [...prevOwnedProperties, property];
      });
    }
  };

  const saveMoney = (amount: number) => {
    if (amount > 0) {
      setSavedAmount(amount);
    }
  };

  return (
    <GameContext.Provider value={{
      money,
      addMoney,
      subtractMoney,
      ownedProperties,
      buyProperty,
      collectRent,
      activeCategory,
      setActiveCategory,
      saveMoney,
      savedAmount
    }}>
      {children}
    </GameContext.Provider>
  );
};
