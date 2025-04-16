
import React from 'react';
import { propertyCategories } from '../data/properties';
import { useGame } from '../context/GameContext';

const CategorySelector: React.FC = () => {
  const { activeCategory, setActiveCategory } = useGame();

  return (
    <div className="flex justify-around my-4 px-4">
      {propertyCategories.map((category) => (
        <button
          key={category.id}
          className={`px-3 py-1 rounded-full text-sm ${
            activeCategory === category.id
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveCategory(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
