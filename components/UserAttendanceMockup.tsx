import React, { useState } from 'react';
import { CheckCircle, Clock, MapPin, Users as UsersIcon, Wifi, Calendar } from 'lucide-react';

interface UserAttendanceMockupProps {
  onCheckIn?: (user: { name: string; time: string }) => void;
}

export const UserAttendanceMockup: React.FC<UserAttendanceMockupProps> = ({ onCheckIn }) => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsCheckedIn(true);
      setIsLoading(false);
      // Notify parent that user checked in
      if (onCheckIn) {
        onCheckIn({ name: 'Ahmed Mohamed', time: '11:35 AM' });
      }
    }, 1500);
  };

  const handleReset = () => {
    setIsCheckedIn(false);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Status Bar */}
      <div className="px-3 py-1.5 bg-white border-b border-gray-200 flex items-center justify-between">
        <span className="text-[9px] font-semibold text-black">9:41</span>
        <span className="text-[9px] font-semibold text-black">•••</span>
      </div>

      {/* User Header */}
      <div className="px-3 py-2 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white text-[10px] font-bold">
            A
          </div>
          <div>
            <p className="text-[9px] font-bold text-black">Ahmed Mohamed</p>
            <p className="text-[8px] text-gray-600">user</p>
          </div>
        </div>
        <div className="text-red-500">
          <div className="text-[8px] font-bold">🔴</div>
        </div>
      </div>

      {/* Welcome Card */}
      <div className="px-3 py-2 bg-black text-white rounded-xl m-3 space-y-1">
        <p className="text-[9px] font-light opacity-90">Welcome Back!</p>
        <p className="text-sm font-bold">Assuit University</p>
        <p className="text-[9px] opacity-90">Check attendance and active sessions</p>
      </div>

      {!isCheckedIn ? (
        <>
          {/* Active Session Card */}
          <div className="px-3 mx-3 py-3 bg-black text-white rounded-xl space-y-2 border border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wifi className="h-3 w-3" />
                <p className="text-[9px] font-bold">Active Session Nearby</p>
              </div>
            </div>
            <p className="text-[8px] text-green-400 font-semibold">● Live Now</p>
            
            <div className="space-y-1 text-[8px] text-gray-300 bg-black/50 p-2 rounded">
              <p className="flex items-center gap-2">
                <Calendar className="h-3 w-3" />
                Session: <span className="text-white font-semibold">room1</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-3 w-3" />
                Location: <span className="text-white font-semibold">room1</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="h-3 w-3" />
                Time: <span className="text-white font-semibold">11:26 AM - 12:26 PM</span>
              </p>
              <p className="flex items-center gap-2">
                <UsersIcon className="h-3 w-3" />
                Attendees: <span className="text-white font-semibold">1 Students</span>
              </p>
            </div>

            <button 
              onClick={handleCheckIn}
              disabled={isLoading}
              className="w-full bg-white text-black py-2 px-3 rounded-lg text-[10px] font-bold hover:bg-gray-100 disabled:opacity-50 flex items-center justify-center gap-1 mt-2"
            >
              <CheckCircle className="h-3 w-3" />
              {isLoading ? 'Verifying...' : 'Check In Now'}
            </button>
          </div>

          {/* Attendance Stats */}
          <div className="px-3 py-3 mt-2">
            <p className="text-[10px] font-bold text-gray-600 mb-2">My Attendance</p>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 bg-blue-50 rounded">
                <Calendar className="h-3 w-3 text-blue-600 mx-auto mb-1" />
                <p className="text-sm font-bold text-black">24</p>
                <p className="text-[8px] text-gray-600">Total</p>
              </div>
              <div className="text-center p-2 bg-green-50 rounded">
                <CheckCircle className="h-3 w-3 text-green-600 mx-auto mb-1" />
                <p className="text-sm font-bold text-black">0</p>
                <p className="text-[8px] text-gray-600">Attended</p>
              </div>
              <div className="text-center p-2 bg-yellow-50 rounded">
                <p className="text-[9px] font-bold text-yellow-600">%</p>
                <p className="text-sm font-bold text-black">0%</p>
                <p className="text-[8px] text-gray-600">Rate</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Success State */}
          <div className="flex-1 flex flex-col items-center justify-center px-3 py-4">
            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mb-3">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <p className="text-lg font-bold text-green-600 mb-3">Check-In Successful!</p>
            
            <div className="w-full bg-green-50 border border-green-200 rounded-lg p-3 space-y-1 text-[9px]">
              <p className="flex items-center gap-2">
                <Calendar className="h-3 w-3 text-green-600" />
                Session: <span className="font-bold">room1</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-3 w-3 text-green-600" />
                Location: <span className="font-bold">room1</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="h-3 w-3 text-green-600" />
                Time: <span className="font-bold">11:35 AM</span>
              </p>
            </div>

            <button 
              onClick={handleReset}
              className="w-full mt-4 bg-black text-white py-2 px-4 rounded-lg text-xs font-bold hover:bg-gray-900"
            >
              Done
            </button>
          </div>
        </>
      )}

      {/* Bottom Navigation */}
      <div className="border-t border-gray-200 px-3 py-2 flex items-center justify-around text-[9px]">
        <div className="flex flex-col items-center gap-1 text-black">
          <span>🏠</span>
          <span className="font-bold">Home</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-gray-400">
          <span>👤</span>
          <span>Profile</span>
        </div>
      </div>
    </div>
  );
};
