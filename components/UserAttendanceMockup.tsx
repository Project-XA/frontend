import React, { useState } from 'react';
import { CheckCircle, Clock, MapPin, Users as UsersIcon, ArrowRight } from 'lucide-react';

export const UserAttendanceMockup: React.FC = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsCheckedIn(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleReset = () => {
    setIsCheckedIn(false);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-white via-blue-50 to-white">
      {/* Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-b-3xl shadow-sm">
        <h2 className="text-sm font-semibold">Check In</h2>
        <p className="text-xs opacity-90">Mark your attendance</p>
      </div>

      {/* Session Info Card */}
      <div className="px-4 py-4 space-y-3">
        <div className="bg-white rounded-2xl p-4 border border-blue-100 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 mb-2">Database Systems</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <MapPin className="h-3.5 w-3.5 text-blue-600" />
              <span>Hall A, Building 3</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Clock className="h-3.5 w-3.5 text-blue-600" />
              <span>09:00 - 11:00 AM</span>
            </div>
          </div>
        </div>
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
          <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
          Session Active
        </div>
      </div>

      {/* Attendance Stats */}
      <div className="px-4 py-3 space-y-2">
        <div className="flex gap-2">
          <div className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-3 border border-blue-200">
            <p className="text-xs text-blue-600 font-semibold">Present Today</p>
            <p className="text-2xl font-bold text-blue-900">24</p>
          </div>
          <div className="flex-1 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-3 border border-purple-200">
            <p className="text-xs text-purple-600 font-semibold">Total</p>
            <p className="text-2xl font-bold text-purple-900">30</p>
          </div>
        </div>
      </div>

      {/* Check-in Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-6">
        <div className="text-center space-y-6 w-full">
          {!isCheckedIn ? (
            <>
              {/* Animated Icon */}
              <div className="w-28 h-28 mx-auto bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform"
                style={{
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                }}>
                <UsersIcon className="h-14 w-14 text-white" />
              </div>

              {/* Instructions */}
              <div className="space-y-2">
                <p className="text-base font-bold text-gray-900">Ready to Check In?</p>
                <p className="text-xs text-gray-600 max-w-[240px] mx-auto leading-relaxed">
                  Tap the button below to verify your attendance with biometric authentication
                </p>
              </div>

              {/* Check-in Button */}
              <button 
                onClick={handleCheckIn}
                disabled={isLoading}
                className="w-full max-w-[240px] bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-2xl font-semibold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-75 transform hover:scale-105 active:scale-95"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Verifying...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    Check In Now
                  </>
                )}
              </button>

              {/* Info Text */}
              <p className="text-[10px] text-gray-500">
                Face & fingerprint verification
              </p>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="w-28 h-28 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-xl animate-in fade-in zoom-in duration-500">
                <CheckCircle className="h-14 w-14 text-white" />
              </div>

              <div className="space-y-2 animate-in fade-in duration-700">
                <p className="text-lg font-bold text-green-600">Checked In!</p>
                <p className="text-sm text-gray-600">Your attendance has been recorded successfully</p>
                <p className="text-xs text-gray-500">Time: 09:15 AM</p>
              </div>

              <button 
                onClick={handleReset}
                className="w-full max-w-[240px] bg-white text-gray-700 py-3 px-6 rounded-2xl font-semibold text-sm border border-gray-300 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
              >
                <ArrowRight className="h-4 w-4" />
                Back to Session
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
