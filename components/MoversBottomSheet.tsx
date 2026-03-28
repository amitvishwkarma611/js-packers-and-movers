import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  image: string;
}

const moversServices: Service[] = [
  { 
    id: 'house-shifting', 
    title: 'House Shifting', 
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400' 
  },
  { 
    id: 'self-storage', 
    title: 'Self Storage', 
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=400' 
  },
];

interface MoversBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (serviceId: string) => void;
}

const MoversBottomSheet: React.FC<MoversBottomSheetProps> = ({ isOpen, onClose, onSelectService }) => {
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
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-[100]"
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100) onClose();
            }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[24px] z-[101] shadow-2xl overflow-hidden pb-safe"
          >
            {/* Drag Indicator */}
            <div className="w-full flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
            </div>

            {/* Header */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-slate-50">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Movers & Storage Services
              </h2>
              <button 
                onClick={onClose}
                className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">
                Packers & Movers
              </h3>

              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
                {moversServices.map((service) => (
                  <motion.button
                    key={service.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onSelectService(service.id);
                      onClose();
                    }}
                    className="flex-shrink-0 w-40 flex flex-col gap-3 text-left group"
                  >
                    <div className="w-40 h-40 rounded-[12px] overflow-hidden shadow-sm group-hover:shadow-md transition-shadow border border-slate-100">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Extra Spacing for Bottom Nav */}
            <div className="h-4" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MoversBottomSheet;
