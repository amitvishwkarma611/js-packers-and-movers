import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, CheckCircle2, Info, Search, Package, Plus, Minus, ChevronRight } from 'lucide-react';
import { COMMON_ITEMS } from '../constants.tsx';

interface ServiceInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    title: string;
    rating: number;
    reviews: number;
    image: string;
    price: string;
    description?: string;
    includedServices?: string[];
    includedItems?: string[];
  } | null;
  onAdd: (extraItems: number, extraInventory?: {[key: string]: number}) => void;
}

const ServiceInfoModal: React.FC<ServiceInfoModalProps> = ({ isOpen, onClose, service, onAdd }) => {
  const [showInventory, setShowInventory] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Living Room');
  const [selectedInventory, setSelectedInventory] = useState<{[key: string]: number}>({});

  const categories = useMemo(() => {
    return Array.from(new Set(COMMON_ITEMS.map(i => i.category.split(' - ')[0])));
  }, []);

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

  const totalSelectedCount = useMemo(() => {
    return (Object.values(selectedInventory) as number[]).reduce((a: number, b: number) => a + b, 0);
  }, [selectedInventory]);

  const extraCost = useMemo(() => {
    return (Object.entries(selectedInventory) as [string, number][]).reduce((total, [name, qty]) => {
      const item = COMMON_ITEMS.find(i => i.name === name);
      const price = (item?.category.startsWith('Packing')) ? 50 : 500;
      return total + (price * qty);
    }, 0);
  }, [selectedInventory]);

  React.useEffect(() => {
    if (isOpen) {
      setSelectedInventory({});
      setShowInventory(false);
    }
  }, [isOpen]);

  const updateInventoryQuantity = (itemName: string, delta: number) => {
    setSelectedInventory(prev => {
      const current = prev[itemName] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [itemName]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemName]: next };
    });
  };

  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 top-10 bg-white rounded-t-[32px] z-[101] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Close Button Overlay */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md rounded-full text-slate-900 shadow-lg z-50 hover:bg-slate-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
              {/* Image Banner */}
              <div className="px-4 pt-4">
                <div className="h-64 w-full rounded-[24px] overflow-hidden shadow-md">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Title & Action Section */}
              <div className="px-6 py-6 flex items-start justify-between border-b border-slate-50">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">{service.title}</h2>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-bold text-slate-600">{service.rating} ({service.reviews} reviews)</span>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    onAdd(totalSelectedCount, selectedInventory);
                    onClose();
                  }}
                  className="px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-2xl font-black text-sm hover:bg-blue-50 transition-all shadow-sm"
                >
                  Add
                </button>
              </div>

              {/* Description Section */}
              <div className="px-6 py-8">
                <p className="text-slate-600 font-medium leading-relaxed">
                  {service.description || `Our ${service.title} Service is perfect for your relocation needs. We offer affordable, reliable moving services, ensuring your belongings are packed and delivered safely.`}
                </p>
              </div>

              {/* Details Grid */}
              <div className="px-6 space-y-8 pb-12">
                {/* Truck Size */}
              
                {/* Included Services */}
                {service.includedServices && service.includedServices.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-black text-slate-900 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      Included Services
                    </h4>
                    <ul className="grid grid-cols-1 gap-3 pl-7">
                      {service.includedServices.map((item, i) => (
                        <li key={i} className="text-sm text-slate-500 font-medium flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Included Items */}
                {service.includedItems && service.includedItems.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-black text-slate-900 flex items-center gap-2">
                      <Info className="w-5 h-5 text-blue-500" />
                      Included Items
                    </h4>
                    <ul className="grid grid-cols-1 gap-3 pl-7">
                      {service.includedItems.map((item, i) => (
                        <li key={i} className="text-sm text-slate-500 font-medium flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Add More Option */}
                    <div className="mt-6">
                      <button 
                        onClick={() => setShowInventory(true)}
                        className="w-full p-6 bg-blue-50/50 rounded-3xl border border-blue-100/50 flex items-center justify-between group hover:bg-blue-50 transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-blue-600 shadow-sm border border-blue-50">
                            <Plus className="w-6 h-6" />
                          </div>
                          <div className="text-left">
                            <h5 className="font-black text-slate-900">Add more items</h5>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">₹500 per extra item</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {totalSelectedCount > 0 && (
                            <div className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-black">
                              {totalSelectedCount} Selected
                            </div>
                          )}
                          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                        </div>
                      </button>
                      
                      {totalSelectedCount > 0 && (
                        <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Selected Extra Items</p>
                          {Object.entries(selectedInventory).map(([name, qty]) => (
                            <div key={name} className="flex justify-between items-center text-sm">
                              <span className="text-slate-600 font-medium">{name}</span>
                              <span className="text-slate-900 font-black">x{qty}</span>
                            </div>
                          ))}
                          <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                            <span className="text-xs font-black text-slate-900 uppercase">Extra Cost</span>
                            <span className="text-sm font-black text-blue-600">₹{extraCost.toLocaleString()}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Additional Charges */}
                <div className="p-6 bg-slate-50 rounded-[24px] border border-slate-100">
                  <h4 className="font-black text-slate-900 mb-4">Additional Charges for Extra Items</h4>
                  <ul className="space-y-3">
                    <li className="text-sm text-slate-600 font-medium flex items-center justify-between">
                      <span>₹50 per extra box</span>
                      <span className="text-blue-600 font-bold">Extra Box</span>
                    </li>
                    <li className="text-sm text-slate-600 font-medium flex items-center justify-between">
                      <span>₹500 per extra item (e.g., additional bed, table)</span>
                      <span className="text-blue-600 font-bold">Extra Item</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Inventory Selection Overlay */}
            <AnimatePresence>
              {showInventory && (
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="absolute inset-0 bg-white z-[110] flex flex-col"
                >
                  {/* Header */}
                  <div className="px-6 py-6 flex items-center justify-between border-b border-slate-100">
                    <div>
                      <h3 className="text-xl font-black text-slate-900">Select Items</h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Add furniture and appliances</p>
                    </div>
                    <button 
                      onClick={() => setShowInventory(false)}
                      className="p-2 bg-slate-100 rounded-full text-slate-900 hover:bg-slate-200 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Search & Categories */}
                  <div className="px-6 py-4 space-y-4">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="text"
                        placeholder="Search items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full py-3 pl-11 pr-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500/10 outline-none transition-all"
                      />
                    </div>

                    {!searchTerm && (
                      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full text-[10px] font-black whitespace-nowrap transition-all border ${
                              activeCategory === cat 
                                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100' 
                                : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Items Grid */}
                  <div className="flex-1 overflow-y-auto px-6 pb-24 grid grid-cols-2 gap-3 no-scrollbar">
                    {filteredItems.map((item, idx) => (
                      <div 
                        key={`${item.name}-${idx}`}
                        className="p-4 bg-white border border-slate-100 rounded-2xl flex flex-col gap-3 relative group"
                      >
                        <div className="flex-1">
                          <p className="font-bold text-slate-900 text-xs leading-snug line-clamp-2">{item.name}</p>
                          <span className={`text-[8px] font-black uppercase tracking-widest mt-1 block ${
                            item.weightClass === 'Heavy' ? 'text-amber-600' : 
                            item.weightClass === 'Medium' ? 'text-blue-500' : 'text-slate-400'
                          }`}>
                            {item.weightClass}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between mt-auto">
                          {selectedInventory[item.name] ? (
                            <div className="flex items-center gap-2 bg-blue-50 rounded-lg p-1">
                              <button 
                                onClick={() => updateInventoryQuantity(item.name, -1)}
                                className="w-6 h-6 flex items-center justify-center text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-black text-blue-600 min-w-[12px] text-center">{selectedInventory[item.name]}</span>
                              <button 
                                onClick={() => updateInventoryQuantity(item.name, 1)}
                                className="w-6 h-6 flex items-center justify-center text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <button 
                              onClick={() => updateInventoryQuantity(item.name, 1)}
                              className="w-full py-2 bg-slate-50 text-slate-400 rounded-xl text-[10px] font-black uppercase hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2"
                            >
                              <Plus className="w-3 h-3" />
                              Add
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer Action */}
                  <div className="absolute bottom-0 inset-x-0 p-6 bg-white border-t border-slate-100 flex items-center justify-between shadow-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                        <Package className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-900">{totalSelectedCount} Items</p>
                        <p className="text-[10px] font-bold text-blue-600 uppercase">₹{extraCost.toLocaleString()} Extra</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowInventory(false)}
                      className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-black text-sm hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all"
                    >
                      Done
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ServiceInfoModal;
