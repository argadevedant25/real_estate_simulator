
import React from 'react';
import { propertyCategories } from '../data/properties';
import PropertyCard from './PropertyCard';
import { useGame } from '../context/GameContext';

const PropertyList: React.FC = () => {
  const { activeCategory } = useGame();
  
  const currentCategory = propertyCategories.find(
    category => category.id === activeCategory
  );

  if (!currentCategory) {
    return <div>Category not found</div>;
  }

  return (
    <div className="px-2 py-4">
      <h2 className="text-lg font-semibold mb-4">{currentCategory.name}</h2>
      <div className="space-y-4">
        {currentCategory.properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
