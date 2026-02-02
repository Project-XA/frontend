import React from 'react';
import { CheckCircle, Clock, MapPin, Users as UsersIcon } from 'lucide-react';

export const UserAttendanceMockup: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="px-4 py-3 bg-black text-white">
        <h2 className="text-sm font-semibold">Check In</h2>
        <p className="text-xs opacity-80">Mark your attendance</p>
      </div>

      {/* Session Info */}
      <div className="px-4 py-4 space-y-3">
        <div>
          <h3 className="text-base font-bold mb-1">Database Systems</h3>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <MapPin className="h-3 w-3" />
            <span>Hall A</span>
            <span>•</span>
            <Clock className="h-3 w-3" />
            <span>09:00 - 11:00 AM</span>
          </div>
        </div>
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
          <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
          Session Active
        </div>
      </div>

      {/* Attendance Stats */}
      <div className="px-4 py-3 bg-white border-y">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Present Today</p>
            <p className="text-2xl font-bold">24</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Total Students</p>
            <p className="text-2xl font-bold">30</p>
          </div>
        </div>
      </div>

      {/* Check-in Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
        <div className="text-center space-y-4">
          {/* Icon */}
          <div className="w-24 h-24 mx-auto bg-black rounded-full flex items-center justify-center shadow-lg">
            <UsersIcon className="h-12 w-12 text-white" />
          </div>

          {/* Instructions */}
          <div className="space-y-2">
            <p className="text-base font-semibold text-gray-900">Ready to Check In?</p>
            <p className="text-xs text-gray-500 max-w-[200px] mx-auto">
              Tap the button below to mark your attendance
            </p>
          </div>

          {/* Check-in Button */}
          <button className="w-full max-w-[220px] bg-black text-white py-3.5 px-6 rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-lg mt-6">
            <CheckCircle className="h-5 w-5" />
            Check In Now
          </button>

          {/* Info Text */}
          <p className="text-[10px] text-gray-400 mt-4">
            Biometric verification required
          </p>
        </div>
      </div>
    </div>
  );
};
