import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star, ShoppingCart } from 'lucide-react';
import ServiceInfoModal from './ServiceInfoModal';

export interface ServiceItem {
  id: string;
  title: string;
  rating: number;
  reviews: number;
  price: string;
  description: string;
  image: string;
  truckSize?: string;
  includedServices?: string[];
  includedItems?: string[];
}

export const localMovingServices: ServiceItem[] = [
  {
    id: 'studio-rk',
    title: 'Studio / 1 RK Local Moving',
    rating: 4.1,
    reviews: 18,
    price: '₹3,999',
    description: 'Ideal for small apartments or single-room shifting within the same city.',
    image: 'https://images.unsplash.com/photo-1536376074432-a228d0677e8d?auto=format&fit=crop&q=80&w=200',
    truckSize: 'Tata Ace or equivalent (Small truck)',
    includedServices: ['Packing, loading, and unloading', 'Transportation within the same city', 'Disassembly/reassembly of basic furniture'],
    includedItems: ['1 Single Bed', '1 Mattress', '1 Wardrobe', '1 Refrigerator (Small)', '1 Washing Machine', '4 to 6 Boxes of personal belongings']
  },
  {
    id: '1-bhk',
    title: '1 BHK Local Moving',
    rating: 4.0,
    reviews: 12,
    price: '₹4,999',
    description: 'Our 1 BHK Local Moving Service offers reliable packing and transport within the same city for smaller households.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=200',
    truckSize: 'Tata Ace or equivalent (Small truck)',
    includedServices: ['Packing, loading, and unloading', 'Transportation within the same city', 'Disassembly/reassembly of basic furniture'],
    includedItems: ['1 Double Bed', '1 Mattress', '1 Wardrobe', '1 Refrigerator', '1 Washing Machine', '1 Gas Stove', '1 Cylinder', 'Sofa Set (3 seaters)', '6 to 10 Boxes of personal belongings', 'Upto 5 Miscellaneous items']
  },
  {
    id: '2-bhk',
    title: '2 BHK Local Moving Services',
    rating: 4.2,
    reviews: 21,
    price: '₹6,999',
    description: 'Our 2 BHK Local Moving Service provides comprehensive packing, transport, and unpacking within the same city.',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=200',
    truckSize: 'Mahindra Bolero Pickup or equivalent',
    includedServices: ['Professional packing, loading, and unloading', 'Transportation within the same city', 'Disassembly/reassembly of all furniture'],
    includedItems: ['2 Double Beds', '2 Mattresses', '2 Wardrobes', '1 Refrigerator (Large)', '1 Washing Machine', '1 Dining Table (4 seater)', '1 TV Unit', 'Sofa Set (3+1+1)', '10 to 15 Boxes of personal belongings']
  },
  {
    id: '3-bhk',
    title: '3 BHK Local Moving Services',
    rating: 4.3,
    reviews: 19,
    price: '₹8,999',
    description: 'Our 3 BHK Local Moving Service offers full packing, transport, and unpacking solutions for larger homes within the city.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=200',
    truckSize: '14ft Truck (Eicher or equivalent)',
    includedServices: ['Premium packing, loading, and unloading', 'Transportation within the same city', 'Disassembly/reassembly of all furniture', 'Unpacking and basic setting'],
    includedItems: ['3 Double Beds', '3 Mattresses', '3 Wardrobes', '1 Refrigerator (Double Door)', '1 Washing Machine', '1 Dining Table (6 seater)', '1 TV Unit', 'Sofa Set (5 seater)', '15 to 25 Boxes of personal belongings']
  },
  {
    id: '4-bhk',
    title: '4 BHK Local Moving',
    rating: 4.4,
    reviews: 15,
    price: '₹11,999',
    description: 'Best for large homes with professional packing and transportation.',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=200',
    truckSize: '17ft Truck (Eicher or equivalent)',
    includedServices: ['Premium packing, loading, and unloading', 'Transportation within the same city', 'Disassembly/reassembly of all furniture', 'Unpacking and full setting'],
    includedItems: ['4 Double Beds', '4 Mattresses', '4 Wardrobes', '1 Refrigerator (Double Door)', '2 Washing Machines', '1 Dining Table (8 seater)', '2 TV Units', 'Sofa Set (7 seater)', '25 to 40 Boxes of personal belongings']
  },
  {
    id: 'villa-duplex',
    title: 'Villa / Duplex Moving',
    rating: 4.5,
    reviews: 10,
    price: '₹15,999',
    description: 'Complete relocation service for villas and duplex houses.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=200',
    truckSize: '20ft Container or 2x 14ft Trucks',
    includedServices: ['White-glove packing, loading, and unloading', 'Transportation within the same city', 'Expert disassembly/reassembly of all furniture', 'Unpacking and full home setting', 'Dedicated move manager'],
    includedItems: ['5+ Double Beds', '5+ Mattresses', '5+ Wardrobes', 'All Kitchen Appliances', 'All Living Room Furniture', 'Outdoor/Garden Furniture', '40+ Boxes of personal belongings']
  }
];

export const interCityMovingServices: ServiceItem[] = [
  {
    id: 'ic-1-bhk',
    title: '1 BHK Inter-City Moving (Up to 500 km)',
    rating: 4.0,
    reviews: 12,
    price: '₹15,300',
    description: 'Our 1 BHK Inter-City Moving Service ensures a hassle-free move with packing, transport, and handling.',
    image: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&q=80&w=200',
    truckSize: '14ft Shared or Dedicated Truck',
    includedServices: ['Multi-layer packing for long distance', 'Loading and unloading', 'Inter-city transportation', 'Basic furniture disassembly'],
    includedItems: ['1 Double Bed', '1 Mattress', '1 Wardrobe', '1 Refrigerator', '1 Washing Machine', '10 to 12 Boxes of personal belongings']
  },
  {
    id: 'ic-2-bhk',
    title: '2 BHK Inter-City Moving (Up to 500 km)',
    rating: 4.1,
    reviews: 14,
    price: '₹21,300',
    description: 'Our 2 BHK Inter-City Moving Service offers professional packing, transport, and handling.',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=200',
    truckSize: '17ft Dedicated Truck',
    includedServices: ['Professional multi-layer packing', 'Loading and unloading', 'Inter-city transportation', 'Full furniture disassembly/reassembly'],
    includedItems: ['2 Double Beds', '2 Mattresses', '2 Wardrobes', '1 Refrigerator', '1 Washing Machine', '1 TV Unit', 'Sofa Set (3+1+1)', '15 to 20 Boxes of personal belongings']
  },
  {
    id: 'ic-3-bhk',
    title: '3 BHK Inter-City Moving (Up to 500 km)',
    rating: 4.2,
    reviews: 17,
    price: '₹29,800',
    description: 'Our 3 BHK Inter-City Moving Service ensures professional, efficient relocation for large households.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=200',
    truckSize: '19ft Dedicated Truck',
    includedServices: ['Premium multi-layer packing', 'Loading and unloading', 'Inter-city transportation', 'Full furniture disassembly/reassembly', 'Unpacking services'],
    includedItems: ['3 Double Beds', '3 Mattresses', '3 Wardrobes', '1 Refrigerator (Double Door)', '1 Washing Machine', '1 Dining Table', 'Sofa Set (5 seater)', '25 to 30 Boxes of personal belongings']
  },
  {
    id: 'ic-4-bhk',
    title: '4 BHK Inter-City Moving (Up to 500 km)',
    rating: 4.3,
    reviews: 9,
    price: '₹42,500',
    description: 'Our 4 BHK Inter-City Moving Service offers comprehensive packing and transport for large families relocating.',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=200',
    truckSize: '24ft Dedicated Container',
    includedServices: ['Premium multi-layer packing', 'Loading and unloading', 'Inter-city transportation', 'Full furniture disassembly/reassembly', 'Unpacking and setting services'],
    includedItems: ['4 Double Beds', '4 Mattresses', '4 Wardrobes', 'All Major Appliances', 'All Living Room Furniture', '35 to 50 Boxes of personal belongings']
  },
  {
    id: 'bike-transport',
    title: 'Bike Transport Service',
    rating: 4.4,
    reviews: 25,
    price: '₹2,999',
    description: 'Safe bike relocation with secure packaging and door-to-door delivery.',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=200',
    truckSize: 'Shared Bike Carrier or Small Truck',
    includedServices: ['Specialized bike packing', 'Loading and unloading', 'Inter-city transportation', 'Insurance assistance'],
    includedItems: ['1 Two-Wheeler (Bike/Scooter)', 'Helmet', 'Basic Accessories']
  },
  {
    id: 'car-transport',
    title: 'Car Transport Service',
    rating: 4.5,
    reviews: 20,
    price: '₹8,999',
    description: 'Professional door-to-door vehicle transport service using open or closed carriers.',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=200',
    truckSize: 'Open/Closed Car Carrier',
    includedServices: ['Pre-transport inspection', 'Secure loading on carrier', 'Inter-city transportation', 'Door-step delivery'],
    includedItems: ['1 Four-Wheeler (Car/SUV)']
  },
  {
    id: 'office-relocation',
    title: 'Office Relocation',
    rating: 4.3,
    reviews: 11,
    price: '₹12,999',
    description: 'Professional office and workspace shifting service with minimal downtime.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=200',
    truckSize: '17ft or 19ft Dedicated Truck',
    includedServices: ['IT equipment specialized packing', 'Furniture disassembly/reassembly', 'Loading and unloading', 'Workspace setting'],
    includedItems: ['5-10 Workstations', 'Office Chairs', 'Storage Cabinets', 'IT Assets (Monitors, CPUs)', 'Conference Table']
  }
];

interface ServiceDetailsPageProps {
  onBack: () => void;
  onProceed: (cart: { [key: string]: { quantity: number; extraItems: number; extraInventory?: { [key: string]: number } } }) => void;
  cart: { [key: string]: { quantity: number; extraItems: number; extraInventory?: { [key: string]: number } } };
  setCart: React.Dispatch<React.SetStateAction<{ [key: string]: { quantity: number; extraItems: number; extraInventory?: { [key: string]: number } } }>>;
  onCartClick: () => void;
}

const ServiceDetailsPage: React.FC<ServiceDetailsPageProps> = ({ onBack, onProceed, cart, setCart, onCartClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<'LOCAL' | 'INTERCITY'>('LOCAL');
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [selectedServiceForInfo, setSelectedServiceForInfo] = useState<ServiceItem | null>(null);

  const currentServices = selectedCategory === 'LOCAL' ? localMovingServices : interCityMovingServices;

  const handleViewDetails = (service: ServiceItem) => {
    setSelectedServiceForInfo(service);
    setIsInfoModalOpen(true);
  };

  const updateQuantity = (serviceId: string, delta: number, extraItems: number = 0, extraInventory?: { [key: string]: number }) => {
    setCart(prev => {
      const current = prev[serviceId] || { quantity: 0, extraItems: 0 };
      const newQty = Math.max(0, current.quantity + delta);
      
      const newCart = { ...prev };
      if (newQty === 0) {
        delete newCart[serviceId];
      } else {
        newCart[serviceId] = { 
          quantity: newQty, 
          extraItems: delta > 0 ? extraItems : current.extraItems,
          extraInventory: delta > 0 ? extraInventory : current.extraInventory
        };
      }
      return newCart;
    });
  };

  const cartTotal = Object.entries(cart).reduce((total: number, [id, item]: [string, { quantity: number; extraItems: number; extraInventory?: { [key: string]: number } }]) => {
    const service = [...localMovingServices, ...interCityMovingServices].find(s => s.id === id);
    if (!service) return total;
    const basePrice = parseInt(service.price.replace(/[₹,]/g, ''));
    const extraPrice = item.extraItems * 500;
    return total + ((basePrice + extraPrice) * item.quantity);
  }, 0);

  const cartItemCount: number = (Object.values(cart) as { quantity: number }[]).reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0);

  return (
    <div className="bg-white min-h-screen pb-40 animate-fadeIn">
      {/* Top App Bar */}
      <header className="px-6 h-16 flex items-center border-b border-slate-100 sticky top-0 bg-white z-50">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-slate-900" />
        </button>
        <h1 className="flex-1 text-center font-bold text-slate-900">Packers Movers Local</h1>
        <div className="relative" onClick={onCartClick}>
          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer">
            <ShoppingCart className="w-5 h-5" />
          </div>
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
              {cartItemCount}
            </span>
          )}
        </div>
      </header>

      {/* Top Banner Section */}
      <section className="px-6 py-6">
        <div className="relative h-48 rounded-[24px] overflow-hidden shadow-lg">
          <img 
            src="https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&q=80&w=800" 
            alt="Packers Movers" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 to-transparent flex flex-col justify-center p-8">
            <h2 className="text-white text-2xl font-black leading-tight mb-2 max-w-[200px]">
              Stress-Free Moving Handled End to End
            </h2>
            <p className="text-white font-bold text-lg">Starts at ₹2099</p>
          </div>
        </div>
      </section>

      {/* Service Selection Section */}
      <section className="px-6 py-4">
        <h3 className="text-lg font-black text-slate-900 mb-6">What service do you need?</h3>
        <div className="flex gap-4">
          <button 
            onClick={() => setSelectedCategory('LOCAL')}
            className={`flex-1 flex flex-col items-center gap-3 p-4 rounded-[24px] border transition-all ${selectedCategory === 'LOCAL' ? 'bg-blue-50 border-blue-200 shadow-sm' : 'bg-white border-slate-100'}`}
          >
            <div className="w-20 h-20 rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=200" alt="Local" className="w-full h-full object-cover" />
            </div>
            <span className={`text-sm font-bold ${selectedCategory === 'LOCAL' ? 'text-blue-600' : 'text-slate-600'}`}>Local Moving</span>
          </button>
          <button 
            onClick={() => setSelectedCategory('INTERCITY')}
            className={`flex-1 flex flex-col items-center gap-3 p-4 rounded-[24px] border transition-all ${selectedCategory === 'INTERCITY' ? 'bg-blue-50 border-blue-200 shadow-sm' : 'bg-white border-slate-100'}`}
          >
            <div className="w-20 h-20 rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=200" alt="Inter-City" className="w-full h-full object-cover" />
            </div>
            <span className={`text-sm font-bold ${selectedCategory === 'INTERCITY' ? 'text-blue-600' : 'text-slate-600'}`}>Inter-City Moving</span>
          </button>
        </div>
      </section>

      <div className="h-2 bg-slate-50 my-4" />

      {/* Service List Section */}
      <section className="px-6 py-4">
        <h3 className="text-xl font-black text-slate-900 mb-8">
          {selectedCategory === 'LOCAL' ? 'Local Moving' : 'Inter-City Moving'}
        </h3>
        <div className="space-y-12">
          {currentServices.map((service) => (
            <div key={service.id} className="flex gap-6 pb-8 border-b border-slate-50 last:border-0">
              <div className="flex-1">
                <h4 className="text-lg font-bold text-slate-900 mb-2">{service.title}</h4>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-sm font-bold text-slate-600">{service.rating} ({service.reviews} reviews)</span>
                </div>
                <p className="text-slate-900 font-black mb-4">Starts at {service.price}</p>
                <div className="h-px w-full bg-slate-100 border-dashed border-t mb-4" />
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-4 line-clamp-2">
                  {service.description}
                </p>
                <button 
                  onClick={() => handleViewDetails(service)}
                  className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:underline"
                >
                  View details <ArrowLeft className="w-3 h-3 rotate-180" />
                </button>
              </div>
              <div className="w-32 flex flex-col items-center gap-3">
                <div className="w-32 h-32 rounded-[20px] overflow-hidden shadow-sm border border-slate-100">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                </div>
                
                {cart[service.id] ? (
                  <div className="w-full flex items-center justify-between bg-white border border-blue-600 rounded-xl overflow-hidden shadow-sm">
                    <button 
                      onClick={() => updateQuantity(service.id, -1)}
                      className="px-3 py-2.5 text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      -
                    </button>
                    <span className="font-black text-blue-600">{cart[service.id].quantity}</span>
                    <button 
                      onClick={() => updateQuantity(service.id, 1)}
                      className="px-3 py-2.5 text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => updateQuantity(service.id, 1)}
                    className="w-full py-2.5 bg-white border border-blue-600 text-blue-600 rounded-xl font-black text-sm hover:bg-blue-50 transition-all shadow-sm"
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky Bottom Cart Bar */}
      <AnimatePresence>
        {cartItemCount > 0 && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 pt-4 pb-8 flex items-center justify-between z-[100] shadow-[0_-4px_20px_rgba(0,0,0,0.1)] rounded-t-[32px] pb-safe"
          >
            <div className="flex flex-col">
              <span className="text-slate-900 font-black text-xl">₹{cartTotal.toLocaleString()}</span>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{cartItemCount} item{cartItemCount > 1 ? 's' : ''} added</span>
            </div>
            <button 
              onClick={() => onProceed(cart)}
              className="px-10 py-3.5 bg-blue-600 text-white rounded-xl font-black text-sm shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
            >
              Proceed
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Service Info Modal */}
      <ServiceInfoModal 
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        service={selectedServiceForInfo}
        onAdd={(extraItems, extraInventory) => selectedServiceForInfo && updateQuantity(selectedServiceForInfo.id, 1, extraItems, extraInventory)}
      />
    </div>
  );
};

export default ServiceDetailsPage;
