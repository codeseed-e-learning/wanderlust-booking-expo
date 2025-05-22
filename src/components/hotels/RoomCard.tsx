
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Room } from '@/data/hotels';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface RoomCardProps {
  hotelId: string;
  room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ hotelId, room }) => {
  const navigate = useNavigate();

  return (
    <Card className="room-card">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3">
          <img
            src={room.images[0]}
            alt={room.name}
            className="rounded-md w-full h-40 object-cover"
          />
        </div>
        
        <div className="w-full md:w-2/3 flex flex-col">
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{room.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{room.description}</p>
            
            <div className="mt-2">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Capacity:</span> {room.capacity} {room.capacity > 1 ? 'persons' : 'person'}
              </div>
              
              <div className="mt-2 flex flex-wrap gap-2">
                {room.amenities.slice(0, 5).map((amenity, index) => (
                  <span key={index} className="text-xs bg-gray-100 rounded-full px-2 py-1">
                    {amenity}
                  </span>
                ))}
                {room.amenities.length > 5 && (
                  <span className="text-xs bg-gray-100 rounded-full px-2 py-1">
                    +{room.amenities.length - 5} more
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div>
              <span className="font-bold text-xl text-hotel-primary">${room.price}</span>
              <span className="text-sm text-gray-500"> / night</span>
            </div>
            
            <Button 
              onClick={() => navigate(`/hotels/${hotelId}/rooms/${room.id}`)}
              className="bg-hotel-primary hover:bg-hotel-secondary"
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RoomCard;
