
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Booking } from '@/contexts/BookingContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';

interface BookingCardProps {
  booking: Booking;
  onCancel?: (id: string) => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, onCancel }) => {
  const navigate = useNavigate();
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 h-40 md:h-auto">
          <img
            src={booking.image}
            alt={booking.hotelName}
            className="w-full h-full object-cover"
          />
        </div>
        
        <CardContent className="w-full md:w-2/3 p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{booking.hotelName}</h3>
              <p className="text-sm text-gray-600">{booking.roomName}</p>
            </div>
            
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </span>
          </div>
          
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-500">Check-in:</span>
              <p className="font-medium">{formatDate(booking.checkIn)}</p>
            </div>
            <div>
              <span className="text-gray-500">Check-out:</span>
              <p className="font-medium">{formatDate(booking.checkOut)}</p>
            </div>
            <div>
              <span className="text-gray-500">Guests:</span>
              <p className="font-medium">{booking.guests}</p>
            </div>
            <div>
              <span className="text-gray-500">Total:</span>
              <p className="font-medium">${booking.totalPrice}</p>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => navigate(`/bookings/${booking.id}`)}
            >
              View Details
            </Button>
            
            {booking.status === 'confirmed' && onCancel && (
              <Button
                variant="destructive"
                onClick={() => onCancel(booking.id)}
              >
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default BookingCard;
