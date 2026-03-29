import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

const ServiceAreaMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const L = (window as any).L;
    if (!L) return;

    // Mumbai coordinates
    const mumbaiPos = [19.0760, 72.8777];
    
    leafletMap.current = L.map(mapRef.current, {
      center: mumbaiPos,
      zoom: 10,
      zoomControl: false,
      scrollWheelZoom: false,
      dragging: !L.Browser.mobile,
      touchZoom: L.Browser.mobile
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(leafletMap.current);

    // Add a circle to show service area
    L.circle(mumbaiPos, {
      color: '#1e40af',
      fillColor: '#1e40af',
      fillOpacity: 0.1,
      radius: 30000 // 30km radius
    }).addTo(leafletMap.current);

    // Add marker for main office
    const marker = L.marker(mumbaiPos).addTo(leafletMap.current);
    marker.bindPopup("<b>Jaiswal Packers & Movers</b><br>Main Office, Mumbai").openPopup();

    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
      }
    };
  }, []);

  return (
    <section className="px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Our Presence</h2>
          <p className="text-xs text-slate-500 font-medium">Serving Mumbai & Navi Mumbai</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
          <MapPin className="w-5 h-5" />
        </div>
      </div>
      
      <div className="relative h-64 rounded-[32px] overflow-hidden border border-slate-100 shadow-sm">
        <div ref={mapRef} className="w-full h-full z-0" />
        <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg z-10 border border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-700">Operating in 50+ localities across MMR</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaMap;
