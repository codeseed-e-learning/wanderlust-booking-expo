
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from "@/components/ui/sonner";

type User = {
  phoneNumber: string;
  name?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  sendOtp: (phoneNumber: string) => Promise<boolean>;
  verifyOtp: (phoneNumber: string, otp: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on component mount
    const storedUser = localStorage.getItem('hotelUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const sendOtp = async (phoneNumber: string): Promise<boolean> => {
    try {
      // In a real app, you would call an API to send OTP
      // For demo purposes, we'll mock this functionality
      console.log(`Sending OTP to ${phoneNumber}`);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store the phone number temporarily for verification
      localStorage.setItem('pendingVerification', phoneNumber);
      
      toast.success("OTP sent successfully! For demo, use 123456");
      return true;
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
      return false;
    }
  };

  const verifyOtp = async (phoneNumber: string, otp: string): Promise<boolean> => {
    try {
      // In a real app, you would verify OTP via API
      // For demo purposes, any 6-digit OTP works
      console.log(`Verifying OTP ${otp} for ${phoneNumber}`);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll accept "123456" as a valid OTP
      if (otp === "123456") {
        const newUser = { phoneNumber };
        setUser(newUser);
        localStorage.setItem('hotelUser', JSON.stringify(newUser));
        localStorage.removeItem('pendingVerification');
        toast.success("Successfully verified and logged in!");
        return true;
      } else {
        toast.error("Invalid OTP. Please try again.");
        return false;
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Verification failed. Please try again.");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hotelUser');
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        sendOtp,
        verifyOtp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
