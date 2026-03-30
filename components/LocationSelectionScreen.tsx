import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MapPin, Navigation, Check } from 'lucide-react';

interface LocationSelectionScreenProps {
  currentLocation: string;
  isDropAddress?: boolean;
  onClose: () => void;
  onUpdateLocation: (location: string, coordinates?: { lat: number, lng: number }) => void;
}

const LocationSelectionScreen: React.FC<LocationSelectionScreenProps> = ({ currentLocation, isDropAddress, onClose, onUpdateLocation }) => {
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [showManualSearch, setShowManualSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(currentLocation);
  const [selectedCoordinates, setSelectedCoordinates] = useState<{lat: number, lng: number} | undefined>();
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<any>(null);
  const markerRef = useRef<any>(null);

  const isMumbai = (address: string) => {
    if (!address) return false;
    const lower = address.toLowerCase();
    return lower.includes('mumbai') || lower.includes('navi mumbai');
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    setIsLoadingLocation(true);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
      const data = await response.json();
      const addr = data.display_name || 'Address not found';
      setSelectedAddress(addr);
      setSelectedCoordinates({ lat, lng });
    } catch (error) {
      setSelectedAddress('Error fetching address');
    } finally {
      setIsLoadingLocation(false);
    }
  };

  useEffect(() => {
    if (!mapRef.current || showManualSearch) return;

    const L = (window as any).L;
    if (!L) return;

    // Default to Mumbai center
    const initialPos = [19.0760, 72.8777];
    
    leafletMap.current = L.map(mapRef.current, {
      center: initialPos,
      zoom: 13,
      zoomControl: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(leafletMap.current);

    L.control.zoom({ position: 'bottomright' }).addTo(leafletMap.current);

    // Initial Marker
    markerRef.current = L.marker(initialPos, { draggable: true }).addTo(leafletMap.current);
    
    // Handle map click
    leafletMap.current.on('click', (e: any) => {
      const { lat, lng } = e.latlng;
      markerRef.current.setLatLng(e.latlng);
      reverseGeocode(lat, lng);
    });

    // Handle marker drag
    markerRef.current.on('dragend', (e: any) => {
      const { lat, lng } = e.target.getLatLng();
      reverseGeocode(lat, lng);
    });

    // Get User Geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const userPos = [latitude, longitude];
        leafletMap.current.setView(userPos, 16);
        markerRef.current.setLatLng(userPos);
        reverseGeocode(latitude, longitude);
      });
    }

    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
      }
    };
  }, [showManualSearch]);

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLoadingLocation(true);
      navigator.geolocation.getCurrentPosition((pos) => {
        const latlng = [pos.coords.latitude, pos.coords.longitude];
        if (leafletMap.current) {
          leafletMap.current.setView(latlng, 17);
          markerRef.current.setLatLng(latlng);
        }
        reverseGeocode(pos.coords.latitude, pos.coords.longitude);
      });
    }
  };

  const handleManualSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (!isDropAddress && !isMumbai(searchQuery)) {
        alert("We currently only provide pickup services from Mumbai & Navi Mumbai. Please search for a location within these areas.");
        return;
      }
      
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        if (data && data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lng = parseFloat(data[0].lon);
          onUpdateLocation(searchQuery, { lat, lng });
        } else {
          onUpdateLocation(searchQuery);
        }
      } catch (error) {
        onUpdateLocation(searchQuery);
      }
      onClose();
    }
  };

  const confirmLocation = () => {
    if (!isDropAddress && !isMumbai(selectedAddress)) {
      alert("We currently only provide pickup services from Mumbai & Navi Mumbai. Please select a location within these areas.");
      return;
    }
    onUpdateLocation(selectedAddress, selectedCoordinates);
    onClose();
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
      <header className="px-6 h-16 flex items-center shrink-0 absolute top-0 left-0 right-0 z-[210] bg-white/80 backdrop-blur-md">
        <button onClick={onClose} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-slate-900" />
        </button>
        <h1 className="flex-1 text-center font-bold text-slate-900 mr-10">Select Service Location</h1>
      </header>

      {/* Map Section */}
      <div ref={mapRef} className="flex-1 relative bg-slate-100" />

      {/* Bottom Section */}
      <div className="p-8 bg-white rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] relative z-30 -mt-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Selected Address</span>
            {isLoadingLocation && <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />}
          </div>
          <p className="text-slate-900 font-bold text-sm leading-relaxed line-clamp-2 min-h-[2.5rem]">
            {selectedAddress}
          </p>
        </div>
        
        <div className="space-y-3">
          <button 
            onClick={confirmLocation}
            disabled={isLoadingLocation}
            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            <Check className="w-5 h-5" />
            Confirm Location
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={handleCurrentLocation}
              disabled={isLoadingLocation}
              className="py-3 bg-slate-50 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4" />
              Locate Me
            </button>
            <button 
              onClick={() => setShowManualSearch(true)}
              disabled={isLoadingLocation}
              className="py-3 bg-slate-50 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
            >
              Search Manually
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSelectionScreen;
