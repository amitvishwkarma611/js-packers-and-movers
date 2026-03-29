
import React, { useState } from 'react';
import { ConfirmedBooking } from '../types';
import { ICONS } from '../constants';

interface Props {
  bookings: ConfirmedBooking[];
  onUpdateStatus: (id: string, newStatus: ConfirmedBooking['status']) => void;
}

const AdminDashboard: React.FC<Props> = ({ bookings, onUpdateStatus }) => {
  const [filter, setFilter] = useState<ConfirmedBooking['status'] | 'All'>('All');
  const [selectedBooking, setSelectedBooking] = useState<ConfirmedBooking | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: 'date' | 'price' | 'client'; direction: 'asc' | 'desc' }>({ key: 'date', direction: 'desc' });

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'Pending').length,
    accepted: bookings.filter(b => b.status === 'Accepted').length,
    completed: bookings.filter(b => b.status === 'Completed').length,
    revenue: bookings.reduce((acc, curr) => curr.status === 'Completed' ? acc + curr.estimate.total : acc, 0)
  };

  const filteredBookings = bookings.filter(b => {
    const matchesFilter = filter === 'All' || b.status === filter;
    const matchesSearch = b.userName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          b.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  }).sort((a, b) => {
    if (sortConfig.key === 'date') {
      const dateA = a.createdAt?.seconds || 0;
      const dateB = b.createdAt?.seconds || 0;
      return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
    }
    if (sortConfig.key === 'price') {
      return sortConfig.direction === 'asc' ? a.estimate.total - b.estimate.total : b.estimate.total - a.estimate.total;
    }
    if (sortConfig.key === 'client') {
      const nameA = a.userName || '';
      const nameB = b.userName || '';
      return sortConfig.direction === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    }
    return 0;
  });

  const handleSort = (key: 'date' | 'price' | 'client') => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  // Helper for static color mapping to ensure Tailwind JIT compiles them correctly
  const getStatStyles = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-50 text-blue-600';
      case 'amber': return 'bg-amber-50 text-amber-600';
      case 'emerald': return 'bg-emerald-50 text-emerald-600';
      case 'slate': return 'bg-slate-50 text-slate-600';
      case 'rose': return 'bg-rose-50 text-rose-600';
      default: return 'bg-slate-50 text-slate-600';
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-black text-slate-900">Operations Center</h2>
          <p className="text-slate-500 font-medium">Manage logistics and shifting schedules across India.</p>
        </div>
        
        <div className="flex flex-col gap-4 w-full md:w-auto">
          <div className="relative">
            <ICONS.Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by client, email or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-3 bg-white border border-slate-100 rounded-2xl text-sm font-bold w-full md:w-80 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
            />
          </div>
          <div className="flex items-center gap-3 bg-white p-2 rounded-[24px] border border-slate-100 shadow-sm overflow-x-auto no-scrollbar max-w-full">
            {['All', 'Pending', 'Accepted', 'Rejected', 'Completed', 'Cancelled'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-6 py-2.5 rounded-2xl text-xs font-black transition-all whitespace-nowrap ${
                  filter === f 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                    : 'text-slate-400 hover:text-slate-900'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Total Moves', val: stats.total, icon: ICONS.Truck, color: 'blue' },
          { label: 'Accepted', val: stats.accepted, icon: ICONS.CheckCircle, color: 'emerald' },
          { label: 'Pending', val: stats.pending, icon: ICONS.Clock, color: 'amber' },
          { label: 'Total Revenue', val: `₹${stats.revenue.toLocaleString()}`, icon: ICONS.Location, color: 'slate' }
        ].map((s, i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-6">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${getStatStyles(s.color)}`}>
              <s.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
              <p className="text-2xl font-black text-slate-900">{s.val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-blue-600 transition-colors" onClick={() => handleSort('date')}>
                  Booking ID {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-blue-600 transition-colors" onClick={() => handleSort('client')}>
                  Client Details {sortConfig.key === 'client' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Route</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-blue-600 transition-colors" onClick={() => handleSort('date')}>
                  Schedule {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-blue-600 transition-colors" onClick={() => handleSort('price')}>
                  Actions/Price {sortConfig.key === 'price' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <span className="text-sm font-black text-slate-900">#{b.id.slice(-6).toUpperCase()}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <p className="text-sm font-bold text-slate-900">{b.userName}</p>
                      <p className="text-xs text-slate-400">{b.userEmail}</p>
                      {b.userMobile && (
                        <a href={`tel:${b.userMobile}`} className="text-[10px] font-black text-blue-600 mt-1 flex items-center gap-1 hover:underline">
                          <ICONS.Phone className="w-2.5 h-2.5" /> {b.userMobile}
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1 max-w-[200px]">
                      <p className="text-xs font-bold text-slate-900 truncate" title={b.details.pickupAddress}>{b.details.pickupAddress}</p>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                        <span className="truncate" title={b.details.dropAddress}>{b.details.dropAddress}</span>
                      </p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <p className="text-sm font-bold text-slate-900">{new Date(b.details.moveDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{b.details.serviceType}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      b.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' :
                      b.status === 'Accepted' ? 'bg-blue-50 text-blue-600' : 
                      b.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                    }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setSelectedBooking(b)}
                        className="p-2 bg-slate-100 text-slate-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
                        title="View Details"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                      </button>
                      <div className="h-4 w-px bg-slate-200 mx-1" />
                      {b.status === 'Pending' && (
                        <>
                          <button 
                            onClick={() => onUpdateStatus(b.id, 'Accepted')}
                            className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all"
                            title="Accept Order"
                          >
                            <ICONS.CheckCircle className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => onUpdateStatus(b.id, 'Rejected')}
                            className="p-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all"
                            title="Reject Order"
                          >
                            <ICONS.X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      {b.status === 'Accepted' && (
                        <button 
                          onClick={() => onUpdateStatus(b.id, 'Completed')}
                          className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
                          title="Mark Completed"
                        >
                          <ICONS.Sparkles className="w-4 h-4" />
                        </button>
                      )}
                      {(b.status === 'Completed' || b.status === 'Rejected' || b.status === 'Cancelled') && (
                         <button 
                            onClick={() => onUpdateStatus(b.id, 'Pending')}
                            className="p-2 bg-slate-100 text-slate-400 rounded-xl hover:bg-slate-900 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest px-4 h-auto w-auto"
                          >
                            Reset
                          </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredBookings.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-400 font-bold">No bookings found matching the criteria.</p>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-2xl rounded-[48px] overflow-hidden shadow-3xl">
            <div className="p-10 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black text-slate-900">Move Details</h3>
                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-1">ID: #{selectedBooking.id.toUpperCase()}</p>
              </div>
              <button onClick={() => setSelectedBooking(null)} className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-slate-900 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <div className="p-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 gap-10 mb-10">
                <div>
                  <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">Origin Information</h4>
                  <p className="text-sm font-bold text-slate-900 leading-relaxed mb-2">{selectedBooking.details.pickupAddress}</p>
                  <p className="text-xs text-slate-500 font-medium">Floor {selectedBooking.details.floorPickup} • {selectedBooking.details.hasLiftPickup ? 'Lift' : 'Stairs'}</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">Destination Information</h4>
                  <p className="text-sm font-bold text-slate-900 leading-relaxed mb-2">{selectedBooking.details.dropAddress}</p>
                  <p className="text-xs text-slate-500 font-medium">Floor {selectedBooking.details.floorDrop} • {selectedBooking.details.hasLiftDrop ? 'Lift' : 'Stairs'}</p>
                </div>
              </div>

              <div className="mb-10">
                <h4 className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-4">Schedule & Service</h4>
                <div className="grid grid-cols-2 gap-6 bg-amber-50/50 p-6 rounded-3xl border border-amber-100">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Move Date</p>
                    <p className="text-sm font-bold text-slate-900">{new Date(selectedBooking.details.moveDate).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Time Slot</p>
                    <p className="text-sm font-bold text-slate-900">{selectedBooking.details.moveSlot || 'Morning (7 AM - 10 AM)'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Service Type</p>
                    <span className={`inline-block px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest mt-1 ${selectedBooking.details.serviceType === 'Premium' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                      {selectedBooking.details.serviceType}
                    </span>
                  </div>
                </div>
              </div>

              {selectedBooking.details.selectedServices && selectedBooking.details.selectedServices.length > 0 && (
                <div className="mb-10">
                  <h4 className="text-[10px] font-black text-purple-600 uppercase tracking-widest mb-4">Selected Packages</h4>
                  <div className="space-y-4">
                    {selectedBooking.details.selectedServices.map((service, idx) => (
                      <div key={idx} className="bg-purple-50/30 rounded-3xl border border-purple-100/50 overflow-hidden">
                        <div className="p-5 flex justify-between items-center">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-xl shadow-sm border border-purple-100">
                              {service.icon}
                            </div>
                            <div>
                              <p className="text-sm font-black text-slate-900">{service.title}</p>
                              <p className="text-[10px] text-purple-600 font-black uppercase tracking-widest">{service.category}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-black text-slate-900">Qty: {service.quantity}</p>
                            {service.extraItems > 0 && (
                              <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest">+{service.extraItems} Extra Items</p>
                            )}
                          </div>
                        </div>
                        
                        {/* Included Services & Items */}
                        <div className="px-5 pb-5 space-y-4">
                          {service.includedServices && service.includedServices.length > 0 && (
                            <div className="space-y-2">
                              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <ICONS.CheckCircle className="w-3 h-3 text-emerald-500" />
                                Included Services
                              </h5>
                              <ul className="grid grid-cols-1 gap-1.5 pl-5">
                                {service.includedServices.map((item: string, i: number) => (
                                  <li key={i} className="text-[11px] text-slate-600 font-bold flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-emerald-200" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {(service.includedItems && service.includedItems.length > 0 || (service.extraInventory && Object.keys(service.extraInventory).length > 0)) && (
                            <div className="space-y-2">
                              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <ICONS.Info className="w-3 h-3 text-blue-500" />
                                Included Items
                              </h5>
                              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-5">
                                {service.includedItems?.map((item: string, i: number) => (
                                  <li key={i} className="text-[11px] text-slate-600 font-bold flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-blue-200" />
                                    {item}
                                  </li>
                                ))}
                                {service.extraInventory && Object.entries(service.extraInventory).map(([name, qty], i) => (
                                  <li key={`extra-${i}`} className="text-[11px] text-blue-600 font-black flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-blue-400" />
                                    {name} <span className="text-[9px] opacity-70">×{qty as number}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
              </div>
            )}

              <div className="mb-10">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Inventory Breakdown</h4>
                {selectedBooking.details.inventory.length > 0 ? (
                  <div className="bg-slate-50 rounded-[32px] p-6 grid grid-cols-2 gap-4">
                    {selectedBooking.details.inventory.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-100">
                        <span className="text-sm font-bold text-slate-900">{item.name}</span>
                        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-black">×{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-slate-50 rounded-[32px] p-8 text-center border border-dashed border-slate-200">
                    <p className="text-xs text-slate-400 font-bold">No individual inventory items. See packages above.</p>
                  </div>
                )}
              </div>

              <div className="bg-slate-900 text-white p-8 rounded-[32px]">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Operational Payout</span>
                  <span className="text-2xl font-black">₹{selectedBooking.estimate.total.toLocaleString()}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs font-bold text-slate-400">
                  <div className="flex justify-between"><span>Base:</span> <span className="text-white">₹{selectedBooking.estimate.basePrice}</span></div>
                  <div className="flex justify-between"><span>Packing:</span> <span className="text-white">₹{selectedBooking.estimate.packingCharges}</span></div>
                  <div className="flex justify-between"><span>Labor:</span> <span className="text-white">₹{selectedBooking.estimate.laborCharges}</span></div>
                  <div className="flex justify-between"><span>Fuel:</span> <span className="text-white">₹{selectedBooking.estimate.transportation}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
