import React from 'react';
import { ICONS } from '../constants';

interface Props {
  onStartBooking: () => void;
  onViewPricing: () => void;
}

const LandingPage: React.FC<Props> = ({ onStartBooking, onViewPricing }) => {
  const handleWhatsAppEnquiry = () => {
    const phoneNumber = "919876543210"; // Sample Indian WhatsApp Number
    const message = "Hi Jaiswal Packers and Movers, I'm interested in your shifting services. Can you provide more details?";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden bg-white">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-100 mb-8 animate-float">
                <ICONS.Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-black text-blue-600 uppercase tracking-widest">India's Premier Shifting Service</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-8">
                Relocate with <br />
                <span className="text-blue-600">Jaiswal Packers and Movers</span>
              </h1>
              <p className="text-xl text-slate-500 font-medium mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Experience seamless, tech-enabled home shifting with instant transparent quotes and verified professionals.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                <button 
                  onClick={onStartBooking}
                  className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white rounded-[24px] font-black text-lg shadow-2xl shadow-blue-200 hover:scale-105 active:scale-95 transition-all"
                >
                  Book Your Move
                </button>
                <button 
                  onClick={onViewPricing}
                  className="w-full sm:w-auto px-10 py-5 bg-slate-50 text-slate-900 rounded-[24px] font-black text-lg border border-slate-200 hover:bg-slate-100 transition-all"
                >
                  View Pricing
                </button>
              </div>
            </div>
            
            <div className="flex-1 relative w-full">
              <div className="relative z-10 rounded-[48px] overflow-hidden shadow-3xl aspect-[4/3] lg:aspect-[4/5]">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200" 
                  alt="Modern Relocation" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[32px] p-6 text-white">
                   <div className="flex items-center gap-4 mb-4">
                     <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-lg">
                        <ICONS.Logo className="w-8 h-8" />
                     </div>
                     <div>
                       <p className="text-[10px] font-black uppercase tracking-widest text-blue-300">Fast & Secure</p>
                       <p className="text-lg font-bold">100% Safety Guaranteed</p>
                     </div>
                   </div>
                   <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                     <div className="h-full w-full bg-blue-500 rounded-full" />
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            <div>
              <p className="text-4xl lg:text-5xl font-black text-slate-900 mb-2">50k+</p>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Happy Families</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-black text-slate-900 mb-2">150+</p>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Cities Covered</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-black text-slate-900 mb-2">24/7</p>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Expert Support</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-black text-slate-900 mb-2">Zero</p>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Damage Record</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-xs mb-4 block">Process</span>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">How Jaiswal Packers Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 border-t-2 border-dashed border-slate-100 -translate-y-1/2 z-0" />
            
            {[
              { step: '01', title: 'Plan Your Move', desc: 'Enter your pickup and drop locations with move date.', icon: ICONS.Location },
              { step: '02', title: 'AI Inventory', desc: 'Add items manually or use AI to estimate your inventory.', icon: ICONS.Package },
              { step: '03', title: 'Instant Quote', desc: 'Get a transparent, itemized quote instantly.', icon: ICONS.Sparkles },
              { step: '04', title: 'Book & Relax', desc: 'Pay 20% advance and let our pros handle the rest.', icon: ICONS.Truck }
            ].map((s, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-[28px] bg-white border border-slate-100 shadow-xl flex items-center justify-center text-blue-600 mb-8 group-hover:scale-110 transition-transform duration-500">
                  <s.icon className="w-8 h-8" />
                </div>
                <span className="text-4xl font-black text-slate-100 absolute -top-4 group-hover:text-blue-50 transition-colors duration-500">{s.step}</span>
                <h3 className="text-xl font-black text-slate-900 mb-3 relative">{s.title}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight">Expert Relocation Solutions</h2>
            <p className="text-slate-500 font-medium text-lg">Specialized logistics for every type of move.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: 'House Shifting', 
                icon: ICONS.Package, 
                desc: 'From studios to large villas, we handle everything with extreme care.',
                img: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=800'
              },
              { 
                title: 'Office Relocation', 
                icon: ICONS.Truck, 
                desc: 'Minimizing downtime with expert office furniture and IT equipment moving.',
                img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
              },
              { 
                title: 'Vehicle Transport', 
                icon: ICONS.Truck, 
                desc: 'Safe and specialized transport for your car or bike across the country.',
                img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800'
              }
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-[40px] border border-slate-100 overflow-hidden hover:shadow-2xl transition-all group cursor-pointer" onClick={onStartBooking}>
                <div className="h-48 overflow-hidden">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-10">
                  <div className="w-16 h-16 rounded-[24px] bg-blue-50 text-blue-600 flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                     <s.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{s.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed mb-8">{s.desc}</p>
                  <div className="flex items-center gap-2 text-blue-600 font-bold group-hover:gap-4 transition-all">
                    Book Now 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Moves Section */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="text-blue-500 font-black uppercase tracking-[0.3em] text-xs mb-4 block">Success Stories</span>
              <h2 className="text-4xl lg:text-6xl font-black leading-tight tracking-tight">Featured Moves Across India</h2>
            </div>
            <p className="text-slate-400 font-medium max-w-sm lg:mb-2">
              Every move is a journey. Here are some of our recent successful relocations that defined our commitment to safety.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="group relative rounded-[48px] overflow-hidden aspect-[16/10] lg:aspect-auto lg:h-[600px]">
              <img 
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000" 
                alt="Luxury Villa Move" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Premium Move</span>
                  <span className="text-slate-300 text-xs font-bold">Bangalore to Mumbai</span>
                </div>
                <h3 className="text-3xl font-black mb-4">Luxury Villa Relocation</h3>
                <p className="text-slate-300 font-medium leading-relaxed max-w-md">
                  Successfully moved a 5-bedroom luxury villa with over 200+ fragile items including art pieces and grand piano.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div className="group relative rounded-[40px] overflow-hidden flex-1 min-h-[280px]">
                <img 
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800" 
                  alt="Corporate Office Move" 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Corporate</span>
                    <span className="text-slate-300 text-[10px] font-bold">Tech Park, Hyderabad</span>
                  </div>
                  <h3 className="text-xl font-black mb-2">IT Hub Migration</h3>
                  <p className="text-slate-300 text-sm font-medium leading-relaxed">
                    Relocated 150+ workstations and server rooms over a single weekend with zero downtime.
                  </p>
                </div>
              </div>

              <div className="group relative rounded-[40px] overflow-hidden flex-1 min-h-[280px]">
                <img 
                  src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800" 
                  alt="Vehicle Transport" 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Vehicle</span>
                    <span className="text-slate-300 text-[10px] font-bold">Delhi to Chennai</span>
                  </div>
                  <h3 className="text-xl font-black mb-2">Vintage Car Transport</h3>
                  <p className="text-slate-300 text-sm font-medium leading-relaxed">
                    Specialized enclosed container transport for a 1965 Mustang with real-time GPS tracking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">What Our Clients Say</h2>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <img key={i} className="w-12 h-12 rounded-full border-4 border-white object-cover" src={`https://picsum.photos/seed/${i+10}/100/100`} alt="User" />
                ))}
              </div>
              <div className="text-sm">
                <p className="font-black text-slate-900">4.9/5 Rating</p>
                <p className="text-slate-500 font-bold">From 12,000+ Reviews</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Rahul Sharma',
                role: 'Software Engineer',
                text: 'The AI inventory estimation was spot on! The team arrived on time and handled my fragile electronics with extreme care. Best shifting experience in Bangalore.',
                rating: 5
              },
              {
                name: 'Priya Patel',
                role: 'Business Owner',
                text: 'Relocating my boutique was a breeze with Jaiswal Packers. Their premium service included professional packing that saved me so much time. Highly recommended!',
                rating: 5
              },
              {
                name: 'Amit Verma',
                role: 'Marketing Director',
                text: 'Transparent pricing and real-time updates. I moved from Delhi to Mumbai and my car reached before me in perfect condition. Truly tech-enabled service.',
                rating: 5
              }
            ].map((t, i) => (
              <div key={i} className="bg-slate-50 p-10 rounded-[40px] border border-slate-100 relative">
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-600 font-medium text-lg leading-relaxed mb-8 italic">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-black text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[48px] p-12 lg:p-20 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
              <ICONS.WhatsApp className="w-64 h-64 rotate-12" />
            </div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Support Experts Online</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                  Need Help Planning <br />Your Move?
                </h2>
                <p className="text-blue-100 text-lg font-medium max-w-xl leading-relaxed">
                  Our relocation experts are just a message away. Get personalized advice, custom quotes, and solve your shifting queries instantly on WhatsApp.
                </p>
              </div>
              
              <div className="flex-shrink-0">
                <button 
                  onClick={handleWhatsAppEnquiry}
                  className="group flex items-center gap-4 px-10 py-6 bg-white text-green-600 rounded-[28px] font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all"
                >
                  <ICONS.WhatsApp className="w-8 h-8 group-hover:animate-bounce" />
                  Chat on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
           <ICONS.Sparkles className="w-16 h-16 mx-auto mb-10 text-blue-600" />
           <h2 className="text-4xl font-black text-slate-900 mb-6">Ready to move safely?</h2>
           <p className="text-slate-500 font-medium text-lg mb-12">
             Join thousands of families who trust Jaiswal Packers and Movers for their relocation needs.
           </p>
           <button 
            onClick={onStartBooking}
            className="px-12 py-6 bg-blue-600 text-white rounded-[28px] font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all"
           >
             Get Started Now
           </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;