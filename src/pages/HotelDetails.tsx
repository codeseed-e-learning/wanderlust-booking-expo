
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getHotelById } from '@/data/hotels';
import RoomCard from '@/components/hotels/RoomCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, MapPin, Star, Users } from 'lucide-react';

const HotelDetails = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState(1);
  
  const hotel = hotelId ? getHotelById(hotelId) : undefined;
  
  if (!hotel) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-2">Hotel Not Found</h2>
        <p className="text-gray-500 mb-4">The hotel you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/search')}>Back to Search</Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      {/* Hotel Images Gallery */}
      <div className="space-y-2">
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <img
            src={hotel.images[selectedImageIndex]}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2">
          {hotel.images.map((image, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 ${
                selectedImageIndex === index ? 'border-hotel-primary' : 'border-transparent'
              }`}
              onClick={() => setSelectedImageIndex(index)}
            >
              <img
                src={image}
                alt={`${hotel.name} - ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Hotel Information */}
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">{hotel.name}</h1>
            <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
              <MapPin className="h-4 w-4" />
              <span>{hotel.location}</span>
            </div>
          </div>
          
          <div className="flex items-center bg-hotel-primary text-white px-2 py-1 rounded-lg">
            <Star className="h-4 w-4 mr-1 text-yellow-300" />
            <span className="font-medium">{hotel.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-700">{hotel.description}</p>
        
        {/* Amenities */}
        <div>
          <h3 className="font-medium mb-2">Amenities</h3>
          <div className="flex flex-wrap gap-2">
            {hotel.amenities.map((amenity, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Booking Form */}
      <div className="bg-gray-50 p-4 rounded-lg border">
        <h3 className="font-medium mb-3">Check Availability</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <label className="text-sm">Check-in</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkInDate ? format(checkInDate, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={checkInDate}
                  onSelect={setCheckInDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm">Check-out</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkOutDate ? format(checkOutDate, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={checkOutDate}
                  onSelect={setCheckOutDate}
                  initialFocus
                  disabled={(date) => 
                    date < new Date() || (checkInDate ? date <= checkInDate : false)
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="text-sm mb-2 block">Guests</label>
          <div className="flex items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setGuests(prev => Math.max(1, prev - 1))}
              disabled={guests <= 1}
            >
              -
            </Button>
            <Input
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
              className="w-16 mx-2 text-center"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setGuests(prev => prev + 1)}
            >
              +
            </Button>
            <Users className="ml-2 h-4 w-4 text-gray-400" />
          </div>
        </div>
        
        <Button 
          className="w-full bg-hotel-primary hover:bg-hotel-secondary"
          onClick={() => {
            if (checkInDate && checkOutDate) {
              navigate(`/search?checkIn=${format(checkInDate, 'yyyy-MM-dd')}&checkOut=${format(checkOutDate, 'yyyy-MM-dd')}&guests=${guests}`);
            } else {
              alert('Please select check-in and check-out dates');
            }
          }}
        >
          Check Availability
        </Button>
      </div>
      
      {/* Rooms Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Available Rooms</h2>
        
        <div className="space-y-4">
          {hotel.rooms.map((room) => (
            <RoomCard key={room.id} hotelId={hotel.id} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
