
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
  
  // Ref to store all property income intervals
  const incomeIntervalsRef = useRef<Record<string, NodeJS.Timeout>>({});

  // Load game state from localStorage on initial render
  useEffect(() => {
    const savedState = localStorage.getItem('propertyGameState');
    
    if (savedState) {
      const { money, ownedProperties, activeCategory, savedAmount } = JSON.parse(savedState);
      setMoney(money);
      setOwnedProperties(ownedProperties);
      setActiveCategory(activeCategory);
      setSavedAmount(savedAmount);
      
      // Start income generation for all owned properties
      ownedProperties.forEach(property => {
        startPropertyIncome(property);
      });
    }
    
    // Cleanup function to clear all intervals when component unmounts
    return () => {
      Object.values(incomeIntervalsRef.current).forEach(interval => {
        clearInterval(interval);
      });
    };
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
        
        // Add the property and start income generation
        const updatedProperties = [...prevOwnedProperties, property];
        startPropertyIncome(property);
        return updatedProperties;
      });
    } else {
      alert("Not enough money to buy this property!");
    }
  };

  const startPropertyIncome = (property: Property) => {
    // Clear any existing interval for this property
    if (incomeIntervalsRef.current[property.id]) {
      clearInterval(incomeIntervalsRef.current[property.id]);
    }
    
    // Set up new interval for automatic income
    const interval = setInterval(() => {
      addMoney(property.rent);
      console.log(`Earned ${property.rent} from ${property.name}`);
    }, property.time * 1000);
    
    // Store the interval ID
    incomeIntervalsRef.current[property.id] = interval;
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
