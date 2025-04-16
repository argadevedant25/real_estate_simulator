
import React, { useEffect, useState } from 'react';
import { Property } from '../data/properties';
import { useGame } from '../context/GameContext';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { buyProperty, money, ownedProperties } = useGame();
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const canBuy = money >= property.cost;
  
  const isOwned = ownedProperties.some(p => p.id === property.id);
  
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isOwned) {
      // Reset timer when property is first owned
      setTimeLeft(property.time);
      
      interval = setInterval(() => {
        setTimeLeft(prevTime => {
          const newTime = prevTime - 1;
          // Calculate progress percentage
          const progressPercent = 100 - (newTime / property.time * 100);
          setProgress(progressPercent);
          
          if (newTime <= 0) {
            return property.time; // Reset timer when it reaches 0
          }
          return newTime;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOwned, property.time]);
  
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
          
          <div>
            {!isOwned && (
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
        
        {isOwned && (
          <div className="mt-3">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 rounded-full transition-all duration-1000" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-xs text-center mt-1 text-gray-500">
              Next rent: {timeLeft}s
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
