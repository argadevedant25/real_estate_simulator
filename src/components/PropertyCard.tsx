
import React, { useState, useEffect } from 'react';
import { Property } from '../data/properties';
import { useGame } from '../context/GameContext';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Clock } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { buyProperty, money, ownedProperties, collectRent } = useGame();
  const canBuy = money >= property.cost;
  const isOwned = ownedProperties.some(p => p.id === property.id);
  
  // Progress state for timer
  const [progress, setProgress] = useState(0);
  const [timerRunning, setTimerRunning] = useState(isOwned);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    if (isOwned && timerRunning) {
      // Reset progress when timer starts
      setProgress(0);
      
      // Calculate time interval based on property.time
      const interval = (property.time * 1000) / 100; // Divide property time into 100 steps
      
      timer = setInterval(() => {
        setProgress(prevProgress => {
          const newProgress = prevProgress + 1;
          if (newProgress >= 100) {
            // Reset timer when complete
            setTimerRunning(false);
            return 100;
          }
          return newProgress;
        });
      }, interval);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isOwned, timerRunning, property.time]);

  const handleCollectRent = () => {
    collectRent(property);
    // Restart timer
    setTimerRunning(true);
  };
  
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
                  onClick={handleCollectRent}
                  variant="outline"
                  disabled={progress < 100 && timerRunning}
                >
                  {progress < 100 && timerRunning ? (
                    <Clock className="w-4 h-4 mr-1" />
                  ) : null}
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
        
        {/* Add progress bar */}
        {isOwned && (
          <div className="mt-2">
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
