import React, { useState } from 'react';
import { CheckCircle, Clock, MapPin, Users as UsersIcon } from 'lucide-react';

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

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-3 py-2 bg-black text-white text-center border-b">
        <h2 className="text-xs font-bold">Check In</h2>
      </div>

      {/* Session Info */}
      <div className="px-3 py-2 border-b text-xs">
        <p className="font-bold mb-1">Database Systems</p>
        <div className="space-y-1 text-gray-700">
          <p className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            Hall A
          </p>
          <p className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            09:00 - 11:00
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="px-3 py-2 border-b grid grid-cols-2 gap-2 text-center text-xs">
        <div className="border-r">
          <p className="text-gray-600">Present</p>
          <p className="font-bold text-lg">24</p>
        </div>
        <div>
          <p className="text-gray-600">Total</p>
          <p className="font-bold text-lg">30</p>
        </div>
      </div>

      {/* Check-in Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-3 py-4">
        {!isCheckedIn ? (
          <div className="text-center space-y-3 w-full">
            {/* Icon */}
            <div className="w-20 h-20 mx-auto bg-black rounded-lg flex items-center justify-center">
              <UsersIcon className="h-10 w-10 text-white" />
            </div>

            {/* Text */}
            <div>
              <p className="font-bold text-sm mb-1">Check In?</p>
              <p className="text-xs text-gray-600">Tap to verify attendance</p>
            </div>

            {/* Button */}
            <button 
              onClick={handleCheckIn}
              disabled={isLoading}
              className="w-full bg-black text-white py-2 px-4 rounded text-xs font-bold hover:bg-gray-900 disabled:opacity-50"
            >
              {isLoading ? 'Verifying...' : 'Check In Now'}
            </button>
          </div>
        ) : (
          <div className="text-center space-y-3 w-full">
            <div className="w-20 h-20 mx-auto bg-black rounded-lg flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <div>
              <p className="font-bold text-sm text-gray-900">Checked In!</p>
              <p className="text-xs text-gray-600">09:15 AM</p>
            </div>
            <button 
              onClick={() => setIsCheckedIn(false)}
              className="w-full bg-white border border-black text-black py-2 px-4 rounded text-xs font-bold hover:bg-gray-100"
            >
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
