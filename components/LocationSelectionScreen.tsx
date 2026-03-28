import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MapPin, Navigation } from 'lucide-react';

interface LocationSelectionScreenProps {
  currentLocation: string;
  onClose: () => void;
  onUpdateLocation: (location: string) => void;
}

const LocationSelectionScreen: React.FC<LocationSelectionScreenProps> = ({ currentLocation, onClose, onUpdateLocation }) => {
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [showManualSearch, setShowManualSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCurrentLocation = () => {
    setIsLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
            const data = await res.json();
            onUpdateLocation(data.display_name || 'Current Location Found');
            onClose();
          } catch (e) {
            onUpdateLocation('Location Found (Custom)');
            onClose();
          } finally {
            setIsLoadingLocation(false);
          }
        },
        (err) => {
          console.error("Error getting location", err);
          setIsLoadingLocation(false);
          alert("Could not get your location. Please try manually.");
        }
      );
    } else {
      setIsLoadingLocation(false);
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onUpdateLocation(searchQuery);
      onClose();
    }
  };

  if (showManualSearch) {
    return (
      <div className="fixed inset-0 bg-white z-[200] flex flex-col animate-fadeIn">
        <header className="px-6 h-16 flex items-center border-b border-slate-100 shrink-0">
          <button onClick={() => setShowManualSearch(false)} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-slate-900" />
          </button>
          <h1 className="flex-1 text-center font-bold text-slate-900 mr-10">Enter Location</h1>
        </header>
        <div className="p-6 flex-1">
          <form onSubmit={handleManualSearch} className="flex gap-2">
            <input 
              type="text" 
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search city, area, or address..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl py-4 px-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm"
            />
            <button type="submit" className="bg-blue-600 text-white px-6 rounded-2xl font-bold hover:bg-blue-700 transition-colors">
              Search
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-[200] flex flex-col animate-fadeIn">
      {/* Top Header */}
      <header className="px-6 h-16 flex items-center shrink-0">
        <button onClick={onClose} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-slate-900" />
        </button>
      </header>

      {/* Map Section */}
      <div className="flex-1 relative bg-slate-50 flex items-center justify-center overflow-hidden">
        {/* Simulated Map Background */}
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        {/* Blue Location Pin */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-blue-200">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-inner">
              <MapPin className="w-6 h-6" />
            </div>
          </div>
          <div className="w-4 h-1 bg-black/20 rounded-full mt-2 blur-[2px]"></div>
        </div>

        {isLoadingLocation && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-20">
            <div className="bg-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="font-bold text-slate-700">Detecting location...</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Section */}
      <div className="p-8 bg-white rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] relative z-30 -mt-6">
        <h2 className="text-2xl font-black text-slate-900 mb-8 text-center">Where do you want your service?</h2>
        
        <div className="space-y-4">
          <button 
            onClick={handleCurrentLocation}
            disabled={isLoadingLocation}
            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            <Navigation className="w-5 h-5" />
            At my current location
          </button>
          
          <button 
            onClick={() => setShowManualSearch(true)}
            disabled={isLoadingLocation}
            className="w-full py-4 bg-white text-blue-600 border-2 border-blue-100 rounded-2xl font-black text-lg hover:bg-blue-50 transition-all active:scale-95 disabled:opacity-70"
          >
            I'll enter my location manually
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationSelectionScreen;
