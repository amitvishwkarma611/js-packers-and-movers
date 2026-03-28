import React, { useEffect, useRef, useState } from 'react';

interface Props {
  onConfirm: (address: string) => void;
  onClose: () => void;
}

const MapPickerModal: React.FC<Props> = ({ onConfirm, onClose }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [address, setAddress] = useState<string>('Searching location...');
  const [loading, setLoading] = useState(true);

  const reverseGeocode = async (lat: number, lng: number) => {
    setLoading(true);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
      const data = await response.json();
      setAddress(data.display_name || 'Address not found');
    } catch (error) {
      setAddress('Error fetching address');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!mapRef.current) return;

    const L = (window as any).L;
    if (!L) return;

    // Default to a central location (e.g., Bangalore)
    const initialPos = [12.9716, 77.5946];
    
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
    reverseGeocode(initialPos[0], initialPos[1]);

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
  }, []);

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white w-full max-w-4xl rounded-[40px] overflow-hidden shadow-3xl flex flex-col h-[85vh] relative">
        <div className="absolute top-6 right-6 z-[160]">
          <button 
            onClick={onClose}
            className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div ref={mapRef} className="flex-1 bg-slate-100 relative" />

        <div className="bg-white p-8 lg:p-10 border-t border-slate-100 flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Selected Location</span>
              {loading && <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />}
            </div>
            <p className="text-slate-900 font-bold text-lg leading-relaxed line-clamp-2">
              {address}
            </p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <button 
              onClick={() => {
                 if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((pos) => {
                      const latlng = [pos.coords.latitude, pos.coords.longitude];
                      leafletMap.current.setView(latlng, 17);
                      markerRef.current.setLatLng(latlng);
                      reverseGeocode(pos.coords.latitude, pos.coords.longitude);
                    });
                 }
              }}
              className="px-6 py-4 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-all flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              Locate Me
            </button>
            <button 
              onClick={() => onConfirm(address)}
              disabled={loading || address === 'Searching location...'}
              className="flex-1 px-10 py-4 bg-blue-600 text-white rounded-[20px] font-black text-lg shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all disabled:opacity-50"
            >
              Confirm Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPickerModal;