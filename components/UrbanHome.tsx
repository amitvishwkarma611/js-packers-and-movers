import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  ChevronDown, 
  ShoppingCart, 
  Star,
  Sparkles,
  Hammer,
  Wrench,
  Trash2,
  Bug,
  Truck,
  Paintbrush,
  Home,
  LayoutGrid,
  ArrowRight
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import MoversBottomSheet from './MoversBottomSheet';
import LocationSelectionScreen from './LocationSelectionScreen';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Category {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
}

interface Service {
  id: string;
  name: string;
  price: string;
  rating: number;
  image: string;
}

interface ServiceItem {
  id: string;
  name: string;
  image: string;
}

interface StoryItem {
  id: string;
  title: string;
  image: string;
}

const categories: Category[] = [
  { id: '1', title: 'Salon & Spa', icon: <Sparkles className="w-6 h-6" />, color: 'bg-purple-100 text-purple-600' },
  { id: '2', title: 'Handyman', icon: <Hammer className="w-6 h-6" />, color: 'bg-blue-100 text-blue-600' },
  { id: '3', title: 'Appliance Repair', icon: <Wrench className="w-6 h-6" />, color: 'bg-orange-100 text-orange-600' },
  { id: '4', title: 'Cleaning & Pest', icon: <Bug className="w-6 h-6" />, color: 'bg-green-100 text-green-600' },
  { id: '5', title: 'Mosquito Net', icon: <LayoutGrid className="w-6 h-6" />, color: 'bg-cyan-100 text-cyan-600' },
  { id: '6', title: 'Movers & Storage', icon: <Truck className="w-6 h-6" />, color: 'bg-indigo-100 text-indigo-600' },
  { id: '7', title: 'Renovation', icon: <Home className="w-6 h-6" />, color: 'bg-rose-100 text-rose-600' },
  { id: '8', title: 'Painting', icon: <Paintbrush className="w-6 h-6" />, color: 'bg-amber-100 text-amber-600' },
  { id: '9', title: 'More Categories', icon: <ArrowRight className="w-6 h-6" />, color: 'bg-slate-100 text-slate-600' },
];

const banners = [
  { id: '1', text: 'Full House Cleaning Starts at ₹2599', subtext: 'Book Now', color: 'bg-blue-600' },
  { id: '2', text: 'AC Service & Repair at ₹499', subtext: 'Expert Technicians', color: 'bg-indigo-600' },
  { id: '3', text: 'Professional Painting Services', subtext: 'Get Free Quote', color: 'bg-emerald-600' },
];

const popularServices: Service[] = [
  { id: '1', name: 'Deep House Cleaning', price: '₹2599', rating: 4.8, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=400' },
  { id: '2', name: 'AC Deep Cleaning', price: '₹599', rating: 4.9, image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=400' },
  { id: '3', name: 'Bathroom Cleaning', price: '₹399', rating: 4.7, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400' },
  { id: '4', name: 'Sofa Cleaning', price: '₹499', rating: 4.8, image: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=80&w=400' },
];

const cleaningServices: ServiceItem[] = [
  { id: 'c1', name: 'Full Home Cleaning', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=400' },
  { id: 'c2', name: 'Bathroom Cleaning', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400' },
  { id: 'c3', name: 'Sofa, Carpet & Mattress Cleaning', image: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=80&w=400' },
  { id: 'c4', name: 'Kitchen Deep Cleaning', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=400' },
  { id: 'c5', name: 'Pest Control Service', image: 'https://images.unsplash.com/photo-1622606670838-8959f6355b25?auto=format&fit=crop&q=80&w=400' },
];

const applianceServices: ServiceItem[] = [
  { id: 'a1', name: 'AC Repair Service', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=400' },
  { id: 'a2', name: 'Chimney Repair Service', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=400' },
  { id: 'a3', name: 'Washing Machine Repair Service', image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=400' },
  { id: 'a4', name: 'Refrigerator Repair Service', image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&q=80&w=400' },
  { id: 'a5', name: 'Microwave Repair Service', image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&q=80&w=400' },
];

const renovationServices: ServiceItem[] = [
  { id: 'r1', name: 'Home renovation', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=400' },
  { id: 'r2', name: 'Bathroom renovation', image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=400' },
  { id: 'r3', name: 'Kitchen renovation', image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&q=80&w=400' },
  { id: 'r4', name: 'Modular kitchen', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=400' },
  { id: 'r5', name: 'False ceiling', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400' },
];

const stories: StoryItem[] = [
  { id: 's1', title: 'Cold showers in winter? Hard pass', image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=400' },
  { id: 's2', title: 'Winter Home Repairs & Tips', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400' },
  { id: 's3', title: 'Top 7 Signs Your Electrical Wiring Needs Repair', image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=400' },
];

interface UrbanHomeProps {
  onStartBooking: () => void;
  onSelectMoversService: (serviceId: string) => void;
  onSelectNaturals: () => void;
  onCartClick: () => void;
  cart: { [key: string]: any };
}

const UrbanHome: React.FC<UrbanHomeProps> = ({ onStartBooking, onSelectMoversService, onSelectNaturals, onCartClick, cart }) => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isMoversSheetOpen, setIsMoversSheetOpen] = useState(false);
  const [isLocationScreenOpen, setIsLocationScreenOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('Navi Mumbai');
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [comingSoonCategory, setComingSoonCategory] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleCategoryClick = (cat: Category) => {
    if (cat.id === '6') {
      setIsMoversSheetOpen(true);
    } else if (cat.id === '1') {
      onSelectNaturals();
    } else {
      setComingSoonCategory(cat.title);
      setShowComingSoon(true);
      setTimeout(() => setShowComingSoon(false), 3000);
    }
  };

  const handleServiceClick = (serviceName: string) => {
    setComingSoonCategory(serviceName);
    setShowComingSoon(true);
    setTimeout(() => setShowComingSoon(false), 3000);
  };

  const HorizontalScrollSection = ({ title, items }: { title: string, items: ServiceItem[] }) => (
    <section className="py-6">
      <h2 className="px-6 text-lg font-bold text-slate-900 mb-4">{title}</h2>
      <div className="flex overflow-x-auto no-scrollbar gap-4 px-6 pb-2">
        {items.map((item) => (
          <motion.div
            key={item.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleServiceClick(item.name)}
            className="flex-shrink-0 w-28 flex flex-col items-center gap-2 cursor-pointer"
          >
            <div className="w-28 h-28 rounded-2xl overflow-hidden shadow-sm border border-slate-100">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <span className="text-xs font-medium text-slate-700 text-center leading-tight line-clamp-2">
              {item.name}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="bg-white min-h-screen pb-24 animate-fadeIn">
      {/* Top Section */}
      <header className="px-6 pt-4 pb-2 sticky top-0 bg-white z-40">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col cursor-pointer" onClick={() => setIsLocationScreenOpen(true)}>
            <div className="flex items-center gap-1 text-slate-900 font-bold text-lg">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="truncate max-w-[150px]">{currentLocation}</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
            <span className="text-xs text-slate-400 font-medium truncate max-w-[200px]">Tap to change location</span>
          </div>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 opacity-50">
              <ShoppingCart className="w-5 h-5" />
            </div>
            {Object.keys(cart || {}).length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-slate-300 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {Object.keys(cart).length}
              </span>
            )}
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Search for services"
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm"
          />
        </div>
      </header>

      {/* Categories Grid */}
      <section className="px-6 py-6">
        <div className="grid grid-cols-3 gap-4">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryClick(cat)}
              className="flex flex-col items-center gap-2 group"
            >
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm transition-shadow group-hover:shadow-md",
                cat.color
              )}>
                {cat.icon}
              </div>
              <span className="text-[11px] font-bold text-slate-700 text-center leading-tight">
                {cat.title}
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Promotional Banner Carousel */}
      <section className="px-6 py-4">
        <div className="relative h-40 rounded-[24px] overflow-hidden shadow-lg shadow-blue-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBanner}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className={cn(
                "absolute inset-0 p-8 flex flex-col justify-center text-white",
                banners[currentBanner].color
              )}
            >
              <div className="max-w-[70%]">
                <h3 className="text-xl font-black leading-tight mb-2">
                  {banners[currentBanner].text}
                </h3>
                <button className="bg-white text-slate-900 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-slate-50 transition-colors">
                  {banners[currentBanner].subtext}
                </button>
              </div>
              <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Sparkles className="w-16 h-16 text-white/40 rotate-12" />
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="absolute bottom-4 left-8 flex gap-1.5">
            {banners.map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === currentBanner ? "w-6 bg-white" : "w-1.5 bg-white/40"
                )}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services Section */}
      <section className="py-8">
        <div className="px-6 flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Most Booked Services
          </h2>
          <button className="text-blue-600 text-sm font-bold hover:underline">
            View All
          </button>
        </div>

        <div className="flex overflow-x-auto no-scrollbar gap-4 px-6 pb-4">
          {popularServices.map((service) => (
            <motion.div
              key={service.id}
              whileHover={{ y: -4 }}
              className="flex-shrink-0 w-48 bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden group cursor-pointer"
              onClick={() => {
                setComingSoonCategory(service.name);
                setShowComingSoon(true);
                setTimeout(() => setShowComingSoon(false), 3000);
              }}
            >
              <div className="h-32 relative overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span className="text-[10px] font-black text-slate-900">{service.rating}</span>
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-sm font-bold text-slate-900 mb-1 line-clamp-1">
                  {service.name}
                </h4>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-black text-sm">{service.price}</span>
                  <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="px-6 py-4">
        <div className="bg-slate-50 rounded-[24px] p-6 grid grid-cols-2 gap-4 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-slate-600 leading-tight uppercase tracking-wider">Verified Professionals</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Star className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-slate-600 leading-tight uppercase tracking-wider">Top Rated Services</span>
          </div>
        </div>
      </section>

      {/* Cleaning & Pest Services */}
      <HorizontalScrollSection title="Cleaning & Pest Services" items={cleaningServices} />

      {/* Appliances & Repair */}
      <HorizontalScrollSection title="Appliances & Repair" items={applianceServices} />

      {/* Promotional Banner */}
      <section className="px-6 py-4">
        <div className="relative h-48 rounded-2xl overflow-hidden cursor-pointer" onClick={() => handleServiceClick('Wall Makeovers')}>
          <img 
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800" 
            alt="Wall Makeovers" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end">
            <h3 className="text-white font-black text-2xl leading-tight mb-2 max-w-[70%]">
              Wall Makeovers
            </h3>
            <p className="text-white/90 text-xs font-medium mb-4 max-w-[60%]">
              Revamp Your Space, Not Your Budget
            </p>
            <button className="bg-white text-slate-900 px-4 py-2 rounded-lg text-xs font-bold w-fit shadow-sm">
              Book Now
            </button>
          </div>
        </div>
      </section>

      {/* Renovation & Fabrications */}
      <HorizontalScrollSection title="Renovation & Fabrications" items={renovationServices} />

      {/* Stories Section */}
      <section className="py-6">
        <h2 className="px-6 text-lg font-bold text-slate-900 mb-4">Stories</h2>
        <div className="flex overflow-x-auto no-scrollbar gap-4 px-6 pb-2">
          {stories.map((story) => (
            <motion.div
              key={story.id}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 w-40 h-56 relative rounded-2xl overflow-hidden shadow-sm cursor-pointer"
            >
              <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                <span className="text-white text-xs font-bold leading-tight">
                  {story.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Movers Bottom Sheet */}
      <MoversBottomSheet 
        isOpen={isMoversSheetOpen} 
        onClose={() => setIsMoversSheetOpen(false)} 
        onSelectService={(serviceId) => {
          setIsMoversSheetOpen(false);
          onSelectMoversService(serviceId);
        }}
      />

      {/* Coming Soon Toast */}
      <AnimatePresence>
        {showComingSoon && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 whitespace-nowrap"
          >
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm">{comingSoonCategory} is coming soon!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Location Selection Screen */}
      {isLocationScreenOpen && (
        <LocationSelectionScreen
          currentLocation={currentLocation}
          onClose={() => setIsLocationScreenOpen(false)}
          onUpdateLocation={(loc) => {
            setCurrentLocation(loc);
            setIsLocationScreenOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default UrbanHome;
