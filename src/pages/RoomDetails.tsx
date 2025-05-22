
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getHotelById, getRoomById } from '@/data/hotels';
import { useAuth } from '@/contexts/AuthContext';
import { useBooking } from '@/contexts/BookingContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Users, ArrowLeft } from 'lucide-react';

const RoomDetails = () => {
  const { hotelId, roomId } = useParams<{ hotelId: string, roomId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { createBooking } = useBooking();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState(1);
  const [isBooking, setIsBooking] = useState(false);
  
  const hotel = hotelId ? getHotelById(hotelId) : undefined;
  const room = hotelId && roomId ? getRoomById(hotelId, roomId) : undefined;
  
  if (!hotel || !room) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-2">Room Not Found</h2>
        <p className="text-gray-500 mb-4">The room you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/search')}>Back to Search</Button>
      </div>
    );
  }
  
  const handleBookNow = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (!checkInDate || !checkOutDate) {
      alert('Please select check-in and check-out dates');
      return;
    }
    
    if (guests > room.capacity) {
      alert(`This room can only accommodate ${room.capacity} guests`);
      return;
    }
    
    setIsBooking(true);
    try {
      const success = await createBooking(
        hotel.id,
        room.id,
        hotel,
        room,
        format(checkInDate, 'yyyy-MM-dd'),
        format(checkOutDate, 'yyyy-MM-dd'),
        guests
      );
      
      if (success) {
        navigate('/bookings');
      }
    } finally {
      setIsBooking(false);
    }
  };
  
  // Calculate total price
  const calculateTotalPrice = () => {
    if (!checkInDate || !checkOutDate) return 0;
    
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    return room.price * nights;
  };

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        className="flex items-center"
        onClick={() => navigate(`/hotels/${hotelId}`)}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to {hotel.name}
      </Button>
      
      {/* Room Images Gallery */}
      <div className="space-y-2">
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <img
            src={room.images[selectedImageIndex] || hotel.images[0]}
            alt={room.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2">
          {room.images.map((image, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 ${
                selectedImageIndex === index ? 'border-hotel-primary' : 'border-transparent'
              }`}
              onClick={() => setSelectedImageIndex(index)}
            >
              <img
                src={image}
                alt={`${room.name} - ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Room Information */}
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">{room.name}</h1>
            <p className="text-gray-500">{hotel.name} - {hotel.location}</p>
          </div>
          
          <div className="text-xl font-bold text-hotel-primary">
            ${room.price} <span className="text-sm font-normal text-gray-500">/ night</span>
          </div>
        </div>
        
        <p className="text-gray-700">{room.description}</p>
        
        {/* Room Details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">Room Details</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                <span>Capacity: {room.capacity} {room.capacity > 1 ? 'persons' : 'person'}</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Amenities */}
        <div>
          <h3 className="font-medium mb-2">Room Amenities</h3>
          <div className="flex flex-wrap gap-2">
            {room.amenities.map((amenity, index) => (
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
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="font-bold text-lg mb-4">Book This Room</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Check-in</label>
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
            <label className="text-sm font-medium">Check-out</label>
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
        
        <div className="mb-6">
          <label className="text-sm font-medium mb-2 block">Guests</label>
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
              max={room.capacity}
              value={guests}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 1;
                setGuests(Math.min(value, room.capacity));
              }}
              className="w-16 mx-2 text-center"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setGuests(prev => Math.min(prev + 1, room.capacity))}
              disabled={guests >= room.capacity}
            >
              +
            </Button>
            <span className="ml-2 text-sm text-gray-500">
              Max: {room.capacity}
            </span>
          </div>
        </div>
        
        {checkInDate && checkOutDate && (
          <div className="border-t pt-4 mb-4">
            <div className="flex justify-between mb-2">
              <span>Price per night</span>
              <span>${room.price}</span>
            </div>
            
            <div className="flex justify-between mb-2">
              <span>
                {Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))} nights
              </span>
              <span>
                ${calculateTotalPrice()}
              </span>
            </div>
            
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${calculateTotalPrice()}</span>
            </div>
          </div>
        )}
        
        <Button 
          className="w-full bg-hotel-primary hover:bg-hotel-secondary"
          onClick={handleBookNow}
          disabled={isBooking || !checkInDate || !checkOutDate}
        >
          {isBooking ? "Processing..." : "Book Now"}
        </Button>
        
        {!isAuthenticated && (
          <p className="text-sm text-center mt-2 text-gray-500">
            You'll need to log in to complete your booking
          </p>
        )}
      </div>
    </div>
  );
};

export default RoomDetails;
