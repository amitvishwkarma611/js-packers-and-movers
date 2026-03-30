import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Home, Briefcase, MoreHorizontal, User, Building2, Landmark } from 'lucide-react';

interface AddressBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (addressDetails: any) => void;
  detectedLocation: string;
  onOpenMap: (category: 'Pickup' | 'Drop') => void;
}

const AddressBottomSheet: React.FC<AddressBottomSheetProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  detectedLocation,
  onOpenMap
}) => {
  const [houseNo, setHouseNo] = useState('');
  const [landmark, setLandmark] = useState('');
  const [name, setName] = useState('');
  const [floor, setFloor] = useState('');
  const [hasLift, setHasLift] = useState(false);
  const [addressType, setAddressType] = useState<'Home' | 'Office' | 'Other'>('Home');
  const [addressCategory, setAddressCategory] = useState<'Pickup' | 'Drop'>('Pickup');

  const [pickupDetails, setPickupDetails] = useState<any>(null);
  const [dropDetails, setDropDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const isFormValid = houseNo.trim() !== '' && name.trim() !== '';

  // Reset form when opened
  useEffect(() => {
    if (isOpen) {
      setHouseNo('');
      setLandmark('');
      setName('');
      setFloor('');
      setHasLift(false);
      setAddressType('Home');
      setAddressCategory('Pickup');
      setPickupDetails(null);
      setDropDetails(null);
      setError(null);
    }
  }, [isOpen]);

  const validateAndSave = () => {
    const currentDetails = { houseNo, landmark, name, floor, hasLift, addressType, fullAddress: detectedLocation };
    
    if (addressCategory === 'Pickup') {
      if (dropDetails && 
          currentDetails.fullAddress === dropDetails.fullAddress && 
          currentDetails.houseNo === dropDetails.houseNo) {
        setError('Pickup and Drop addresses cannot be the same');
        return;
      }
      setPickupDetails(currentDetails);
      setError(null);
      if (!dropDetails) {
        setAddressCategory('Drop');
        setHouseNo('');
        setLandmark('');
        setName('');
        setFloor('');
        setHasLift(false);
      }
    } else {
      if (pickupDetails && 
          currentDetails.fullAddress === pickupDetails.fullAddress && 
          currentDetails.houseNo === pickupDetails.houseNo) {
        setError('Drop and Pickup addresses cannot be the same');
        return;
      }
      setDropDetails(currentDetails);
      setError(null);
      if (!pickupDetails) {
        setAddressCategory('Pickup');
        setHouseNo('');
        setLandmark('');
        setName('');
        setFloor('');
        setHasLift(false);
      }
    }
  };

  const handleFinalSave = () => {
    if (pickupDetails && dropDetails) {
      onSave({ pickup: pickupDetails, drop: dropDetails });
    } else {
      validateAndSave();
    }
  };

  const isCurrentCategorySaved = (addressCategory === 'Pickup' ? pickupDetails : dropDetails);
  const canProceed = pickupDetails && dropDetails;

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
            className="fixed inset-0 bg-black/40 z-[110] backdrop-blur-[2px]"
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-white z-[120] rounded-t-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[95vh]"
          >
            {/* Close Icon (Floating above sheet) */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg z-[130] border border-slate-100"
            >
              <X className="w-5 h-5 text-slate-900" />
            </button>

            {/* Header */}
            <div className="px-6 h-16 flex items-center justify-between border-b border-slate-50">
              <h2 className="text-base font-bold text-slate-900">Confirm Your Address</h2>
              <button 
                onClick={() => onOpenMap(addressCategory)}
                className="text-blue-600 font-bold text-sm hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
              >
                Change
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 pb-32 no-scrollbar">
              {/* Pickup/Drop Toggle */}
              <div className="flex p-1 bg-slate-100 rounded-2xl mb-8">
                <button 
                  onClick={() => {
                    setAddressCategory('Pickup');
                    if (pickupDetails) {
                      setHouseNo(pickupDetails.houseNo);
                      setLandmark(pickupDetails.landmark);
                      setName(pickupDetails.name);
                      setFloor(pickupDetails.floor || '');
                      setHasLift(pickupDetails.hasLift || false);
                      setAddressType(pickupDetails.addressType);
                    } else {
                      setHouseNo('');
                      setLandmark('');
                      setName('');
                      setFloor('');
                      setHasLift(false);
                    }
                  }}
                  className={`flex-1 py-3 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 ${addressCategory === 'Pickup' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
                >
                  <div className={`w-2 h-2 rounded-full ${pickupDetails ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                  Pickup Address
                </button>
                <button 
                  onClick={() => {
                    setAddressCategory('Drop');
                    if (dropDetails) {
                      setHouseNo(dropDetails.houseNo);
                      setLandmark(dropDetails.landmark);
                      setName(dropDetails.name);
                      setFloor(dropDetails.floor || '');
                      setHasLift(dropDetails.hasLift || false);
                      setAddressType(dropDetails.addressType);
                    } else {
                      setHouseNo('');
                      setLandmark('');
                      setName('');
                      setFloor('');
                      setHasLift(false);
                    }
                  }}
                  className={`flex-1 py-3 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 ${addressCategory === 'Drop' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
                >
                  <div className={`w-2 h-2 rounded-full ${dropDetails ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                  Drop Address
                </button>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-black text-slate-900 mb-1">
                  Enter {addressCategory.toLowerCase()} address
                </h3>
                <p className="text-slate-400 text-sm font-medium">Almost done! Add details to complete your address.</p>
              </div>

              {error && (
                <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-xl text-xs font-bold mb-6 flex items-center gap-2">
                  <X className="w-4 h-4" />
                  {error}
                </div>
              )}

              {/* Detected Location Card */}
              <div className="bg-slate-50 rounded-2xl p-4 mb-8 border border-slate-100">
                <div className="flex gap-3">
                  <div className="bg-white p-2 rounded-lg shadow-sm h-fit">
                    <MapPin className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1 line-clamp-1">
                      {detectedLocation ? detectedLocation.split(',')[0] : 'Current Location'}
                    </h4>
                    <p className="text-slate-500 text-xs leading-relaxed font-medium line-clamp-2">
                      {detectedLocation || 'Detecting location...'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <input 
                    type="text"
                    placeholder="House / Flat no."
                    value={houseNo}
                    onChange={(e) => {
                      setHouseNo(e.target.value);
                      setError(null);
                    }}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 transition-all font-medium text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <input 
                    type="text"
                    placeholder="Landmark"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 transition-all font-medium text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <User className="w-5 h-5" />
                  </div>
                  <input 
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 transition-all font-medium text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <input 
                      type="text"
                      placeholder="Floor"
                      value={floor}
                      onChange={(e) => setFloor(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 transition-all font-medium text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                  <div className="flex items-center justify-between px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl">
                    <span className="text-sm font-bold text-slate-600">Lift available?</span>
                    <button 
                      onClick={() => setHasLift(!hasLift)}
                      className={`w-12 h-6 rounded-full transition-all relative ${hasLift ? 'bg-blue-600' : 'bg-slate-300'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${hasLift ? 'left-7' : 'left-1'}`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Save As Chips */}
              <div className="mt-8">
                <h4 className="text-sm font-bold text-slate-900 mb-4">Save as</h4>
                <div className="flex gap-3">
                  {[
                    { type: 'Home', icon: Home },
                    { type: 'Office', icon: Briefcase },
                    { type: 'Other', icon: MoreHorizontal }
                  ].map((item) => (
                    <button
                      key={item.type}
                      onClick={() => setAddressType(item.type as any)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all font-bold text-sm ${
                        addressType === item.type 
                        ? 'bg-blue-50 border-blue-200 text-blue-600 shadow-sm' 
                        : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      <item.icon className={`w-4 h-4 ${addressType === item.type ? 'text-blue-600' : 'text-slate-400'}`} />
                      {item.type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="p-6 bg-white border-t border-slate-50 pb-safe">
              <button 
                disabled={!isFormValid && !canProceed}
                onClick={canProceed ? handleFinalSave : validateAndSave}
                className={`w-full py-4 rounded-xl font-black text-base transition-all shadow-lg ${
                  (isFormValid || canProceed)
                  ? 'bg-blue-600 text-white shadow-blue-100 hover:bg-blue-700 active:scale-[0.98]' 
                  : 'bg-slate-100 text-slate-400 shadow-none cursor-not-allowed'
                }`}
              >
                {canProceed ? 'Save and proceed' : 'Save and continue'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddressBottomSheet;
