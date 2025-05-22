
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, CreditCard, MapPin, Phone, LogOut, Hotel } from 'lucide-react';

const Profile = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || '');
  const [isSaving, setIsSaving] = useState(false);
  
  if (!isAuthenticated) {
    return (
      <div className="text-center py-20">
        <User className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Login Required</h2>
        <p className="text-gray-500 mb-4">Please login to view your profile</p>
        <Button onClick={() => navigate('/login')}>Login</Button>
      </div>
    );
  }
  
  const handleSaveProfile = () => {
    setIsSaving(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // In a real app, you would call an API to update the user profile
      setIsSaving(false);
      alert('Profile updated successfully!');
    }, 1000);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Your Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  value={user?.phoneNumber || ''}
                  readOnly
                  className="bg-gray-50"
                />
                <p className="text-xs text-gray-500">
                  Phone number cannot be changed
                </p>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address (Optional)
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
              
              <Button
                className="bg-hotel-primary hover:bg-hotel-secondary"
                onClick={handleSaveProfile}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
          
          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <CreditCard className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500 mb-4">No payment methods added yet</p>
                <Button variant="outline">Add Payment Method</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          {/* Account Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate('/bookings')}
              >
                <User className="h-4 w-4 mr-2" />
                Your Bookings
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Saved Addresses
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start"
              >
                <Phone className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
              
              <Button
                variant="destructive"
                className="w-full"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </CardContent>
          </Card>
          
          {/* App Info */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Hotel className="h-6 w-6 text-hotel-primary mr-2" />
                <h3 className="font-semibold">HotelBooker App</h3>
              </div>
              
              <p className="text-sm text-gray-500 mb-4">
                Download our app for a better experience, exclusive deals, and offline access to your bookings.
              </p>
              
              <Button className="w-full bg-hotel-primary hover:bg-hotel-secondary">
                Download App
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
