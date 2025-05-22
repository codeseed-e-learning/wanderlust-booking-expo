
export type Room = {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  amenities: string[];
  images: string[];
};

export type Hotel = {
  id: string;
  name: string;
  description: string;
  location: string;
  rating: number;
  price: number;
  images: string[];
  amenities: string[];
  rooms: Room[];
};

export const hotels: Hotel[] = [
  {
    id: "h1",
    name: "Oceanfront Resort & Spa",
    description: "Luxurious beachfront resort with stunning ocean views and premium amenities.",
    location: "Miami Beach, Florida",
    rating: 4.8,
    price: 299,
    images: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2049&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2089&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551918120-9739cb430c6d?q=80&w=1887&auto=format&fit=crop"
    ],
    amenities: ["Spa", "Pool", "Restaurant", "Gym", "Free WiFi", "Room Service"],
    rooms: [
      {
        id: "r1",
        name: "Deluxe Ocean View",
        description: "Spacious room with private balcony and panoramic ocean views.",
        price: 299,
        capacity: 2,
        amenities: ["King Bed", "Ocean View", "Mini Bar", "Free WiFi", "Room Service"],
        images: [
          "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop"
        ]
      },
      {
        id: "r2",
        name: "Premium Suite",
        description: "Luxury suite with separate living area and premium amenities.",
        price: 499,
        capacity: 4,
        amenities: ["King Bed", "Sofa Bed", "Ocean View", "Mini Bar", "Free WiFi", "Room Service", "Bathtub"],
        images: [
          "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?q=80&w=2070&auto=format&fit=crop"
        ]
      }
    ]
  },
  {
    id: "h2",
    name: "Mountain View Lodge",
    description: "Cozy lodge nestled in the mountains with breathtaking views and outdoor activities.",
    location: "Aspen, Colorado",
    rating: 4.6,
    price: 249,
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1920&auto=format&fit=crop"
    ],
    amenities: ["Fireplace", "Restaurant", "Bar", "Hiking Trails", "Free WiFi", "Parking"],
    rooms: [
      {
        id: "r3",
        name: "Mountain View Room",
        description: "Comfortable room with stunning mountain views and rustic decor.",
        price: 249,
        capacity: 2,
        amenities: ["Queen Bed", "Mountain View", "Fireplace", "Free WiFi"],
        images: [
          "https://images.unsplash.com/photo-1602891238926-6f12f4b48e7f?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1770&auto=format&fit=crop"
        ]
      },
      {
        id: "r4",
        name: "Luxury Cabin",
        description: "Private cabin with full kitchen and panoramic mountain views.",
        price: 399,
        capacity: 4,
        amenities: ["King Bed", "Sofa Bed", "Full Kitchen", "Fireplace", "Private Deck"],
        images: [
          "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?q=80&w=2073&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1564501049759-0f19792ea5ef?q=80&w=1932&auto=format&fit=crop"
        ]
      }
    ]
  },
  {
    id: "h3",
    name: "Downtown Boutique Hotel",
    description: "Stylish boutique hotel in the heart of downtown with modern amenities and design.",
    location: "New York City, New York",
    rating: 4.5,
    price: 279,
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2071&auto=format&fit=crop"
    ],
    amenities: ["Rooftop Bar", "Restaurant", "Fitness Center", "Business Center", "Free WiFi"],
    rooms: [
      {
        id: "r5",
        name: "City View King",
        description: "Modern room with king bed and city views.",
        price: 279,
        capacity: 2,
        amenities: ["King Bed", "City View", "Smart TV", "Free WiFi", "Desk"],
        images: [
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=2070&auto=format&fit=crop"
        ]
      },
      {
        id: "r6",
        name: "Executive Suite",
        description: "Spacious suite with separate living area and luxury amenities.",
        price: 429,
        capacity: 2,
        amenities: ["King Bed", "Separate Living Area", "City View", "Mini Bar", "Free WiFi", "Bathtub"],
        images: [
          "https://images.unsplash.com/photo-1609949279531-cf48d64bed89?q=80&w=1887&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1631049552240-59c37f38802b?q=80&w=2070&auto=format&fit=crop"
        ]
      }
    ]
  }
];

export const getHotelById = (id: string): Hotel | undefined => {
  return hotels.find(hotel => hotel.id === id);
};

export const getRoomById = (hotelId: string, roomId: string): Room | undefined => {
  const hotel = getHotelById(hotelId);
  if (!hotel) return undefined;
  return hotel.rooms.find(room => room.id === roomId);
};
