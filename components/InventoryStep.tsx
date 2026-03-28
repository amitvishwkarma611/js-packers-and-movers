import React, { useState, useMemo, useEffect } from 'react';
import { BookingDetails, MoveItem } from '../types.ts';
import { ICONS, COMMON_ITEMS } from '../constants.tsx';

interface Props {
  booking: BookingDetails;
  setBooking: (b: BookingDetails) => void;
}

const InventoryStep: React.FC<Props> = ({ booking, setBooking }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Living Room');
  const [showCustomModal, setShowCustomModal] = useState(false);
  
  const [customItem, setCustomItem] = useState<{
    name: string;
    category: string;
    quantity: number;
    weightClass: 'Light' | 'Medium' | 'Heavy';
  }>({
    name: '',
    category: 'General',
    quantity: 1,
    weightClass: 'Medium'
  });

  const categories = useMemo(() => {
    return Array.from(new Set(COMMON_ITEMS.map(i => i.category.split(' - ')[0])));
  }, []);

  useEffect(() => {
    if (searchTerm) setActiveCategory('Search Results');
    else if (activeCategory === 'Search Results' && categories.length > 0) setActiveCategory(categories[0]);
  }, [searchTerm, categories]);

  const updateQuantity = (id: string, delta: number) => {
    const updated = booking.inventory.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(0, item.quantity + delta) };
      }
      return item;
    }).filter(item => item.quantity > 0);
    setBooking({ ...booking, inventory: updated });
  };

  const addItemFromCatalog = (catalogItem: typeof COMMON_ITEMS[0]) => {
    const existing = booking.inventory.find(i => i.name === catalogItem.name);
    if (existing) {
      updateQuantity(existing.id, 1);
    } else {
      setBooking({
        ...booking,
        inventory: [...booking.inventory, {
          id: `item-${Date.now()}-${catalogItem.name}`,
          name: catalogItem.name,
          category: catalogItem.category,
          quantity: 1,
          weightClass: catalogItem.weightClass
        }]
      });
    }
  };

  const handleAddCustomItem = () => {
    if (!customItem.name.trim()) return;
    const newItem: MoveItem = {
      id: `custom-${Date.now()}`,
      name: customItem.name,
      category: customItem.category || 'General',
      quantity: customItem.quantity,
      weightClass: customItem.weightClass
    };
    setBooking({ ...booking, inventory: [...booking.inventory, newItem] });
    setCustomItem({ name: '', category: 'General', quantity: 1, weightClass: 'Medium' });
    setShowCustomModal(false);
  };

  const filteredItems = useMemo(() => {
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      return COMMON_ITEMS.filter(item => 
        item.name.toLowerCase().includes(lowerSearch) || 
        item.category.toLowerCase().includes(lowerSearch)
      );
    }
    return COMMON_ITEMS.filter(item => item.category.startsWith(activeCategory));
  }, [searchTerm, activeCategory]);

  return (
    <div className="animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Select Items</h2>
          <p className="text-slate-500 font-medium">Add furniture and appliances to your move list.</p>
        </div>
        <div className="flex items-center gap-3 bg-blue-50 px-5 py-3 rounded-2xl border border-blue-100">
          <div className="bg-blue-600 p-1.5 rounded-lg text-white">
            <ICONS.Package className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-blue-700 text-sm">
            {booking.inventory.reduce((a, b) => a + b.quantity, 0)} Items Added
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 flex flex-col min-h-[500px]">
          <div className="flex gap-3 mb-6">
            <div className="relative flex-1">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
              </div>
              <input
                type="text"
                placeholder="Search items..."
                className="w-full py-4 pl-12 pr-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-blue-500/5 outline-none transition-all text-slate-900"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setShowCustomModal(true)}
              className="px-6 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-all font-bold text-xs flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4.5v15m7.5-7.5h-15" /></svg>
              Custom
            </button>
          </div>

          {!searchTerm && (
            <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-black whitespace-nowrap transition-all border ${
                    activeCategory === cat 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100' 
                      : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-3 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar pb-10">
            {filteredItems.length === 0 ? (
              <div className="col-span-full py-20 text-center text-slate-400">
                <p className="font-bold">No items found.</p>
              </div>
            ) : (
              filteredItems.map((item, idx) => (
                <button
                  key={`${item.name}-${idx}`}
                  onClick={() => addItemFromCatalog(item)}
                  className="p-4 bg-white border border-slate-100 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all text-left flex flex-col gap-2 group relative"
                >
                  <span className="font-bold text-slate-900 text-xs leading-snug line-clamp-2 pr-6">{item.name}</span>
                  <div className="flex items-center justify-between mt-auto">
                    <span className={`text-[8px] font-black uppercase tracking-widest ${
                      item.weightClass === 'Heavy' ? 'text-amber-600' : 
                      item.weightClass === 'Medium' ? 'text-blue-500' : 'text-slate-400'
                    }`}>
                      {item.weightClass}
                    </span>
                    <div className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        <div className="lg:col-span-4 bg-slate-50 rounded-[32px] p-6 border border-slate-200/50 flex flex-col h-full shadow-inner">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-black text-lg text-slate-900">Move Cart</h3>
            {booking.inventory.length > 0 && (
              <button 
                onClick={() => setBooking({...booking, inventory: []})}
                className="text-[10px] font-black text-rose-500 hover:text-rose-700 uppercase"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto max-h-[400px] pr-1 custom-scrollbar">
            {booking.inventory.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-300 py-16 text-center">
                <ICONS.Package className="w-10 h-10 opacity-20 mb-4" />
                <p className="text-xs font-bold text-slate-400">Cart is empty</p>
              </div>
            ) : (
              booking.inventory.map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-slate-900 text-xs truncate">{item.name}</p>
                    <p className="text-[9px] text-slate-400 uppercase font-black">{item.weightClass}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button onClick={() => updateQuantity(item.id, -1)} className="w-7 h-7 flex items-center justify-center bg-slate-50 rounded-lg text-slate-900 font-black text-sm hover:bg-slate-100 font-bold">&minus;</button>
                    <span className="font-black text-slate-900 text-xs min-w-[12px] text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="w-7 h-7 flex items-center justify-center bg-slate-50 rounded-lg text-slate-900 font-black text-sm hover:bg-slate-100 font-bold">+</button>
                  </div>
                </div>
              ))
            )}
          </div>

          {booking.inventory.length > 0 && (
            <div className="mt-6 pt-6 border-t border-slate-200 flex flex-col gap-4">
               <div className="flex justify-between items-center">
                 <span className="text-[10px] font-black text-slate-400 uppercase">Recommended Truck</span>
                 <span className="text-sm font-black text-blue-600">
                   {booking.inventory.reduce((a, b) => {
                     const w = b.weightClass === 'Heavy' ? 3 : b.weightClass === 'Medium' ? 2 : 1;
                     return a + (b.quantity * w);
                   }, 0) < 15 ? 'Tata Ace' : 'Eicher 14ft'}
                 </span>
               </div>
            </div>
          )}
        </div>
      </div>

      {showCustomModal && (
        <div className="fixed inset-0 z-[160] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-[40px] shadow-3xl p-10">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black text-slate-900">Custom Item</h3>
              <button onClick={() => setShowCustomModal(false)} className="text-slate-400 hover:text-slate-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Item Name</label>
                <input type="text" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:border-blue-600" value={customItem.name} onChange={(e) => setCustomItem({...customItem, name: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Weight Class</label>
                  <select className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none" value={customItem.weightClass} onChange={(e) => setCustomItem({...customItem, weightClass: e.target.value as any})}>
                    <option value="Light">Light (&lt; 10kg)</option>
                    <option value="Medium">Medium (10-40kg)</option>
                    <option value="Heavy">Heavy (&gt; 40kg)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quantity</label>
                  <input type="number" min="1" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none" value={customItem.quantity} onChange={(e) => setCustomItem({...customItem, quantity: parseInt(e.target.value) || 1})} />
                </div>
              </div>
              <button onClick={handleAddCustomItem} disabled={!customItem.name} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all disabled:opacity-50 mt-4">Add to Cart</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default InventoryStep;