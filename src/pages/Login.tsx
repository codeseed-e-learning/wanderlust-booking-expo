
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Hotel } from 'lucide-react';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { sendOtp, verifyOtp } = useAuth();
  const navigate = useNavigate();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber || phoneNumber.length < 10) {
      alert('Please enter a valid phone number');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const success = await sendOtp(phoneNumber);
      if (success) {
        setIsOtpSent(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp || otp.length < 6) {
      alert('Please enter a valid OTP');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const success = await verifyOtp(phoneNumber, otp);
      if (success) {
        navigate('/');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <Hotel className="h-10 w-10 text-hotel-primary" />
          </div>
          <CardTitle className="text-2xl">Welcome to HotelBooker</CardTitle>
          <p className="text-sm text-gray-500 mt-2">
            {isOtpSent
              ? "Enter the OTP sent to your phone"
              : "Sign in to your account with your phone number"}
          </p>
        </CardHeader>
        
        <CardContent>
          {!isOtpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="phoneNumber" className="text-sm font-medium">
                  Phone Number
                </label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full"
                  required
                />
                <p className="text-xs text-gray-500">
                  We'll send a verification code to this number
                </p>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-hotel-primary hover:bg-hotel-secondary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Get OTP"}
              </Button>
              
              <div className="text-center text-xs text-gray-500 mt-4">
                <p>For demo purposes, use any phone number</p>
                <p>OTP will be "123456"</p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="otp" className="text-sm font-medium">
                  Verification Code
                </label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full"
                  maxLength={6}
                  required
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-hotel-primary hover:bg-hotel-secondary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Verifying..." : "Verify & Login"}
              </Button>
              
              <div className="flex justify-between text-xs">
                <button
                  type="button"
                  className="text-hotel-primary"
                  onClick={() => setIsOtpSent(false)}
                >
                  Change phone number
                </button>
                
                <button
                  type="button"
                  className="text-hotel-primary"
                  onClick={handleSendOtp}
                  disabled={isSubmitting}
                >
                  Resend OTP
                </button>
              </div>
              
              <div className="text-center text-xs text-gray-500 mt-4">
                <p>For demo purposes, use "123456" as OTP</p>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
