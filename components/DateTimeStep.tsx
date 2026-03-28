import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { BookingDetails } from '../types';

interface DateTimeStepProps {
  booking: BookingDetails;
  setBooking: (b: BookingDetails) => void;
}

const DateTimeStep: React.FC<DateTimeStepProps> = ({ booking, setBooking }) => {
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date());

  const selectedDate = booking.moveDate;
  const selectedSlot = booking.moveSlot || '';

  const setSelectedDate = (date: string) => {
    setBooking({ ...booking, moveDate: date });
  };

  const setSelectedSlot = (slot: string) => {
    setBooking({ ...booking, moveSlot: slot });
  };

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push({
        day: d.toLocaleDateString('en-US', { weekday: 'short' }),
        date: d.getDate().toString(),
        full: d.toISOString().split('T')[0],
        month: d.toLocaleDateString('en-US', { month: 'short' }),
        year: d.getFullYear()
      });
    }
    return dates;
  };

  const dates = generateDates();

  const slots = [
    '07:00 AM - 10:00 AM',
    '10:00 AM - 01:00 PM',
    '01:00 PM - 04:00 PM',
    '04:00 PM - 07:00 PM',
    '07:00 PM - 10:00 PM',
  ];

  const currentMonth = dates[0].month;
  const currentYear = dates[0].year;

  // Calendar Logic
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const renderCalendar = () => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days = [];
    // Empty slots for previous month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split('T')[0];
      const isPast = date < today;
      const isSelected = selectedDate === dateString;

      days.push(
        <button
          key={day}
          disabled={isPast}
          onClick={() => {
            setSelectedDate(dateString);
            setShowFullCalendar(false);
          }}
          className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
            isSelected 
              ? 'bg-blue-600 text-white shadow-md' 
              : isPast 
                ? 'text-slate-200 cursor-not-allowed' 
                : 'text-slate-600 hover:bg-blue-50 hover:text-blue-600'
          }`}
        >
          {day}
        </button>
      );
    }
    return days;
  };

  const changeMonth = (delta: number) => {
    const newMonth = new Date(calendarMonth);
    newMonth.setMonth(newMonth.getMonth() + delta);
    setCalendarMonth(newMonth);
  };

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-900 mb-2">Select Date & Time</h2>
        <p className="text-slate-500 font-medium">Choose a convenient slot for your move.</p>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-blue-600" />
            Select Date
          </h3>
          <button 
            onClick={() => setShowFullCalendar(true)}
            className="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
          >
            {currentMonth} {currentYear} • View Calendar
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2">
          {dates.map((d) => (
            <button
              key={d.full}
              onClick={() => setSelectedDate(d.full)}
              className={`flex flex-col items-center min-w-[70px] py-4 rounded-2xl border transition-all ${
                selectedDate === d.full 
                ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100 scale-105 z-10' 
                : 'bg-white border-slate-100 text-slate-600 hover:border-slate-200'
              }`}
            >
              <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${selectedDate === d.full ? 'text-blue-100' : 'text-slate-400'}`}>{d.day}</span>
              <span className="text-lg font-black">{d.date}</span>
              {d.full === new Date().toISOString().split('T')[0] && (
                <span className={`text-[8px] font-black uppercase mt-1 ${selectedDate === d.full ? 'text-white' : 'text-blue-600'}`}>Today</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600" />
          Select Time Slot
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {slots.map((slot) => (
            <button
              key={slot}
              onClick={() => setSelectedSlot(slot)}
              className={`w-full py-4 px-6 rounded-2xl border text-left transition-all font-bold text-sm ${
                selectedSlot === slot 
                ? 'bg-blue-50 border-blue-200 text-blue-600 shadow-sm' 
                : 'bg-white border-slate-100 text-slate-600 hover:border-slate-200'
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {/* Full Calendar Modal */}
      <AnimatePresence>
        {showFullCalendar && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFullCalendar(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200]"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed inset-x-0 bottom-0 bg-white rounded-t-[32px] z-[201] p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-slate-900">Select Date</h3>
                <button 
                  onClick={() => setShowFullCalendar(false)}
                  className="p-2 bg-slate-100 rounded-full text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center justify-between mb-6">
                <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-slate-50 rounded-lg">
                  <ChevronLeft className="w-5 h-5 text-slate-600" />
                </button>
                <span className="font-black text-slate-900 uppercase tracking-widest">
                  {calendarMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <button onClick={() => changeMonth(1)} className="p-2 hover:bg-slate-50 rounded-lg">
                  <ChevronRight className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                  <div key={i} className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {d}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {renderCalendar()}
              </div>

              <button
                onClick={() => setShowFullCalendar(false)}
                className="w-full mt-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm"
              >
                Close
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DateTimeStep;
