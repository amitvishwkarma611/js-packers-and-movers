import React, { useRef, useState } from 'react';
import { BookingDetails } from '../types';
import { ICONS } from '../constants';
import MapPickerModal from './MapPickerModal.tsx';

interface Props {
  booking: BookingDetails;
  setBooking: (b: BookingDetails) => void;
}

const LocationStep: React.FC<Props> = ({ booking, setBooking }) => {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [activePicker, setActivePicker] = useState<'pickup' | 'drop' | null>(null);

  const isMumbai = (address: string) => {
    const lower = address.toLowerCase();
    return lower.includes('mumbai') || 
           lower.includes('navi mumbai');
  };

  const handleSetLocationFromMap = (address: string) => {
    if (activePicker === 'pickup') {
      if (!isMumbai(address)) {
        alert("We currently only provide pickup services from Mumbai & Navi Mumbai. Please select a location within these areas.");
        return;
      }
      setBooking({ ...booking, pickupAddress: address });
    } else {
      setBooking({ ...booking, dropAddress: address });
    }
    setActivePicker(null);
  };

  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      setBooking({ ...booking, pickupAddress: 'Fetching current location...' });
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
          const data = await res.json();
          const address = data.display_name || 'Current Location Found';
          if (!isMumbai(address)) {
            alert("We currently only provide pickup services from Mumbai & Navi Mumbai. Your current location seems to be outside our service area.");
            setBooking({ ...booking, pickupAddress: '' });
            return;
          }
          setBooking({ ...booking, pickupAddress: address });
        } catch (e) {
          setBooking({ ...booking, pickupAddress: 'Location Found (Custom)' });
        }
      });
    }
  };

  const handlePickupChange = (val: string) => {
    setBooking({ ...booking, pickupAddress: val });
  };

  return (
    <div className="animate-fadeIn max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Plan your route</h2>
        <p className="text-slate-500 font-medium">Accurate details help us provide the best equipment for your move.</p>
      </div>

      <div className="space-y-10 relative">
        {/* Connection line */}
        <div className="absolute left-6 top-16 bottom-16 w-1 border-l-2 border-dotted border-slate-200 hidden sm:block" />

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="sm:w-14 sm:h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200 flex-shrink-0 hidden sm:flex">
              <ICONS.Location className="w-6 h-6" />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex justify-between items-end mb-3">
                  <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-widest">Origin (Pick-up)</label>
                  <button 
                    onClick={useCurrentLocation}
                    className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-700 flex items-center gap-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    Use Current Location
                  </button>
                </div>
                <div className="relative">
                  <ICONS.Location className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 sm:hidden" />
                  <input
                    type="text"
                    placeholder="Search building or street address..."
                    className={`w-full sm:pl-5 pl-12 pr-14 py-4 bg-white border rounded-2xl focus:ring-4 outline-none transition-all font-semibold shadow-sm text-slate-900 ${
                      booking.pickupAddress && !isMumbai(booking.pickupAddress) 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/5' 
                        : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/5'
                    }`}
                    value={booking.pickupAddress}
                    onChange={(e) => handlePickupChange(e.target.value)}
                  />
                  {booking.pickupAddress && !isMumbai(booking.pickupAddress) && (
                    <p className="mt-2 text-xs font-bold text-red-500 animate-shake">
                      * We only provide pickup services from Mumbai & Navi Mumbai
                    </p>
                  )}
                  <button 
                    onClick={() => setActivePicker('pickup')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-100 transition-colors"
                    title="Select on Map"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.69c-.381.19-.622.58-.622 1.006v10.743c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col">
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Floor Number</label>
                  <input 
                    type="number" 
                    min="0"
                    placeholder="0"
                    className="bg-transparent border-none p-0 focus:ring-0 text-lg font-bold text-slate-900 placeholder:text-slate-300"
                    value={booking.floorPickup || ''}
                    onChange={(e) => setBooking({...booking, floorPickup: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between group cursor-pointer" onClick={() => setBooking({...booking, hasLiftPickup: !booking.hasLiftPickup})}>
                  <div className="flex flex-col">
                    <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Lift Access</label>
                    <span className="text-sm font-bold text-slate-900">{booking.hasLiftPickup ? 'Available' : 'No Lift'}</span>
                  </div>
                  <div className={`w-12 h-6 rounded-full transition-all relative ${booking.hasLiftPickup ? 'bg-blue-600' : 'bg-slate-300'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${booking.hasLiftPickup ? 'left-7' : 'left-1'}`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="sm:w-14 sm:h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 shadow-sm flex-shrink-0 hidden sm:flex">
              <ICONS.Location className="w-6 h-6" />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3">Destination (Drop-off)</label>
                <div className="relative">
                  <ICONS.Location className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 sm:hidden" />
                  <input
                    type="text"
                    placeholder="Search city or locality..."
                    className="w-full sm:pl-5 pl-12 pr-14 py-4 bg-white border border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-semibold shadow-sm text-slate-900"
                    value={booking.dropAddress}
                    onChange={(e) => setBooking({ ...booking, dropAddress: e.target.value })}
                  />
                  <button 
                    onClick={() => setActivePicker('drop')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-100 transition-colors"
                    title="Select on Map"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.69c-.381.19-.622.58-.622 1.006v10.743c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col">
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Floor Number</label>
                  <input 
                    type="number" 
                    min="0"
                    placeholder="0"
                    className="bg-transparent border-none p-0 focus:ring-0 text-lg font-bold text-slate-900 placeholder:text-slate-300"
                    value={booking.floorDrop || ''}
                    onChange={(e) => setBooking({...booking, floorDrop: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between group cursor-pointer" onClick={() => setBooking({...booking, hasLiftDrop: !booking.hasLiftDrop})}>
                  <div className="flex flex-col">
                    <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Lift Access</label>
                    <span className="text-sm font-bold text-slate-900">{booking.hasLiftDrop ? 'Available' : 'No Lift'}</span>
                  </div>
                  <div className={`w-12 h-6 rounded-full transition-all relative ${booking.hasLiftDrop ? 'bg-blue-600' : 'bg-slate-300'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${booking.hasLiftDrop ? 'left-7' : 'left-1'}`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 relative z-10">
          <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
            <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-4">Shifting Schedule</label>
            <div className="relative group cursor-pointer" onClick={() => dateInputRef.current?.showPicker()}>
              <div className="absolute left-5 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                <ICONS.Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <input
                type="date"
                ref={dateInputRef}
                onClick={(e) => {
                  e.stopPropagation();
                  (e.target as any).showPicker?.();
                }}
                className="w-full pl-14 pr-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold text-slate-900 cursor-pointer"
                min={new Date().toISOString().split('T')[0]}
                value={booking.moveDate}
                onChange={(e) => setBooking({ ...booking, moveDate: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      {activePicker && (
        <MapPickerModal 
          onClose={() => setActivePicker(null)} 
          onConfirm={handleSetLocationFromMap} 
        />
      )}
    </div>
  );
};

export default LocationStep;