import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { ServiceItem } from './ServiceDetailsPage';
import AddressBottomSheet from './AddressBottomSheet';
import LocationSelectionScreen from './LocationSelectionScreen';
import { COMMON_ITEMS } from '../constants.tsx';

interface PaymentSummaryPageProps {
  cart: { [key: string]: { quantity: number; extraItems: number; extraInventory?: { [key: string]: number } } };
  services: ServiceItem[];
  onBack: () => void;
  onSelectAddress: (addressDetails: any) => void;
}

const PaymentSummaryPage: React.FC<PaymentSummaryPageProps> = ({ cart, services, onBack, onSelectAddress }) => {
  const [isAddressSheetOpen, setIsAddressSheetOpen] = useState(false);
  const [isLocationScreenOpen, setIsLocationScreenOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('Nagrik DryFruits, Chinchpada, Airoli, Navi Mumbai, Thane Taluka, Thane, Maharashtra, 400708, India');
  const [selectedAddresses, setSelectedAddresses] = useState<{pickup?: any, drop?: any}>({});

  const selectedServices = Object.entries(cart).map(([id, item]: [string, { quantity: number; extraItems: number; extraInventory?: { [key: string]: number } }]) => {
    const service = services.find(s => s.id === id);
    if (!service) return null;
    return { ...service, quantity: item.quantity, extraItems: item.extraItems, extraInventory: item.extraInventory };
  }).filter((s): s is (ServiceItem & { quantity: number; extraItems: number; extraInventory?: { [key: string]: number } }) => s !== null);

  const itemTotal = selectedServices.reduce((total, s) => {
    const priceStr = s.price || '0';
    const basePrice = parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
    
    // Calculate extra price based on inventory
    let extraPrice = 0;
    if (s.extraInventory) {
      extraPrice = Object.entries(s.extraInventory).reduce((acc, [name, qty]) => {
        const item = COMMON_ITEMS.find(i => i.name === name);
        const price = item?.price || 500;
        return acc + (price * qty);
      }, 0);
    } else {
      // Fallback to generic extra items if no inventory
      extraPrice = s.extraItems * 500;
    }
    
    return total + ((basePrice + extraPrice) * s.quantity);
  }, 0);

  const visitingCharges = 0;
  const totalEstimated = itemTotal + visitingCharges;
  const bookingAmount = 0;

  if (selectedServices.length === 0) {
    return (
      <div className="bg-white min-h-screen flex flex-col animate-fadeIn">
        <header className="px-6 h-16 flex items-center border-b border-slate-100 sticky top-0 bg-white z-[100]">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-slate-900" />
          </button>
          <h1 className="flex-1 text-center font-bold text-slate-900 mr-10">Cart</h1>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center px-10 text-center">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-slate-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121 -2.3 2.1 -4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
          </div>
          <h2 className="text-xl font-black text-slate-900 mb-2">Your cart is empty</h2>
          <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">
            Looks like you haven't added any services yet. Start exploring our moving services now!
          </p>
          <button 
            onClick={onBack}
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-black text-base shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
          >
            Explore Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-44 animate-fadeIn">
      {/* Header */}
      <header className="px-6 h-16 flex items-center bg-white border-b border-slate-100 sticky top-0 z-[100]">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-slate-900" />
        </button>
        <h1 className="flex-1 text-center font-bold text-slate-900 mr-10">Packers and Movers</h1>
      </header>

      {/* Selected Services Summary */}
      <div className="bg-white px-6 py-6 mb-2">
        {selectedServices.map(service => (
          <div key={service.id} className="mb-4 last:mb-0">
            <div className="flex justify-between items-start">
              <span className="text-slate-700 font-medium text-sm">{service.title} x {service.quantity}</span>
              <span className="text-slate-900 font-bold text-sm">₹{((parseInt(service.price.replace(/[^0-9]/g, '')) || 0) * service.quantity).toLocaleString()}</span>
            </div>
            {service.extraItems > 0 && (
              <div className="flex justify-between items-center mt-1">
                <span className="text-blue-600 font-bold text-[11px] uppercase tracking-wider">+ {service.extraItems} Extra Item{service.extraItems > 1 ? 's' : ''}</span>
                <span className="text-blue-600 font-bold text-[11px]">
                  ₹{(() => {
                    let extraPrice = 0;
                    if (service.extraInventory) {
                      extraPrice = Object.entries(service.extraInventory).reduce((acc, [name, qty]) => {
                        const item = COMMON_ITEMS.find(i => i.name === name);
                        const price = item?.price || 500;
                        return acc + (price * qty);
                      }, 0);
                    } else {
                      extraPrice = service.extraItems * 500;
                    }
                    return (extraPrice * service.quantity).toLocaleString();
                  })()}
                </span>
              </div>
            )}
          </div>
        ))}

        <div className="mt-6 flex gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
          <div className="bg-white rounded-full p-1 h-fit shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-emerald-800 text-[11px] leading-relaxed font-medium">
            Charges may be subject to change based on the final scope of work. Any adjustments to the scope may result in a modification of the total cost.
          </p>
        </div>
      </div>

      {/* Address Selection Summary */}
      {(selectedAddresses.pickup || selectedAddresses.drop) && (
        <div className="bg-white px-6 py-6 mb-2">
          <h3 className="text-lg font-black text-slate-900 mb-6">Move Details</h3>
          <div className="space-y-6">
            {selectedAddresses.pickup && (
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pickup Address</p>
                  <p className="text-sm font-bold text-slate-900 leading-relaxed">
                    {selectedAddresses.pickup.houseNo}, {selectedAddresses.pickup.landmark ? selectedAddresses.pickup.landmark + ', ' : ''}{selectedAddresses.pickup.fullAddress}
                  </p>
                  <div className="flex gap-2 mt-1">
                    {selectedAddresses.pickup.floor && (
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-bold">Floor: {selectedAddresses.pickup.floor}</span>
                    )}
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-bold">
                      {selectedAddresses.pickup.hasLift ? 'Lift available' : 'No lift'}
                    </span>
                  </div>
                </div>
              </div>
            )}
            {selectedAddresses.drop && (
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-emerald-600" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Drop Address</p>
                  <p className="text-sm font-bold text-slate-900 leading-relaxed">
                    {selectedAddresses.drop.houseNo}, {selectedAddresses.drop.landmark ? selectedAddresses.drop.landmark + ', ' : ''}{selectedAddresses.drop.fullAddress}
                  </p>
                  <div className="flex gap-2 mt-1">
                    {selectedAddresses.drop.floor && (
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-bold">Floor: {selectedAddresses.drop.floor}</span>
                    )}
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-bold">
                      {selectedAddresses.drop.hasLift ? 'Lift available' : 'No lift'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Payment Summary */}
      <div className="bg-white px-6 py-6 mb-2">
        <h3 className="text-lg font-black text-slate-900 mb-6">Payment Summary</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between text-slate-600 font-medium text-sm">
            <span>Item total</span>
            <span>₹{itemTotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-slate-600 font-medium text-sm">
            <span>Visiting charges</span>
            <span>₹{visitingCharges}</span>
          </div>
          
          <div className="h-px bg-slate-100 border-dashed border-t my-4" />
          
          <div className="flex justify-between text-slate-900 font-black text-base">
            <span>Total Estimated</span>
            <span>₹{totalEstimated.toLocaleString()}</span>
          </div>

          <div className="h-px bg-slate-100 border-dashed border-t my-4" />

          <div className="flex justify-between text-slate-600 font-medium text-sm">
            <span>Booking Amount(Now)</span>
            <span>₹{bookingAmount}</span>
          </div>

          <div className="h-px bg-slate-100 border-dashed border-t my-4" />

          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-600 font-medium">Pay after service</span>
            <span className="text-slate-900 font-bold">As per final bill</span>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="px-6 py-4">
        <div className="bg-slate-100 rounded-2xl p-6">
          <h4 className="font-black text-slate-900 mb-4 text-sm">Notes</h4>
          <ul className="space-y-3">
            <li className="flex gap-3 text-xs text-slate-600 font-medium">
              <span className="text-slate-400">•</span>
              The provided cost is an approximate estimate.
            </li>
            <li className="flex gap-3 text-xs text-slate-600 font-medium">
              <span className="text-slate-400">•</span>
              Final estimation will be provided after inspection.
            </li>
            <li className="flex gap-3 text-xs text-slate-600 font-medium">
              <span className="text-slate-400">•</span>
              No advance payment required at the time of booking.
            </li>
          </ul>
        </div>
      </div>

      {/* Service Process Section */}
      <div className="bg-white px-6 py-8">
        <h3 className="text-lg font-black text-slate-900 mb-4">Service Process</h3>
        <p className="text-slate-600 text-sm leading-relaxed font-medium mb-4">
          Our service begins with an expert inspection to understand your needs, followed by a transparent cost estimation. Once approved, we schedule the service at your convenience.
        </p>
        <button className="text-blue-600 font-bold text-sm hover:underline">
          Read full process
        </button>
      </div>

      {/* Bottom Sticky Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 pt-4 pb-12 z-[100] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] rounded-t-[32px] pb-safe">
        <button 
          onClick={() => {
            if (selectedAddresses.pickup && selectedAddresses.drop) {
              onSelectAddress(selectedAddresses);
            } else {
              setIsAddressSheetOpen(true);
            }
          }}
          className="w-full py-4 bg-blue-600 text-white rounded-xl font-black text-base shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
        >
          {selectedAddresses.pickup && selectedAddresses.drop ? 'Confirm booking' : 'Select address'}
        </button>
      </div>

      {/* Address Confirmation Bottom Sheet */}
      <AddressBottomSheet 
        isOpen={isAddressSheetOpen}
        onClose={() => setIsAddressSheetOpen(false)}
        onSave={(details) => {
          setSelectedAddresses(details);
          setIsAddressSheetOpen(false);
        }}
        detectedLocation={currentLocation}
        onOpenMap={() => setIsLocationScreenOpen(true)}
      />

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

export default PaymentSummaryPage;
