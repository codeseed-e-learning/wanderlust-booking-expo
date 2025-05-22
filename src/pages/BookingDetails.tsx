
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useBooking, BookingStatus } from '@/contexts/BookingContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, MapPin, User, CreditCard, Clock } from 'lucide-react';

const BookingDetails = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { getBookingById, cancelBooking } = useBooking();
  
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }
  
  const booking = bookingId ? getBookingById(bookingId) : undefined;
  
  if (!booking) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-2">Booking Not Found</h2>
        <p className="text-gray-500 mb-4">The booking you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/bookings')}>Back to Bookings</Button>
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'EEEE, MMMM do, yyyy');
  };
  
  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const handleCancelBooking = async () => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      const success = await cancelBooking(booking.id);
      if (success) {
        navigate('/bookings');
      }
    }
  };
  
  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        className="flex items-center mb-4"
        onClick={() => navigate('/bookings')}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Bookings
      </Button>
      
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Booking Details</h1>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Hotel and Room Details */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <img
                  src={booking.image}
                  alt={booking.hotelName}
                  className="w-24 h-24 rounded-md object-cover"
                />
                
                <div>
                  <h2 className="text-xl font-bold">{booking.hotelName}</h2>
                  <p className="text-gray-600">{booking.roomName}</p>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => navigate(`/hotels/${booking.hotelId}`)}
                  >
                    View Hotel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Booking Details */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Booking Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Check-in</div>
                    <div className="text-gray-600">{formatDate(booking.checkIn)}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Check-out</div>
                    <div className="text-gray-600">{formatDate(booking.checkOut)}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Guests</div>
                    <div className="text-gray-600">{booking.guests} {booking.guests > 1 ? 'persons' : 'person'}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Booking Date</div>
                    <div className="text-gray-600">{format(new Date(booking.createdAt), 'MMMM do, yyyy')}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Payment Summary */}
        <div>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Payment Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Room Charges</span>
                  <span>${booking.totalPrice}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes & Fees</span>
                  <span>Included</span>
                </div>
                
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-bold">
                    <span>Total Amount</span>
                    <span>${booking.totalPrice}</span>
                  </div>
                  <div className="text-xs text-gray-500 text-right mt-1">
                    <CreditCard className="h-3 w-3 inline mr-1" />
                    Paid in full
                  </div>
                </div>
              </div>
              
              {booking.status === 'confirmed' && (
                <Button
                  variant="destructive"
                  className="w-full mt-6"
                  onClick={handleCancelBooking}
                >
                  Cancel Booking
                </Button>
              )}
            </CardContent>
          </Card>
          
          <div className="mt-4 text-sm text-gray-500">
            <p className="mb-2">Need assistance with your booking?</p>
            <p>Call us at: <span className="font-medium">1-800-HOTELBOOK</span></p>
            <p>Email: <span className="font-medium">support@hotelbooker.example</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
