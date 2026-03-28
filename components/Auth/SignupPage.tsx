
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../services/firebase';

interface Props {
  onClose: () => void;
  onSwitchToLogin: () => void;
  onSignupSuccess: (email: string) => void;
}

const SignupPage: React.FC<Props> = ({ onClose, onSwitchToLogin, onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    agreeTerms: false
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
      setError("Please agree to the terms and conditions.");
      return;
    }
    
    setError(null);
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      
      // Update profile with full name
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: formData.fullName
        });

        // Create user document in Firestore
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          name: formData.fullName,
          email: formData.email,
          mobileNumber: formData.phone || '',
          createdAt: serverTimestamp()
        });
        
        if (userCredential.user.email) {
          onSignupSuccess(userCredential.user.email);
        }
      }
    } catch (err: any) {
      console.error("Signup error:", err);
      if (err.code === 'auth/operation-not-allowed') {
        setError("Email/Password login is not enabled. Please enable it in the Firebase Console under Authentication > Sign-in method.");
      } else {
        setError(err.message || "Failed to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fadeIn text-black">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative max-h-[95vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-black transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-black">Create Account</h2>
            <p className="text-slate-500">Join thousands of happy movers</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-black mb-1">Full Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-black"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-1">Email Address</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-black"
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-1">Phone Number</label>
              <input
                type="tel"
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-black"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-1">Create Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-black"
                placeholder="Minimum 8 characters"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
            
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  required
                  className="mt-1 rounded text-blue-600 w-4 h-4" 
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({...formData, agreeTerms: e.target.checked})}
                />
                <span className="text-xs text-slate-500 leading-tight">
                  By signing up, you agree to JS Packers and Movers' <a href="#" className="text-blue-600 font-semibold">Terms of Service</a> and <a href="#" className="text-blue-600 font-semibold">Privacy Policy</a>.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Creating Account...' : 'Get Started'}
            </button>
            {error && (
              <p className="text-red-500 text-xs text-center mt-2 font-medium">{error}</p>
            )}
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Already have an account? <button onClick={onSwitchToLogin} className="text-blue-600 font-bold hover:underline">Log in here</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
