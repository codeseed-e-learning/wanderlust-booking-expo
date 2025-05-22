
import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { User, Search, Book, Hotel } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Layout: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/', icon: <Hotel className="h-5 w-5" /> },
    { label: 'Search', path: '/search', icon: <Search className="h-5 w-5" /> },
    { label: 'Bookings', path: '/bookings', icon: <Book className="h-5 w-5" /> },
    { label: 'Profile', path: '/profile', icon: <User className="h-5 w-5" /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <Hotel className="h-8 w-8 text-hotel-primary" />
            <h1 className="text-xl font-bold text-hotel-primary">HotelBooker</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Button variant="outline" onClick={logout}>Log Out</Button>
            ) : (
              <Button onClick={() => navigate('/login')}>Login</Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 mb-16">
        <Outlet />
      </main>

      {/* Bottom Navigation for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md z-10">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <div
              key={item.path}
              className={`flex flex-col items-center justify-center w-full h-full ${
                isActive(item.path) ? 'text-hotel-primary border-t-2 border-hotel-primary' : 'text-gray-500'
              }`}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
