
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { hotels } from '@/data/hotels';
import HotelCard from '@/components/hotels/HotelCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Hotel, Search, Calendar, User } from 'lucide-react';

const Index = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const featuredHotels = hotels.slice(0, 3);
  
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative rounded-lg overflow-hidden bg-hotel-primary text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-hotel-primary to-hotel-secondary opacity-90"></div>
        <div className="relative z-10 p-6 md:p-10">
          <div className="max-w-xl mx-auto md:mx-0">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {isAuthenticated
                ? `Welcome back${user?.name ? `, ${user.name}` : ''}!`
                : 'Find your perfect stay'}
            </h1>
            <p className="text-lg mb-6 text-white/90">
              Discover amazing hotels with the best amenities at affordable prices
            </p>
            
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <div className="flex items-center gap-2">
                <Search className="text-gray-400 h-5 w-5 flex-shrink-0" />
                <Input
                  type="text"
                  placeholder="Where are you going?"
                  className="border-0 focus-visible:ring-0 p-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      navigate(`/search?q=${searchQuery}`);
                    }
                  }}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4">
                <Button 
                  variant="outline" 
                  className="justify-start text-gray-600"
                  onClick={() => navigate('/search')}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Check-in / Check-out</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="justify-start text-gray-600"
                  onClick={() => navigate('/search')}
                >
                  <User className="h-4 w-4 mr-2" />
                  <span>Guests</span>
                </Button>
                
                <Button 
                  className="bg-hotel-primary hover:bg-hotel-secondary"
                  onClick={() => navigate(`/search${searchQuery ? `?q=${searchQuery}` : ''}`)}
                >
                  <Search className="h-4 w-4 mr-2" />
                  <span>Search</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Hotels */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Featured Hotels</h2>
          <Button 
            variant="link" 
            className="text-hotel-primary"
            onClick={() => navigate('/search')}
          >
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </section>
      
      {/* Hotel Categories */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Browse by Category</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: 'Beach Resorts', image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2049&auto=format&fit=crop' },
            { title: 'Mountain Lodges', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop' },
            { title: 'City Hotels', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop' },
            { title: 'Luxury Suites', image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop' }
          ].map((category, index) => (
            <div 
              key={index}
              className="relative rounded-lg overflow-hidden h-40 cursor-pointer"
              onClick={() => navigate('/search')}
            >
              <img 
                src={category.image} 
                alt={category.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white font-medium text-lg">{category.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* App Promotion */}
      <section className="bg-gray-100 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold mb-2">Get the HotelBooker App</h3>
          <p className="text-gray-600">Book on the go, get exclusive mobile-only deals!</p>
        </div>
        
        <Button className="bg-hotel-primary hover:bg-hotel-secondary">
          Download Now
        </Button>
      </section>
    </div>
  );
};

export default Index;
