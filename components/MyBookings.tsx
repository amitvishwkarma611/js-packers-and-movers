import React, { useState } from 'react';
import { ConfirmedBooking } from '../types';
import { ICONS, COMMON_ITEMS } from '../constants';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

import { generateInvoicePDF } from '../services/invoice';

interface Props {
  bookings: ConfirmedBooking[];
  onBack: () => void;
  onUpdateBookingStatus: (id: string, newStatus: 'Pending' | 'Upcoming' | 'Confirmed' | 'Completed' | 'Cancelled') => void;
}

const MyBookings: React.FC<Props> = ({ bookings, onBack, onUpdateBookingStatus }) => {
  const [bookingToCancel, setBookingToCancel] = useState<ConfirmedBooking | null>(null);

  const sortedBookings = [...bookings].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const handleCancel = () => {
    if (bookingToCancel) {
      onUpdateBookingStatus(bookingToCancel.id, 'Cancelled');
      setBookingToCancel(null);
    }
  };

  const handleDownloadInvoice = (booking: ConfirmedBooking) => {
    const doc = generateInvoicePDF(booking);
    doc.save(`Jaiswal_Invoice_${booking.id.slice(-6).toUpperCase()}.pdf`);
  };

  return (
    <div className="animate-fadeIn max-w-4xl mx-auto py-8">
      <div className="flex items-center justify-between mb-10">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold mb-4 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back to Shifting Tool
          </button>
          <h2 className="text-4xl font-extrabold text-slate-900">My Bookings</h2>
          <p className="text-slate-500 font-medium">Track and manage your house shifts.</p>
        </div>
        <div className="hidden sm:flex items-center gap-4 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
            <ICONS.Truck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Active Moves</p>
            <p className="text-xl font-black text-slate-900">
              {bookings.filter(b => b.status === 'Upcoming').length}
            </p>
          </div>
        </div>
      </div>

      {sortedBookings.length === 0 ? (
        <div className="bg-white rounded-[40px] border border-slate-100 p-20 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center text-slate-200 mb-8">
            <ICONS.Package className="w-12 h-12" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">No bookings found</h3>
          <p className="text-slate-500 max-sm font-medium">You haven't booked any shifts yet. Start your first move today!</p>
          <button 
            onClick={onBack}
            className="mt-8 px-10 py-4 bg-blue-600 text-white rounded-[20px] font-bold shadow-xl shadow-blue-100 hover:scale-105 transition-all active:scale-95"
          >
            Book a Move Now
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedBookings.map((booking) => (
            <div key={booking.id} className={`bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group overflow-hidden relative ${booking.status === 'Cancelled' ? 'opacity-60 bg-slate-50/50' : ''}`}>
              <div className="flex flex-col md:flex-row gap-8 relative z-10">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${
                      booking.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 
                      booking.status === 'Accepted' ? 'bg-blue-50 text-blue-600' : 
                      (booking.status === 'Pending' || booking.status === 'Upcoming') ? 'bg-amber-50 text-amber-600' : 
                      (booking.status === 'Cancelled' || booking.status === 'Rejected') ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {booking.status}
                    </span>
                    <span className="text-xs font-bold text-slate-400">ID: #{booking.id.slice(-6).toUpperCase()}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center pt-1">
                          <div className={`w-2 h-2 rounded-full ${booking.status === 'Cancelled' ? 'bg-slate-300' : 'bg-blue-600'}`} />
                          <div className="w-0.5 h-full border-l border-dotted border-slate-300 my-1" />
                        </div>
                        <div>
                          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">From</p>
                          <p className={`text-sm font-bold text-slate-900 line-clamp-1 ${booking.status === 'Cancelled' ? 'line-through text-slate-400' : ''}`}>{booking.details.pickupAddress}</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className={`w-2 h-2 rounded-full border-2 ${booking.status === 'Cancelled' ? 'border-slate-300' : 'border-blue-600'} bg-white mt-1`} />
                        <div>
                          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">To</p>
                          <p className={`text-sm font-bold text-slate-900 line-clamp-1 ${booking.status === 'Cancelled' ? 'line-through text-slate-400' : ''}`}>{booking.details.dropAddress}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Move Date</p>
                        <p className={`text-sm font-bold text-slate-900 ${booking.status === 'Cancelled' ? 'text-slate-400' : ''}`}>
                          {new Date(booking.details.moveDate).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Items</p>
                        <p className={`text-sm font-bold text-slate-900 ${booking.status === 'Cancelled' ? 'text-slate-400' : ''}`}>
                          {booking.details.inventory.reduce((acc, curr) => acc + curr.quantity, 0)} Items
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:w-px md:bg-slate-100" />

                <div className="md:w-56 flex flex-col justify-between items-end text-right">
                  <div>
                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Total Paid</p>
                    <p className={`text-3xl font-black ${booking.status === 'Cancelled' ? 'text-slate-400' : 'text-slate-900'}`}>₹{booking.estimate.total.toLocaleString()}</p>
                  </div>
                  <div className="flex flex-col gap-3 items-end">
                    {(booking.status === 'Upcoming' || booking.status === 'Pending' || booking.status === 'Confirmed') && (
                      <button 
                        onClick={() => setBookingToCancel(booking)}
                        className="text-[10px] font-black text-rose-500 hover:text-rose-700 uppercase tracking-widest transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-rose-50"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                        Cancel Move
                      </button>
                    )}
                    {booking.status === 'Completed' && (
                      <button 
                        onClick={() => handleDownloadInvoice(booking)}
                        className="text-xs font-bold text-blue-600 hover:text-blue-700 uppercase tracking-widest border-b border-blue-100 hover:border-blue-600 transition-all pb-1"
                      >
                        Invoice PDF
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cancellation Confirmation Modal */}
      {bookingToCancel && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-[48px] overflow-hidden shadow-[0_20px_70px_-10px_rgba(0,0,0,0.5)] p-12 text-center transform scale-in animate-scaleIn">
            <div className="w-24 h-24 bg-rose-50 rounded-[32px] flex items-center justify-center text-rose-500 mx-auto mb-8 shadow-sm animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
            </div>
            
            <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Cancel Shifting?</h3>
            <p className="text-slate-500 font-medium leading-relaxed mb-10 text-lg">
              Are you sure you want to cancel your move scheduled for <span className="text-slate-900 font-bold">{bookingToCancel.details.moveDate}</span>? 
              <br/><br/>
              <span className="text-rose-600 font-bold uppercase tracking-widest text-sm">Action is Irreversible</span>
            </p>
            
            <div className="flex flex-col gap-4">
              <button 
                onClick={handleCancel}
                className="w-full py-5 bg-rose-600 text-white rounded-[24px] font-black text-lg shadow-2xl shadow-rose-200 hover:bg-rose-700 hover:scale-[1.02] active:scale-95 transition-all"
              >
                Yes, Cancel Booking
              </button>
              <button 
                onClick={() => setBookingToCancel(null)}
                className="w-full py-5 bg-slate-50 text-slate-600 rounded-[24px] font-black text-lg hover:bg-slate-100 transition-all active:scale-95"
              >
                No, Keep Booking
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
};

export default MyBookings;