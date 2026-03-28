
import React from 'react';
import { BookingDetails } from '../types';

interface Props {
  booking: BookingDetails;
  setBooking: (b: BookingDetails) => void;
}

const ServiceTypeStep: React.FC<Props> = ({ booking, setBooking }) => {
  return (
    <div className="animate-fadeIn">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Choose protection level</h2>
        <p className="text-slate-500 font-medium max-w-xl mx-auto">Select a shifting package that balances your budget with the care your belongings deserve.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <button
          onClick={() => setBooking({ ...booking, serviceType: 'Standard' })}
          className={`
            group text-left p-10 rounded-[40px] border-2 transition-all relative overflow-hidden flex flex-col h-full
            ${booking.serviceType === 'Standard' 
              ? 'border-blue-600 bg-white shadow-2xl shadow-blue-200' 
              : 'border-slate-100 bg-white hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50'}
          `}
        >
          {booking.serviceType === 'Standard' && (
            <div className="absolute top-6 right-6 bg-blue-600 text-white p-2 rounded-2xl shadow-lg shadow-blue-200 animate-fadeIn">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>
          )}
          
          <div className="mb-8">
            <div className={`
              w-16 h-16 rounded-3xl flex items-center justify-center mb-6 transition-all duration-500
              ${booking.serviceType === 'Standard' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}
            `}>
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
              </svg>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Standard Shifting</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">Perfect for simple within-city moves where budget is priority.</p>
          </div>
          
          <div className="flex-1">
            <ul className="space-y-4 mb-10">
              {[
                'Professional loading & unloading',
                'Quality packing materials',
                'Furniture positioning',
                'Verified shifting crew',
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-4 text-sm text-slate-700 font-bold">
                  <div className="mt-1 w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          <div className={`mt-auto pt-6 border-t ${booking.serviceType === 'Standard' ? 'border-blue-50' : 'border-slate-50'}`}>
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Base Rate</span>
            <p className="text-3xl font-extrabold text-slate-900">Market Price</p>
          </div>
        </button>

        <button
          onClick={() => setBooking({ ...booking, serviceType: 'Premium' })}
          className={`
            group text-left p-10 rounded-[40px] border-2 transition-all relative overflow-hidden flex flex-col h-full
            ${booking.serviceType === 'Premium' 
              ? 'border-blue-600 bg-white shadow-2xl shadow-blue-200' 
              : 'border-slate-100 bg-white hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50'}
          `}
        >
          <div className="absolute -right-16 top-10 rotate-45 bg-amber-400 text-amber-900 text-[10px] font-extrabold py-2 px-16 uppercase tracking-widest shadow-xl">Recommended</div>
          
          {booking.serviceType === 'Premium' && (
            <div className="absolute top-6 right-6 bg-blue-600 text-white p-2 rounded-2xl shadow-lg shadow-blue-200 animate-fadeIn">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>
          )}

          <div className="mb-8">
            <div className={`
              w-16 h-16 rounded-3xl flex items-center justify-center mb-6 transition-all duration-500
              ${booking.serviceType === 'Premium' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}
            `}>
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.333 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Premium Move</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">Complete white-glove experience with full packing and re-assembly.</p>
          </div>

          <div className="flex-1">
            <ul className="space-y-4 mb-10">
              {[
                'Double-layer fragile packing',
                'AC & Bed dismantling/assembly',
                'Insurance for transit damage',
                'Dedicated shift coordinator',
                'Priority pickup window'
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-4 text-sm text-slate-900 font-bold">
                  <div className="mt-1 w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className={`mt-auto pt-6 border-t ${booking.serviceType === 'Premium' ? 'border-blue-50' : 'border-slate-50'}`}>
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Starting Add-on</span>
            <p className="text-3xl font-extrabold text-slate-900">+₹1,000</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ServiceTypeStep;
