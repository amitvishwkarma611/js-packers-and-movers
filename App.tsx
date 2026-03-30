import React, { useState, useMemo, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDocFromServer, collection, setDoc, serverTimestamp, onSnapshot, query, orderBy, collectionGroup, updateDoc, where } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from './services/firebase';
import { BookingStep, BookingDetails, PriceEstimate, ConfirmedBooking } from './types.ts';
import { ICONS, COMMON_ITEMS } from './constants.tsx';
import LocationStep from './components/LocationStep.tsx';
import InventoryStep from './components/InventoryStep.tsx';
import ServiceTypeStep from './components/ServiceTypeStep.tsx';
import DateTimeStep from './components/DateTimeStep.tsx';
import LoginPage from './components/Auth/LoginPage.tsx';
import SignupPage from './components/Auth/SignupPage.tsx';
import MyBookings from './components/MyBookings.tsx';
import UrbanHome from './components/UrbanHome.tsx';
import ServiceDetailsPage, { localMovingServices, interCityMovingServices } from './components/ServiceDetailsPage.tsx';
import PaymentSummaryPage from './components/PaymentSummaryPage.tsx';
import PricingPage from './components/PricingPage.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';
import ProfilePage from './components/Auth/ProfilePage.tsx';
import ReviewStep from './components/ReviewStep.tsx';
import { HeroSkeleton, PricingSkeleton, BookingListSkeleton, AdminStatsSkeleton, TableSkeleton } from './components/SkeletonLoader.tsx';

const App: React.FC = () => {
  const [user, setUser] = useState<{ email: string; isAdmin: boolean; name?: string; mobileNumber?: string } | null>(null);
  const [logoTapCount, setLogoTapCount] = useState(0);
  const [authLoading, setAuthLoading] = useState(true);
  const [authMode, setAuthMode] = useState<'LOGIN' | 'SIGNUP'>('LOGIN');
  const [currentStep, setCurrentStep] = useState<BookingStep>(BookingStep.LOCATION);
  const [view, setView] = useState<'HOME' | 'BOOKING_FLOW' | 'MY_BOOKINGS' | 'PRICING' | 'ADMIN' | 'PROFILE' | 'NATURALS' | 'SERVICE_DETAILS' | 'PAYMENT_SUMMARY'>('HOME');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [cart, setCart] = useState<{ [key: string]: { quantity: number; extraItems: number; extraInventory?: { [key: string]: number } } }>({});
  const [isInitialCartLoaded, setIsInitialCartLoaded] = useState(false);
  const cartUserIdRef = React.useRef<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  
  // Fetch Cart from Firestore
  useEffect(() => {
    setIsInitialCartLoaded(false);
    if (!auth.currentUser) {
      cartUserIdRef.current = null;
      setCart({});
      setIsInitialCartLoaded(true);
      return;
    }
    
    const uid = auth.currentUser.uid;
    const fetchCart = async () => {
      try {
        const cartDoc = await getDocFromServer(doc(db, 'carts', uid));
        if (cartDoc.exists()) {
          const items = cartDoc.data().items || {};
          const sanitizedItems = Object.keys(items).reduce((acc, key) => {
            acc[key] = {
              ...items[key],
              extraInventory: items[key].extraInventory || {}
            };
            return acc;
          }, {} as any);
          setCart(sanitizedItems);
        } else {
          setCart({});
        }
        cartUserIdRef.current = uid;
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setIsInitialCartLoaded(true);
      }
    };
    
    fetchCart();
  }, [user]);

  // Save Cart to Firestore
  useEffect(() => {
    if (!isInitialCartLoaded || !auth.currentUser) return;
    if (cartUserIdRef.current !== auth.currentUser.uid) return;
    
    const saveCart = async () => {
      // Sanitize cart to ensure no undefined values
      const sanitizedCart = Object.keys(cart).reduce((acc, key) => {
        const item = cart[key];
        acc[key] = {
          quantity: item.quantity || 0,
          extraItems: item.extraItems || 0,
          extraInventory: item.extraInventory || {}
        };
        return acc;
      }, {} as any);

      try {
        await setDoc(doc(db, 'carts', auth.currentUser.uid), { 
          items: sanitizedCart, 
          updatedAt: serverTimestamp() 
        }, { merge: true });
      } catch (error) {
        console.error("Error saving cart:", error);
      }
    };
    
    saveCart();
  }, [cart, isInitialCartLoaded, user]);
  
  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };
  
  const [confirmedBookings, setConfirmedBookings] = useState<ConfirmedBooking[]>([
    {
      id: 'b-001',
      details: {
        pickupAddress: 'HSR Layout, Sector 2, Bangalore',
        dropAddress: 'Indiranagar, Double Road, Bangalore',
        moveDate: '2025-02-15',
        floorPickup: 2,
        floorDrop: 0,
        hasLiftPickup: true,
        hasLiftDrop: true,
        inventory: [{ id: '1', name: 'Double Bed', category: 'Bedroom', quantity: 1, weightClass: 'Heavy' }],
        serviceType: 'Premium'
      },
      estimate: { basePrice: 2000, packingCharges: 1000, laborCharges: 800, transportation: 1500, total: 5300 },
      status: 'Completed',
      createdAt: new Date(Date.now() - 86400000).toISOString()
    }
  ]);

  // Handle simulated loading on view changes
  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => setIsNavigating(false), 800);
    return () => clearTimeout(timer);
  }, [view]);

  // Hidden Admin Gesture
  useEffect(() => {
    if (logoTapCount === 5) {
      if (user?.isAdmin) {
        setView('ADMIN');
      } else {
        alert("Admin access required. Please login with admin credentials.");
      }
      setLogoTapCount(0);
    }
    const timer = setTimeout(() => setLogoTapCount(0), 3000);
    return () => clearTimeout(timer);
  }, [logoTapCount, user?.isAdmin]);

  // Test Firestore Connection
  useEffect(() => {
    async function testConnection() {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if(error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration. ");
        }
      }
    }
    testConnection();
  }, []);

  // Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser && firebaseUser.email) {
        const isAdmin = firebaseUser.email.toLowerCase() === 'sv4817055@gmail.com';
        
        let name = firebaseUser.displayName || firebaseUser.email.split('@')[0];
        let mobileNumber = '';

        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDocFromServer(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            name = userData.name || name;
            mobileNumber = userData.mobileNumber || '';
          } else {
            await setDoc(userDocRef, {
              name,
              email: firebaseUser.email,
              mobileNumber: '',
              createdAt: serverTimestamp()
            });
          }
        } catch (error) {
          console.warn("Could not create/verify user document:", error);
        }

        setUser({ email: firebaseUser.email, isAdmin, name, mobileNumber });
        
        if (isAdmin && view === 'HOME') setView('ADMIN');
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, [view]);

  // Fetch Bookings
  useEffect(() => {
    if (!user || !auth.currentUser) return;
    
    let q;
    if (user.isAdmin) {
      q = query(collection(db, 'bookings'));
    } else {
      q = query(collection(db, 'bookings'), where('userUID', '==', auth.currentUser.uid));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookingsData: ConfirmedBooking[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        bookingsData.push({
          id: doc.id,
          details: data.details || {
            pickupAddress: data.pickupAddress || '',
            dropAddress: data.dropAddress || '',
            moveDate: data.bookingDate || '',
            moveSlot: data.bookingTime || '',
            floorPickup: 0,
            floorDrop: 0,
            hasLiftPickup: true,
            hasLiftDrop: true,
            inventory: [],
            serviceType: data.serviceName || 'Standard'
          },
          estimate: data.estimate || {
            basePrice: data.servicePrice || 0,
            packingCharges: 0,
            laborCharges: 0,
            transportation: 0,
            total: data.servicePrice || 0
          },
          status: data.status || 'Upcoming',
          createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          userUID: data.userUID,
          userName: data.userName || 'Customer',
          userEmail: data.userEmail || '',
          userMobile: data.userMobile || ''
        });
      });
      
      // Sort client-side to avoid composite index requirement
      const sorted = bookingsData.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      
      setConfirmedBookings(sorted);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'bookings');
    });

    return () => unsubscribe();
  }, [user]);

  const [booking, setBooking] = useState<BookingDetails>({
    pickupAddress: '',
    dropAddress: '',
    distance: 0,
    moveDate: new Date().toISOString().split('T')[0],
    floorPickup: 0,
    floorDrop: 0,
    hasLiftPickup: true,
    hasLiftDrop: true,
    inventory: [],
    serviceType: 'Standard'
  });

  // Auto-calculate distance
  useEffect(() => {
    const fetchDistance = async () => {
      if (!booking.pickupAddress || !booking.dropAddress) return;
      
      try {
        let lat1, lon1, lat2, lon2;

        if (booking.pickupCoordinates) {
          lat1 = booking.pickupCoordinates.lat;
          lon1 = booking.pickupCoordinates.lng;
        } else {
          // Extract the base address without house number and landmark for better geocoding results
          const queryAddress = booking.pickupAddress.split(', ').slice(-4).join(', ');
          const pickupRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(queryAddress || booking.pickupAddress)}`);
          const pickupData = await pickupRes.json();
          if (pickupData.length > 0) {
            lat1 = parseFloat(pickupData[0].lat);
            lon1 = parseFloat(pickupData[0].lon);
          }
        }

        if (booking.dropCoordinates) {
          lat2 = booking.dropCoordinates.lat;
          lon2 = booking.dropCoordinates.lng;
        } else {
          const queryAddress = booking.dropAddress.split(', ').slice(-4).join(', ');
          const dropRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(queryAddress || booking.dropAddress)}`);
          const dropData = await dropRes.json();
          if (dropData.length > 0) {
            lat2 = parseFloat(dropData[0].lat);
            lon2 = parseFloat(dropData[0].lon);
          }
        }
        
        if (lat1 !== undefined && lon1 !== undefined && lat2 !== undefined && lon2 !== undefined) {
          const R = 6371; 
          const dLat = (lat2 - lat1) * Math.PI / 180;
          const dLon = (lon2 - lon1) * Math.PI / 180;
          const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
          const distance = R * c; 
          
          const estimatedDrivingDistance = Math.ceil(distance * 1.2);
          
          setBooking(prev => {
            if (prev.distance === estimatedDrivingDistance) return prev;
            return { ...prev, distance: estimatedDrivingDistance };
          });
        }
      } catch (error) {
        console.error("Error calculating distance:", error);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchDistance();
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [booking.pickupAddress, booking.dropAddress, booking.pickupCoordinates, booking.dropCoordinates]);

  const priceEstimate = useMemo((): PriceEstimate => {
    const totalItems = booking.inventory.reduce((acc, item) => acc + item.quantity, 0);
    
    let itemsCost = 0;
    let cartonsCost = 0;

    booking.inventory.forEach(item => {
      const catalogItem = COMMON_ITEMS.find(i => i.name === item.name);
      if (catalogItem) {
        if (catalogItem.category === 'Small Items (Cartons)') {
          cartonsCost += catalogItem.price * item.quantity;
        } else {
          itemsCost += catalogItem.price * item.quantity;
        }
      }
    });

    const floorFactor = (booking.floorPickup + booking.floorDrop) * 200;
    const liftFactor = (!booking.hasLiftPickup || !booking.hasLiftDrop) ? 500 : 0;
    
    const basePrice = 2000;
    const packingCharges = booking.serviceType === 'Premium' ? 1000 : 0;
    
    const distance = booking.distance || 0;
    const transportation = distance <= 10 ? 0 : (distance - 10) * 30;

    const subTotal = basePrice + itemsCost + cartonsCost + transportation + floorFactor + liftFactor + packingCharges;
    const insuranceCost = booking.hasInsurance ? subTotal * 0.02 : 0;

    return {
      basePrice,
      packingCharges,
      laborCharges: floorFactor + liftFactor,
      transportation,
      extraItemsPrice: itemsCost + cartonsCost,
      total: subTotal + insuranceCost
    };
  }, [booking]);

  const displayEstimate = useMemo(() => {
    const allServices = [...localMovingServices, ...interCityMovingServices];
    const selectedServices = Object.entries(cart).map(([id, item]: [string, { quantity: number; extraItems: number; extraInventory?: { [key: string]: number } }]) => {
      const service = allServices.find(s => s.id === id);
      if (!service) return null;
      return { ...service, quantity: item.quantity, extraItems: item.extraItems, extraInventory: item.extraInventory };
    }).filter((s: any): s is any => s !== null);

    if (selectedServices.length > 0) {
      let totalBase = 0;
      let totalExtra = 0;

      selectedServices.forEach(s => {
        const priceStr = s.price || '0';
        const basePrice = parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
        totalBase += (basePrice * s.quantity);

        Object.entries(s.extraInventory || {}).forEach(([name, qty]) => {
          const item = COMMON_ITEMS.find(i => i.name === name);
          const price = item?.price || 500;
          totalExtra += (price * (qty as number) * s.quantity);
        });
      });

      const distance = booking.distance || 0;
      const transportation = distance <= 10 ? 0 : (distance - 10) * 30;

      const total = totalBase + totalExtra + transportation;

      return {
        basePrice: totalBase,
        packingCharges: 0,
        laborCharges: 0,
        transportation: transportation,
        extraItemsPrice: totalExtra,
        total: total
      };
    }
    return priceEstimate;
  }, [cart, priceEstimate, booking.distance]);

  const updateQuantity = (id: string, delta: number) => {
    const updated = booking.inventory.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(0, item.quantity + delta) };
      }
      return item;
    }).filter(item => item.quantity > 0);
    setBooking({ ...booking, inventory: updated });
  };

  const handleUpdateBookingStatus = async (id: string, newStatus: 'Pending' | 'Upcoming' | 'Confirmed' | 'Completed' | 'Cancelled' | 'Accepted' | 'Rejected') => {
    try {
      const docRef = doc(db, "bookings", id);
      await updateDoc(docRef, { status: newStatus });
      
      // Local state update is handled by onSnapshot
    } catch (error) {
      console.error("Error updating status:", error);
      handleFirestoreError(error, OperationType.UPDATE, `bookings/${id}`);
    }
  };

  const initMetaMaskPayment = async () => {
    if (!(window as any).ethereum) {
      throw new Error("MetaMask is not installed. Please install it to pay with crypto.");
    }

    try {
      const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      
      // In a real app, we would send a transaction here.
      // For this demo, we'll simulate a successful connection and "payment"
      console.log("Connected to MetaMask:", account);
      return account;
    } catch (error: any) {
      if (error.code === 4001) {
        throw new Error("Payment cancelled by user.");
      }
      throw new Error("Failed to connect to MetaMask. Please try again.");
    }
  };

  const handleConfirmBooking = async (method: 'METAMASK' | 'CASH' = 'CASH') => {
    if (!auth.currentUser) {
      setPaymentError("You must be logged in to book.");
      return;
    }

    setIsProcessingPayment(true);
    setPaymentError(null);
    try {
      if (method === 'METAMASK') {
        await initMetaMaskPayment();
      }

      const isFromCart = Object.keys(cart).length > 0;
      
      let finalServiceName = booking.serviceType + ' Moving';
      
      if (isFromCart) {
        finalServiceName = selectedServices.map(s => s.title).join(', ');
      }

      const bookingId = `b-${Date.now()}`;
      const newBooking = {
        id: bookingId,
        serviceName: finalServiceName,
        serviceCategory: 'Packers and Movers',
        servicePrice: displayEstimate.total,
        addressId: booking.pickupAddress || 'Not Provided',
        bookingDate: booking.moveDate,
        bookingTime: booking.moveSlot || '10:00 AM',
        status: 'Pending',
        paymentStatus: method === 'CASH' ? 'Pay after service' : 'Paid via MetaMask',
        createdAt: serverTimestamp(),
        userUID: auth.currentUser.uid,
        userName: user?.name || user?.email?.split('@')[0] || 'User',
        userMobile: booking.userMobile || user?.mobileNumber || '',
        userEmail: user?.email || '',
        // Also store the detailed objects so the UI can render them
        details: { 
          ...booking,
          selectedServices: isFromCart ? selectedServices : []
        },
        estimate: displayEstimate
      };

      // Update user's mobile number in profile if it's new
      if (booking.userMobile && booking.userMobile !== user?.mobileNumber) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, { mobileNumber: booking.userMobile });
      }

      const docRef = doc(db, "bookings", bookingId);
      await setDoc(docRef, newBooking);

      setView('MY_BOOKINGS');
      setCart({});
      setBooking({
        pickupAddress: '', dropAddress: '', moveDate: new Date().toISOString().split('T')[0],
        floorPickup: 0, floorDrop: 0, hasLiftPickup: true, hasLiftDrop: true,
        inventory: [], serviceType: 'Standard'
      });
      setCurrentStep(BookingStep.LOCATION);
    } catch (error: any) {
      console.warn(error);
      setPaymentError(error.message || "Payment failed. Please try again.");
      try {
        handleFirestoreError(error, OperationType.CREATE, 'bookings');
      } catch (e) {
        // Error already handled
      }
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const nextStep = () => {
    if (currentStep === BookingStep.LOCATION) setCurrentStep(BookingStep.INVENTORY);
    else if (currentStep === BookingStep.INVENTORY) setCurrentStep(BookingStep.SERVICE_TYPE);
    else if (currentStep === BookingStep.SERVICE_TYPE) setCurrentStep(BookingStep.DATE_TIME);
    else if (currentStep === BookingStep.DATE_TIME) setCurrentStep(BookingStep.REVIEW);
    else if (currentStep === BookingStep.REVIEW) { handleConfirmBooking('CASH'); }
  };

  const prevStep = () => {
    if (currentStep === BookingStep.REVIEW) setCurrentStep(BookingStep.DATE_TIME);
    else if (currentStep === BookingStep.DATE_TIME) {
      // If coming from cart, we can't go back to service selection steps
      if (Object.keys(cart).length > 0) {
        setView('PAYMENT_SUMMARY');
      } else {
        setCurrentStep(BookingStep.SERVICE_TYPE);
      }
    }
    else if (currentStep === BookingStep.SERVICE_TYPE) {
      if (Object.keys(cart).length > 0) return; // Point of no return for cart flow
      setCurrentStep(BookingStep.INVENTORY);
    }
    else if (currentStep === BookingStep.INVENTORY) {
      if (Object.keys(cart).length > 0) return; // Point of no return for cart flow
      setCurrentStep(BookingStep.LOCATION);
    }
  };

  const isNextDisabled = useMemo(() => {
    if (isProcessingPayment) return true;
    if (currentStep === BookingStep.LOCATION) {
      const isMumbai = (address: string) => {
        if (!address) return false;
        const lower = address.toLowerCase();
        return lower.includes('mumbai') || lower.includes('navi mumbai');
      };
      return !booking.pickupAddress || !isMumbai(booking.pickupAddress) || !booking.dropAddress || !booking.moveDate;
    }
    if (currentStep === BookingStep.INVENTORY) {
      return booking.inventory.length === 0;
    }
    if (currentStep === BookingStep.DATE_TIME) {
      return !booking.moveDate || !booking.moveSlot;
    }
    if (currentStep === BookingStep.REVIEW) {
      return isProcessingPayment || !booking.userMobile || booking.userMobile.length !== 10;
    }
    return false;
  }, [currentStep, booking, isProcessingPayment]);

  const selectedServices = useMemo(() => {
    const allServices = [...localMovingServices, ...interCityMovingServices];
    return Object.entries(cart).map(([id, item]: [string, { quantity: number; extraItems: number; extraInventory?: { [key: string]: number } }]) => {
      const service = allServices.find(s => s.id === id);
      if (!service) return null;
      return { 
        ...service, 
        quantity: item.quantity, 
        extraItems: item.extraItems,
        extraInventory: item.extraInventory
      };
    }).filter((s: any): s is any => s !== null);
  }, [cart]);

  const handleLoginSuccess = (email: string) => {
    const isAdmin = email.toLowerCase() === 'sv4817055@gmail.com';
    setUser({ email, isAdmin });
    if (isAdmin) setView('ADMIN');
    else setView('HOME');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setAuthMode('LOGIN');
      setView('HOME');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 mb-4">
            <ICONS.Logo className="w-full h-full animate-pulse" />
          </div>
          <p className="text-slate-500 font-bold animate-pulse">Initializing Jaiswal Packers...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Removed watermark */}
        
        {authMode === 'LOGIN' ? (
          <LoginPage onClose={() => {}} onSwitchToSignup={() => setAuthMode('SIGNUP')} onLoginSuccess={handleLoginSuccess} />
        ) : (
          <SignupPage onClose={() => {}} onSwitchToLogin={() => setAuthMode('LOGIN')} onSignupSuccess={handleLoginSuccess} />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col selection:bg-blue-100 selection:text-blue-700 animate-fadeIn">
      {deferredPrompt && (
        <div className="bg-blue-600 text-white px-6 py-2 flex items-center justify-between text-sm font-bold animate-slideDown">
          <div className="flex items-center gap-2">
            <ICONS.Logo className="w-5 h-5" />
            <span>Install Jaiswal Packers for a better experience</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={handleInstallApp} className="bg-white text-blue-600 px-4 py-1 rounded-lg text-xs font-black uppercase tracking-wider">Install</button>
            <button onClick={() => setDeferredPrompt(null)} className="text-white/60 hover:text-white">
              <ICONS.X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <header className={`bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 ${view === 'HOME' ? 'hidden lg:block' : ''}`}>
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => {
            setLogoTapCount(prev => prev + 1);
            if (view !== 'HOME') setView('HOME');
          }}>
            <div className="bg-white p-1 rounded-2xl shadow-lg shadow-blue-200">
              <ICONS.Logo className="w-10 h-10" />
            </div>
            <span className="font-extrabold text-2xl text-slate-900 tracking-tight">
              Jaiswal <span className="text-blue-600">Packers and Movers</span>
            </span>
          </div>
          
          <div className="hidden lg:flex items-center gap-10">
            <nav className="flex gap-8 text-sm font-semibold">
              <button onClick={() => setView('HOME')} className={`transition-colors ${view === 'HOME' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}>Home</button>
              {user.isAdmin && <button onClick={() => setView('ADMIN')} className={`transition-colors ${view === 'ADMIN' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}>Admin</button>}
              <button onClick={() => setView('PRICING')} className={`transition-colors ${view === 'PRICING' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}>Pricing</button>
              <button onClick={() => setView('BOOKING_FLOW')} className={`transition-colors ${view === 'BOOKING_FLOW' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}>Book Now</button>
              <button onClick={() => setView('MY_BOOKINGS')} className={`transition-colors ${view === 'MY_BOOKINGS' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}>My Bookings</button>
              <button onClick={() => setView('PROFILE')} className={`transition-colors ${view === 'PROFILE' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}>Profile</button>
            </nav>
            <div className="h-6 w-px bg-slate-200" />
            <div className="flex items-center gap-4">
              <div className="flex flex-col text-right">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Hi, {user.email.split('@')[0]}</span>
                <span className="text-xs font-black text-blue-600">{user.isAdmin ? 'ADMIN' : 'CUSTOMER'}</span>
              </div>
              <button onClick={handleLogout} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-red-500 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-x-hidden">
        {isNavigating ? (
          <div className="max-w-6xl mx-auto px-6 py-12 animate-fadeIn">
            {view === 'HOME' && <HeroSkeleton />}
            {view === 'PRICING' && <PricingSkeleton />}
            {view === 'MY_BOOKINGS' && <BookingListSkeleton />}
            {view === 'ADMIN' && (
              <div className="space-y-12">
                <AdminStatsSkeleton />
                <TableSkeleton />
              </div>
            )}
            {view === 'BOOKING_FLOW' && (
              <div className="bg-white rounded-[32px] p-20 border border-slate-100 h-[600px] flex flex-col gap-8">
                <div className="flex justify-between">
                  <div className="flex gap-4"><div className="w-10 h-10 rounded-full bg-slate-100 animate-pulse" /><div className="space-y-2 pt-1"><div className="h-3 w-12 bg-slate-100 animate-pulse rounded" /><div className="h-4 w-20 bg-slate-100 animate-pulse rounded" /></div></div>
                  <div className="flex gap-4"><div className="w-10 h-10 rounded-full bg-slate-100 animate-pulse" /><div className="space-y-2 pt-1"><div className="h-3 w-12 bg-slate-100 animate-pulse rounded" /><div className="h-4 w-20 bg-slate-100 animate-pulse rounded" /></div></div>
                  <div className="flex gap-4"><div className="w-10 h-10 rounded-full bg-slate-100 animate-pulse" /><div className="space-y-2 pt-1"><div className="h-3 w-12 bg-slate-100 animate-pulse rounded" /><div className="h-4 w-20 bg-slate-100 animate-pulse rounded" /></div></div>
                </div>
                <div className="flex-1 flex flex-col gap-8 pt-10">
                   <div className="h-10 w-1/3 bg-slate-100 animate-pulse rounded-xl" />
                   <div className="h-4 w-1/2 bg-slate-100 animate-pulse rounded-lg" />
                   <div className="h-48 w-full bg-slate-50 animate-pulse rounded-[32px]" />
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {view === 'HOME' && (
        <UrbanHome 
          onStartBooking={() => setView('BOOKING_FLOW')} 
          onSelectMoversService={(id) => {
            if (id === 'house-shifting') {
              setView('SERVICE_DETAILS');
            } else {
              setView('BOOKING_FLOW');
            }
          }}
          onSelectNaturals={() => setView('NATURALS')}
          onCartClick={() => setView('PAYMENT_SUMMARY')}
          cart={cart}
        />
      )}

      {view === 'SERVICE_DETAILS' && (
        <ServiceDetailsPage 
          onBack={() => setView('HOME')}
          onProceed={(newCart) => {
            setCart(newCart);
            setView('PAYMENT_SUMMARY');
          }}
          cart={cart}
          setCart={setCart}
          onCartClick={() => setView('PAYMENT_SUMMARY')}
        />
      )}

      {view === 'PAYMENT_SUMMARY' && (
        <PaymentSummaryPage 
          cart={cart}
          services={[...localMovingServices, ...interCityMovingServices]}
          onBack={() => setView('SERVICE_DETAILS')}
          onSelectAddress={(addressDetails) => {
            console.log('Address confirmed:', addressDetails);
            const pickup = addressDetails.pickup;
            const drop = addressDetails.drop;
            
            setBooking({
              ...booking,
              pickupAddress: pickup ? `${pickup.houseNo}, ${pickup.landmark ? pickup.landmark + ', ' : ''}${pickup.fullAddress}` : booking.pickupAddress,
              pickupCoordinates: pickup?.coordinates,
              dropAddress: drop ? `${drop.houseNo}, ${drop.landmark ? drop.landmark + ', ' : ''}${drop.fullAddress}` : booking.dropAddress,
              dropCoordinates: drop?.coordinates
            });
            setView('BOOKING_FLOW');
            setCurrentStep(BookingStep.DATE_TIME);
          }}
        />
      )}
            {view === 'NATURALS' && (
              <div className="max-w-6xl mx-auto px-6 py-24 text-center animate-fadeIn">
                <div className="w-32 h-32 bg-emerald-50 rounded-[40px] flex items-center justify-center mx-auto mb-8 text-emerald-600 shadow-inner">
                  <ICONS.Sparkles className="w-16 h-16 animate-pulse" />
                </div>
                <div className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                  Coming Soon
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                  Naturals & Organic <br/>
                  <span className="text-emerald-600">Cleaning Revolution</span>
                </h2>
                <p className="text-slate-500 font-medium max-w-lg mx-auto leading-relaxed text-lg mb-10">
                  We're crafting a new range of eco-friendly, chemical-free cleaning solutions that are safe for your family and the planet.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button 
                    onClick={() => setView('HOME')} 
                    className="w-full sm:w-auto px-10 py-4 bg-slate-900 text-white rounded-2xl font-black shadow-xl hover:scale-105 transition-all active:scale-95"
                  >
                    Back to Home
                  </button>
                  <button 
                    className="w-full sm:w-auto px-10 py-4 bg-white border-2 border-slate-100 text-slate-400 rounded-2xl font-black cursor-not-allowed"
                    disabled
                  >
                    Notify Me
                  </button>
                </div>
                
                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                  {[
                    { title: '100% Organic', desc: 'Plant-based ingredients only' },
                    { title: 'Pet Safe', desc: 'Non-toxic for your furry friends' },
                    { title: 'Eco-Friendly', desc: 'Biodegradable packaging' }
                  ].map((feature, i) => (
                    <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                      <h4 className="font-black text-slate-900 mb-2">{feature.title}</h4>
                      <p className="text-sm text-slate-500 font-medium">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {view === 'PRICING' && <PricingPage onStartBooking={() => setView('BOOKING_FLOW')} />}
            {view === 'ADMIN' && user.isAdmin && <AdminDashboard bookings={confirmedBookings} onUpdateStatus={handleUpdateBookingStatus} />}
            {view === 'MY_BOOKINGS' && <div className="max-w-6xl mx-auto w-full px-6 py-12"><MyBookings bookings={confirmedBookings} onBack={() => setView('HOME')} onUpdateBookingStatus={handleUpdateBookingStatus} /></div>}
            {view === 'PROFILE' && (
              <div className="max-w-6xl mx-auto w-full px-6 py-12">
                <ProfilePage 
                  onLogout={handleLogout} 
                  onBack={() => setView('HOME')} 
                  onInstallApp={handleInstallApp}
                  canInstall={!!deferredPrompt}
                />
              </div>
            )}
            {view === 'BOOKING_FLOW' && (
              <div className="max-w-6xl mx-auto w-full px-6 py-12">
                <div className="mb-12">
                  <div className="flex justify-between items-center mb-10 overflow-x-auto pb-4 no-scrollbar gap-4">
                    {[
                      { step: BookingStep.LOCATION, label: 'Route', icon: ICONS.Location },
                      { step: BookingStep.INVENTORY, label: 'Inventory', icon: ICONS.Package },
                      { step: BookingStep.SERVICE_TYPE, label: 'Service', icon: ICONS.Truck },
                      { step: BookingStep.DATE_TIME, label: 'Schedule', icon: ICONS.Clock },
                      { step: BookingStep.REVIEW, label: 'Review', icon: ICONS.CheckCircle }
                    ].map((s, idx) => {
                      const stepIdx = Object.values(BookingStep).indexOf(s.step);
                      const currentIdx = Object.values(BookingStep).indexOf(currentStep);
                      const isCartFlow = Object.keys(cart).length > 0;
                      const isPastPointOfNoReturn = isCartFlow && idx < 3;
                      const canNavigate = !isPastPointOfNoReturn && stepIdx < currentIdx;

                      return (
                        <div 
                          key={s.step} 
                          className={`flex items-center gap-3 min-w-max transition-all ${canNavigate ? 'cursor-pointer hover:opacity-80' : 'cursor-not-allowed opacity-50'}`} 
                          onClick={() => {
                            if (canNavigate) setCurrentStep(s.step);
                          }}
                        >
                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-extrabold transition-all duration-300 ${currentStep === s.step ? 'bg-blue-600 text-white shadow-lg' : idx < currentIdx ? 'bg-green-500 text-white' : 'bg-white border border-slate-200 text-slate-400'}`}>
                            {idx < currentIdx ? '✓' : idx + 1}
                          </div>
                          <div className="flex flex-col">
                            <span className={`text-xs font-bold uppercase tracking-widest ${currentStep === s.step ? 'text-blue-600' : 'text-slate-400'}`}>Step {idx + 1}</span>
                            <span className={`text-sm font-bold ${currentStep === s.step ? 'text-slate-900' : 'text-slate-400'}`}>{s.label}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-white rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden flex flex-col min-h-[600px]">
                  <div className="p-8 md:p-12 flex-1">
                    {currentStep === BookingStep.LOCATION && <LocationStep booking={booking} setBooking={setBooking} />}
                    {currentStep === BookingStep.INVENTORY && <InventoryStep booking={booking} setBooking={setBooking} />}
                    {currentStep === BookingStep.SERVICE_TYPE && <ServiceTypeStep booking={booking} setBooking={setBooking} />}
                    {currentStep === BookingStep.DATE_TIME && (
                      <DateTimeStep 
                        booking={booking}
                        setBooking={setBooking}
                      />
                    )}
                    {currentStep === BookingStep.REVIEW && (
                      <ReviewStep 
                        booking={booking}
                        setBooking={setBooking}
                        estimate={displayEstimate}
                        selectedServices={selectedServices}
                        onUpdateMobile={(mobile) => setBooking(prev => ({ ...prev, userMobile: mobile }))}
                      />
                    )}
                  </div>

                  <div className="px-8 py-6 md:px-12 md:py-8 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                    <button onClick={prevStep} disabled={currentStep === BookingStep.LOCATION || isProcessingPayment} className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${currentStep === BookingStep.LOCATION ? 'invisible' : 'text-slate-600 hover:bg-slate-200'}`}>Back</button>
                    <div className="flex items-center gap-8">
                      {currentStep !== BookingStep.LOCATION && (
                        <div className="text-right hidden sm:block">
                          <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">Total Estimate</p>
                          <p className="text-2xl font-extrabold text-slate-900">₹{displayEstimate.total.toLocaleString()}</p>
                        </div>
                      )}
                      <button onClick={nextStep} disabled={isNextDisabled} className={`flex items-center gap-3 px-10 py-4 rounded-[20px] font-bold transition-all ${isNextDisabled ? 'bg-slate-200 text-slate-400' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-200'}`}>
                        {isProcessingPayment && (
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        )}
                        {currentStep === BookingStep.REVIEW 
                          ? (isProcessingPayment ? 'Processing...' : 'Confirm & Book') 
                          : 'Continue'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Bottom Navigation Bar for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-3 flex justify-between items-center z-[60] shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <button onClick={() => setView('HOME')} className={`flex flex-col items-center gap-1 transition-colors ${view === 'HOME' ? 'text-blue-600' : 'text-slate-400'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-wider">Home</span>
        </button>
        <button onClick={() => setView('NATURALS')} className={`flex flex-col items-center gap-1 transition-colors ${view === 'NATURALS' ? 'text-blue-600' : 'text-slate-400'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09-3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 22.25l-.394-1.683a2.25 2.25 0 0 0-1.713-1.713L12.75 18.5l1.643-.394a2.25 2.25 0 0 0 1.713-1.713L16.5 14.75l.394 1.643a2.25 2.25 0 0 0 1.713 1.713L20.25 18.5l-1.643.394a2.25 2.25 0 0 0-1.713 1.713Z" />
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-wider">Naturals</span>
        </button>
        <button onClick={() => setView('PAYMENT_SUMMARY')} className={`flex flex-col items-center gap-1 transition-colors relative ${view === 'PAYMENT_SUMMARY' ? 'text-blue-600' : 'text-slate-400'}`}>
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121 -2.3 2.1 -4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            {Object.keys(cart).length > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-blue-600 text-white text-[8px] font-bold rounded-full flex items-center justify-center border border-white">
                {Object.keys(cart).length}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider">Cart</span>
        </button>
        <button onClick={() => setView('MY_BOOKINGS')} className={`flex flex-col items-center gap-1 transition-colors ${view === 'MY_BOOKINGS' ? 'text-blue-600' : 'text-slate-400'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-0.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-wider">Bookings</span>
        </button>
        {user.isAdmin && (
          <button onClick={() => setView('ADMIN')} className={`flex flex-col items-center gap-1 transition-colors ${view === 'ADMIN' ? 'text-blue-600' : 'text-slate-400'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 12h7.5" />
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-wider">Admin</span>
          </button>
        )}
        <button onClick={() => setView('PROFILE')} className={`flex flex-col items-center gap-1 transition-colors ${view === 'PROFILE' ? 'text-blue-600' : 'text-slate-400'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-wider">Account</span>
        </button>
      </div>
    </div>
  );
};

export default App;