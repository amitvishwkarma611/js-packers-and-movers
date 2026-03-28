
import React from 'react';
import { ICONS } from '../constants';

interface Props {
  onStartBooking: () => void;
}

const PricingPage: React.FC<Props> = ({ onStartBooking }) => {
  return (
    <div className="animate-fadeIn max-w-6xl mx-auto py-16 px-6">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-black text-slate-900 mb-6">Transparent Shifting Pricing</h2>
        <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">No surprises, no hidden fees. Get a clear idea of your moving costs based on your home size.</p>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {[
          {
            type: '1 BHK / Studio',
            price: '₹2,500 - ₹5,000',
            desc: 'Ideal for bachelor pads or small families with minimal furniture.',
            features: ['2 Professional Helpers', '14ft Closed Truck', 'Basic Furniture Wrapping', 'Transit Protection'],
            color: 'slate'
          },
          {
            type: '2 BHK Apartment',
            price: '₹5,000 - ₹10,000',
            desc: 'The most popular choice for typical city families moving locally.',
            features: ['3 Professional Helpers', '17ft Closed Truck', 'Multi-layer Fragile Packing', 'Appliance Dismantling', 'Dedicated Coordinator'],
            color: 'blue',
            popular: true
          },
          {
            type: '3 BHK / Villa',
            price: '₹12,000 - ₹25,000',
            desc: 'Comprehensive solution for larger homes with heavy heavy furniture.',
            features: ['5 Professional Helpers', '20ft/24ft Large Truck', 'Premium Wood Crating', 'AC & Bed Re-assembly', 'Post-move Cleanup'],
            color: 'slate'
          }
        ].map((plan, i) => (
          <div key={i} className={`
            relative p-10 rounded-[48px] border transition-all flex flex-col
            ${plan.popular 
              ? 'bg-blue-600 text-white border-blue-600 shadow-2xl shadow-blue-200 scale-105 z-10' 
              : 'bg-white text-slate-900 border-slate-100 hover:shadow-xl hover:shadow-slate-200/50'}
          `}>
            {plan.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-400 text-amber-900 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                Most Popular
              </div>
            )}
            
            <div className="mb-10">
              <p className={`text-xs font-black uppercase tracking-[0.2em] mb-4 ${plan.popular ? 'text-blue-200' : 'text-slate-400'}`}>
                {plan.type}
              </p>
              <h3 className="text-4xl font-black mb-4">{plan.price}</h3>
              <p className={`text-sm font-medium leading-relaxed ${plan.popular ? 'text-blue-100' : 'text-slate-500'}`}>
                {plan.desc}
              </p>
            </div>

            <div className={`h-px w-full mb-10 ${plan.popular ? 'bg-white/10' : 'bg-slate-100'}`} />

            <ul className="space-y-4 mb-12 flex-1">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-center gap-3 text-sm font-bold">
                  <svg className={`w-5 h-5 flex-shrink-0 ${plan.popular ? 'text-blue-300' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            <button 
              onClick={onStartBooking}
              className={`
                w-full py-5 rounded-[24px] font-black text-lg transition-all active:scale-95
                ${plan.popular 
                  ? 'bg-white text-blue-600 hover:bg-blue-50 shadow-xl shadow-black/10' 
                  : 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-200'}
              `}
            >
              Get Custom Quote
            </button>
          </div>
        ))}
      </div>

      {/* Additional Costs Section */}
      <div className="bg-slate-50 rounded-[56px] p-12 lg:p-20">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-1">
            <h3 className="text-3xl font-black text-slate-900 mb-8">What influences the price?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { t: 'Distance', d: 'Base fare covers 15km. ₹50/km extra thereafter.' },
                { t: 'Lift Availability', d: '₹500 surcharge if stairs are used for heavy items.' },
                { t: 'Floor Level', d: 'Small floor-wise handling fee for ground+ floors.' },
                { t: 'Packing Quality', d: 'Premium multi-layer packing adds ₹1,000 to base.' }
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <h4 className="font-black text-slate-900 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    {item.t}
                  </h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/3 bg-white rounded-[40px] p-10 border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
              <ICONS.Sparkles className="w-24 h-24" />
            </div>
            <h4 className="text-xl font-black text-slate-900 mb-6">Shifting Insurance</h4>
            <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">
              Protect your valuables for just 3% of declared value. Covers breakage, transit damage, and handling mishaps.
            </p>
            <div className="bg-emerald-50 text-emerald-700 px-6 py-4 rounded-2xl text-xs font-bold flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Zero-Risk Transit Guaranteed
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-24 text-center">
        <h3 className="text-3xl font-black text-slate-900 mb-6">Ready for a precise estimate?</h3>
        <p className="text-slate-500 font-medium mb-12">Use our AI-powered tool to list your items and get an exact quote instantly.</p>
        <button 
          onClick={onStartBooking}
          className="px-12 py-6 bg-blue-600 text-white rounded-[28px] font-black text-xl shadow-2xl shadow-blue-200 hover:scale-105 active:scale-95 transition-all"
        >
          Calculate My Move Cost
        </button>
      </div>
    </div>
  );
};

export default PricingPage;
