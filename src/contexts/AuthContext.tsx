
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from "@/components/ui/sonner";
import { useNavigate } from 'react-router-dom';

type User = {
  phoneNumber: string;
  name?: string;
  id?: string;
  email?: string;
  createdAt?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  sendOtp: (phoneNumber: string) => Promise<boolean>;
  verifyOtp: (phoneNumber: string, otp: string) => Promise<boolean>;
  logout: () => void;
  updateUserProfile: (data: Partial<User>) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem('hotelUser');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Send OTP to user's phone number
  const sendOtp = async (phoneNumber: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // In a real app, you would call an API to send OTP
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
    } finally {
      setIsLoading(false);
    }
  };

  // Verify OTP and authenticate user
  const verifyOtp = async (phoneNumber: string, otp: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // In a real app, you would verify OTP via API
      console.log(`Verifying OTP ${otp} for ${phoneNumber}`);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll accept "123456" as a valid OTP
      if (otp === "123456") {
        const newUser = { 
          phoneNumber, 
          id: `user_${Date.now()}`,
          createdAt: new Date().toISOString() 
        };
        
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
    } finally {
      setIsLoading(false);
    }
  };

  // Update user profile information
  const updateUserProfile = async (data: Partial<User>): Promise<boolean> => {
    try {
      if (!user) return false;
      
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('hotelUser', JSON.stringify(updatedUser));
      
      toast.success("Profile updated successfully");
      return true;
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
      return false;
    }
  };

  // Log out user
  const logout = () => {
    setUser(null);
    localStorage.removeItem('hotelUser');
    toast.success("Logged out successfully");
  };

  // Provide auth context to children components
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        sendOtp,
        verifyOtp,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
