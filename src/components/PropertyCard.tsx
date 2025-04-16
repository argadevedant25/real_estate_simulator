
import React from 'react';
import { Property } from '../data/properties';
import { useGame } from '../context/GameContext';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { buyProperty, money, ownedProperties, collectRent } = useGame();
  const canBuy = money >= property.cost;
  
  const isOwned = ownedProperties.some(p => p.id === property.id);
  
  return (
    <Card className="property-card mb-4 overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <img 
              src={property.image} 
              alt={property.name} 
              className="w-12 h-12 object-cover rounded"
            />
            <div>
              <div className="font-medium">{property.name}</div>
              <div className="text-sm text-gray-500">
                Cost: ${property.cost.toFixed(2)} | Rent: ${property.rent.toFixed(2)} 
                {isOwned && <span className="text-green-500 ml-1">✓</span>}
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            {isOwned ? (
              <>
                <Button 
                  size="sm" 
                  onClick={() => collectRent(property)}
                  variant="outline"
                >
                  Rent
                </Button>
                <Button 
                  size="sm"
                  variant="secondary"
                >
                  Manage
                </Button>
              </>
            ) : (
              <Button 
                size="sm"
                onClick={() => buyProperty(property)}
                disabled={!canBuy}
                variant={canBuy ? "default" : "outline"}
              >
                Buy
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
