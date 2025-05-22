
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hotel } from '@/data/hotels';
import { Card, CardContent } from '@/components/ui/card';

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="hotel-card cursor-pointer transition-transform hover:scale-[1.01]"
      onClick={() => navigate(`/hotels/${hotel.id}`)}
    >
      <div className="relative">
        <img 
          src={hotel.images[0]} 
          alt={hotel.name} 
          className="hotel-image" 
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md shadow-sm">
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="font-medium">{hotel.rating}</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1">{hotel.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{hotel.location}</p>
        <div className="flex justify-between items-center">
          <div className="text-sm">
            <span className="font-bold text-hotel-primary">${hotel.price}</span> / night
          </div>
          <div className="text-xs text-gray-500">
            {hotel.amenities.slice(0, 3).join(' • ')}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HotelCard;
