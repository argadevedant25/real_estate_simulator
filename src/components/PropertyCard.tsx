
import React from 'react';
import { Property } from '../data/properties';
import { useGame } from '../context/GameContext';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { buyProperty, money } = useGame();
  const canBuy = money >= property.cost;

  return (
    <div className="property-card">
      <div className="flex justify-between items-start">
        <div className="property-info">
          <img src={property.image} alt={property.name} className="property-icon" />
          <div className="property-title">{property.name}</div>
        </div>
        <button 
          className="buy-button" 
          onClick={() => buyProperty(property)}
          disabled={!canBuy}
          style={{ opacity: canBuy ? 1 : 0.6 }}
        >
          Buy
        </button>
      </div>
      
      <div className="property-stats">
        {`{"cost":"${property.cost.toFixed(2)}","level":"${property.level}","rent":"${property.rent}","time":"${property.time}"}`}
      </div>
      
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: '50%' }}></div>
      </div>
    </div>
  );
};

export default PropertyCard;
