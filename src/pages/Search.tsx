
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { hotels, Hotel as HotelType } from '@/data/hotels';
import HotelCard from '@/components/hotels/HotelCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Search as SearchIcon, Filter, X } from 'lucide-react';

const Search = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHotels, setFilteredHotels] = useState<HotelType[]>(hotels);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  
  // Extract all unique amenities across all hotels
  const allAmenities = Array.from(
    new Set(hotels.flatMap(hotel => hotel.amenities))
  ).sort();
  
  // Parse search query from URL
  useEffect(() => {
    const query = new URLSearchParams(location.search).get('q');
    if (query) {
      setSearchTerm(query);
    }
  }, [location.search]);
  
  // Filter hotels based on search term and filters
  useEffect(() => {
    let results = hotels;
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        hotel => 
          hotel.name.toLowerCase().includes(term) || 
          hotel.location.toLowerCase().includes(term) ||
          hotel.description.toLowerCase().includes(term)
      );
    }
    
    // Filter by price range
    results = results.filter(
      hotel => hotel.price >= priceRange[0] && hotel.price <= priceRange[1]
    );
    
    // Filter by amenities
    if (selectedAmenities.length > 0) {
      results = results.filter(hotel => 
        selectedAmenities.every(amenity => hotel.amenities.includes(amenity))
      );
    }
    
    setFilteredHotels(results);
  }, [searchTerm, priceRange, selectedAmenities]);

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };
  
  const clearFilters = () => {
    setPriceRange([0, 500]);
    setSelectedAmenities([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search hotels, locations..."
            className="pl-10"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            Filters
            {(selectedAmenities.length > 0 || priceRange[0] > 0 || priceRange[1] < 500) && (
              <span className="bg-hotel-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {selectedAmenities.length + (priceRange[0] > 0 || priceRange[1] < 500 ? 1 : 0)}
              </span>
            )}
          </Button>
          
          <div className="text-sm text-gray-500">
            {filteredHotels.length} {filteredHotels.length === 1 ? 'hotel' : 'hotels'} found
          </div>
        </div>
      </div>
      
      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-lg border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Filters</h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs"
              onClick={clearFilters}
            >
              <X className="h-3 w-3 mr-1" />
              Clear all
            </Button>
          </div>
          
          <div className="space-y-6">
            {/* Price Range Filter */}
            <div>
              <h4 className="text-sm font-medium mb-2">Price Range</h4>
              <Slider
                defaultValue={[0, 500]}
                min={0}
                max={500}
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
              />
              <div className="flex justify-between mt-2 text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
            
            {/* Amenities Filter */}
            <div>
              <h4 className="text-sm font-medium mb-2">Amenities</h4>
              <div className="grid grid-cols-2 gap-2">
                {allAmenities.map(amenity => (
                  <div key={amenity} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`amenity-${amenity}`}
                      checked={selectedAmenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="mr-2"
                    />
                    <label htmlFor={`amenity-${amenity}`} className="text-sm">
                      {amenity}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {filteredHotels.length === 0 ? (
        <div className="text-center py-10">
          <div className="text-gray-400 mb-4">
            <SearchIcon className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium mb-2">No hotels found</h3>
          <p className="text-gray-500">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map(hotel => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
