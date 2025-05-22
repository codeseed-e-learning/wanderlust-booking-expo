
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useBooking } from '@/contexts/BookingContext';
import BookingCard from '@/components/bookings/BookingCard';
import { Button } from '@/components/ui/button';
import { Book, Search } from 'lucide-react';

const Bookings = () => {
  const { isAuthenticated } = useAuth();
  const { bookings, cancelBooking } = useBooking();
  const navigate = useNavigate();
  
  if (!isAuthenticated) {
    return (
      <div className="text-center py-20">
        <Book className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Login Required</h2>
        <p className="text-gray-500 mb-4">Please login to view your bookings</p>
        <Button onClick={() => navigate('/login')}>Login</Button>
      </div>
    );
  }
  
  // Group bookings by status
  const upcomingBookings = bookings.filter(b => b.status === 'confirmed');
  const pastBookings = bookings.filter(b => ['completed', 'cancelled'].includes(b.status));
  
  const handleCancelBooking = async (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      await cancelBooking(bookingId);
    }
  };
  
  if (bookings.length === 0) {
    return (
      <div className="text-center py-20">
        <Book className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">No Bookings Yet</h2>
        <p className="text-gray-500 mb-4">You haven't made any bookings yet</p>
        <Button 
          onClick={() => navigate('/search')}
          className="bg-hotel-primary hover:bg-hotel-secondary"
        >
          <Search className="h-4 w-4 mr-2" />
          Find Hotels
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Your Bookings</h1>
      
      {/* Upcoming Bookings */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Upcoming Stays</h2>
        
        {upcomingBookings.length === 0 ? (
          <div className="text-center py-6 bg-gray-50 rounded-lg border">
            <p className="text-gray-500">No upcoming bookings</p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingBookings.map(booking => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onCancel={handleCancelBooking}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Past Bookings */}
      {pastBookings.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Past Bookings</h2>
          
          <div className="space-y-4">
            {pastBookings.map(booking => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
