
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from "@/components/ui/sonner";
import { Hotel, Room } from '@/data/hotels';

export type BookingStatus = 'confirmed' | 'pending' | 'completed' | 'cancelled';

export type Booking = {
  id: string;
  hotelId: string;
  roomId: string;
  hotelName: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
  image: string;
};

type BookingContextType = {
  bookings: Booking[];
  createBooking: (hotelId: string, roomId: string, hotel: Hotel, room: Room, checkIn: string, checkOut: string, guests: number) => Promise<boolean>;
  cancelBooking: (bookingId: string) => Promise<boolean>;
  getBookingById: (id: string) => Booking | undefined;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    // Load bookings from localStorage on mount
    const storedBookings = localStorage.getItem('hotelBookings');
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }
  }, []);

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('hotelBookings', JSON.stringify(bookings));
  }, [bookings]);

  const createBooking = async (
    hotelId: string,
    roomId: string,
    hotel: Hotel,
    room: Room,
    checkIn: string,
    checkOut: string,
    guests: number
  ): Promise<boolean> => {
    try {
      // Calculate nights
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
      
      // Calculate total price
      const totalPrice = room.price * nights;
      
      // Create a new booking
      const newBooking: Booking = {
        id: `booking-${Date.now()}`,
        hotelId,
        roomId,
        hotelName: hotel.name,
        roomName: room.name,
        checkIn,
        checkOut,
        guests,
        totalPrice,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        image: room.images[0] || hotel.images[0],
      };
      
      // Add the booking to state
      setBookings(prev => [...prev, newBooking]);
      
      toast.success("Booking confirmed successfully!");
      return true;
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("Failed to create booking. Please try again.");
      return false;
    }
  };

  const cancelBooking = async (bookingId: string): Promise<boolean> => {
    try {
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'cancelled' } 
            : booking
        )
      );
      
      toast.success("Booking cancelled successfully");
      return true;
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("Failed to cancel booking. Please try again.");
      return false;
    }
  };

  const getBookingById = (id: string): Booking | undefined => {
    return bookings.find(booking => booking.id === id);
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        createBooking,
        cancelBooking,
        getBookingById,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
