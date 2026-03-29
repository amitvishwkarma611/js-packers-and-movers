
import React from 'react';
import { BookingDetails, PriceEstimate } from '../types';
import { ICONS, COMMON_ITEMS } from '../constants';

interface Props {
  booking: BookingDetails;
  estimate: PriceEstimate;
  selectedServices?: any[];
}

const ReviewStep: React.FC<Props> = ({ booking, estimate, selectedServices = [] }) => {
  return (
    <div className="animate-fadeIn">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-slate-900 mb-2">Review Your Move</h2>
        <p className="text-slate-500 font-medium">Please verify all details before confirming your booking.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Selected Packages */}
          {selectedServices.length > 0 && (
            <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                  <ICONS.Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-slate-900">Selected Packages</h3>
              </div>
              
              <div className="space-y-4">
                {selectedServices.map((service, idx) => (
                  <div key={idx} className="bg-purple-50/30 rounded-[28px] border border-purple-100/50 overflow-hidden">
                    <div className="flex justify-between items-center p-5 bg-purple-50/50 border-b border-purple-100/50">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-purple-100">
                          {service.icon}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-base font-black text-slate-900">{service.title}</span>
                          <span className="text-[10px] text-purple-600 font-black uppercase tracking-widest">{service.category}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-black text-purple-600">
                          ₹{(() => {
                            const basePrice = parseInt(service.price.replace(/[^0-9]/g, '')) || 0;
                            const extraPrice = Object.entries(service.extraInventory || {}).reduce((total, [name, qty]) => {
                              const item = COMMON_ITEMS.find(i => i.name === name);
                              const price = (item?.category.startsWith('Packing')) ? 50 : 500;
                              return total + (price * (qty as number));
                            }, 0);
                            return ((basePrice + extraPrice) * service.quantity).toLocaleString();
                          })()}
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Quantity: {service.quantity}</p>
                        {service.extraItems > 0 && (
                          <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest">
                            +{service.extraItems} Extra Items (₹{
                              Object.entries(service.extraInventory || {}).reduce((total, [name, qty]) => {
                                const item = COMMON_ITEMS.find(i => i.name === name);
                                const price = (item?.category.startsWith('Packing')) ? 50 : 500;
                                return total + (price * (qty as number));
                              }, 0).toLocaleString()
                            } total extra)
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="p-6 space-y-6">
                      {/* Truck Size */}
                      {service.truckSize && (
                        <div className="flex gap-4">
                          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-blue-600 shrink-0 shadow-sm border border-blue-50">
                            <ICONS.Truck className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-0.5">Truck Size</h4>
                            <p className="text-sm font-bold text-slate-900">{service.truckSize}</p>
                          </div>
                        </div>
                      )}

                      {/* Included Services */}
                      {service.includedServices && service.includedServices.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <ICONS.CheckCircle className="w-4 h-4 text-emerald-500" />
                            Included Services
                          </h4>
                          <ul className="grid grid-cols-1 gap-2 pl-6">
                            {service.includedServices.map((item: string, i: number) => (
                              <li key={i} className="text-xs text-slate-600 font-bold flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-200" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Included Items */}
                      {(service.includedItems && service.includedItems.length > 0 || (service.extraInventory && Object.keys(service.extraInventory).length > 0)) && (
                        <div className="space-y-3">
                          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <ICONS.Info className="w-4 h-4 text-blue-500" />
                            Included Items
                          </h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-6">
                            {service.includedItems?.map((item: string, i: number) => (
                              <li key={i} className="text-xs text-slate-600 font-bold flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-200" />
                                {item}
                              </li>
                            ))}
                            {service.extraInventory && Object.entries(service.extraInventory).map(([name, qty], i) => (
                              <li key={`extra-${i}`} className="text-xs text-blue-600 font-black flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                {name} <span className="text-[10px] opacity-70">×{qty as number}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Route Info */}
          <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                <ICONS.Location className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Route Details</h3>
            </div>
            
            <div className="space-y-6 relative">
              <div className="absolute left-[19px] top-8 bottom-8 w-0.5 bg-slate-100 border-dashed border-l-2" />
              
              <div className="flex gap-4 relative">
                <div className="w-10 h-10 rounded-full bg-blue-600 border-4 border-white shadow-md flex items-center justify-center z-10">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pickup Address</p>
                  <p className="text-sm font-bold text-slate-900 leading-relaxed">{booking.pickupAddress}</p>
                  <p className="text-xs text-slate-500 mt-1">Floor {booking.floorPickup} • {booking.hasLiftPickup ? 'Lift Available' : 'No Lift'}</p>
                </div>
              </div>

              <div className="flex gap-4 relative">
                <div className="w-10 h-10 rounded-full bg-emerald-500 border-4 border-white shadow-md flex items-center justify-center z-10">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Drop Address</p>
                  <p className="text-sm font-bold text-slate-900 leading-relaxed">{booking.dropAddress}</p>
                  <p className="text-xs text-slate-500 mt-1">Floor {booking.floorDrop} • {booking.hasLiftDrop ? 'Lift Available' : 'No Lift'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Info */}
          <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                <ICONS.Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Schedule & Service</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Move Date</p>
                <p className="text-sm font-bold text-slate-900">{new Date(booking.moveDate).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Time Slot</p>
                <p className="text-sm font-bold text-slate-900">{booking.moveSlot || 'Morning (7 AM - 10 AM)'}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Service Type</p>
                <span className={`inline-block px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest mt-1 ${booking.serviceType === 'Premium' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                  {booking.serviceType}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Price Breakdown */}
          <div className="bg-slate-900 text-white p-8 rounded-[32px] shadow-xl shadow-slate-200">
            <h3 className="text-lg font-black mb-6 flex items-center gap-2">
              <ICONS.Sparkles className="w-5 h-5 text-amber-400" />
              Final Estimate
            </h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400 font-bold">Base Shifting Fee</span>
                <span className="font-black">₹{estimate.basePrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400 font-bold">Packing Materials</span>
                <span className="font-black">₹{estimate.packingCharges.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400 font-bold">Labor & Handling</span>
                <span className="font-black">₹{estimate.laborCharges.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400 font-bold">Transportation</span>
                <span className="font-black">₹{estimate.transportation.toLocaleString()}</span>
              </div>
              <div className="h-px bg-white/10 my-2" />
              <div className="flex justify-between items-center">
                <span className="text-base font-black uppercase tracking-widest text-blue-400">Total Amount</span>
                <span className="text-3xl font-black">₹{estimate.total.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <p className="text-[10px] text-slate-400 font-bold leading-relaxed">
                * This is an estimated price based on your inventory and distance. Final price may vary slightly based on actual site conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
