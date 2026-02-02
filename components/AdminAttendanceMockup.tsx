import React, { useState } from 'react';
import { Clock, MapPin, Users } from 'lucide-react';

interface AdminAttendanceMockupProps {
  checkedInUser?: { name: string; time: string } | null;
}

export const AdminAttendanceMockup: React.FC<AdminAttendanceMockupProps> = ({ checkedInUser }) => {
  const [activeTab, setActiveTab] = useState<'sessions' | 'attendance'>('attendance');

  const sessions = [
    { id: 4, name: 'Test four', sessionId: 'ID: UNKNOWN_1768216330605', location: 'session', time: '13:34', date: 'Jan 12' },
    { id: 6, name: 'Test six', sessionId: 'ID: UNKNOWN_1768216577274', location: 'session', time: '13:34', date: 'Jan 12' },
  ];

  const defaultAttendees = [
    { id: 1, name: 'Sara Wilson', time: '09:17' },
    { id: 2, name: 'Omar Hassan', time: '09:20' },
  ];

  const attendees = checkedInUser 
    ? [checkedInUser, ...defaultAttendees].slice(0, 4)
    : defaultAttendees;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Admin Header */}
      <div className="px-3 py-2 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white text-[10px] font-bold">
            A
          </div>
          <div>
            <p className="text-[9px] font-bold text-black">Adel Saeed</p>
            <p className="text-[8px] text-gray-600">Admin</p>
          </div>
        </div>
      </div>

      {/* Welcome Card */}
      <div className="px-3 py-2 bg-black text-white rounded-lg m-3 space-y-1">
        <p className="text-[9px] font-light opacity-90">Admin Control Panel</p>
        <p className="text-sm font-bold">Assuit University</p>
        <p className="text-[9px] opacity-90">Unique sessions and attendance</p>
      </div>

      {/* Tabs */}
      <div className="px-3 flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('sessions')}
          className={`py-2 px-3 text-[10px] font-bold transition-colors ${
            activeTab === 'sessions'
              ? 'text-gray-700 border-b-2 border-black'
              : 'text-gray-500'
          }`}
        >
          Manage Sessions
        </button>
        <button
          onClick={() => setActiveTab('attendance')}
          className={`py-2 px-3 text-[10px] font-bold transition-colors ${
            activeTab === 'attendance'
              ? 'text-black bg-black text-white rounded px-3'
              : 'text-gray-500'
          }`}
        >
          User Attendance
        </button>
      </div>

      {activeTab === 'attendance' ? (
        <>
          {/* Stats Card */}
          <div className="px-3 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-gray-600 font-medium">Total Attendance</p>
                <p className="text-2xl font-bold text-black">{attendees.length}</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-[9px] font-bold">● Live</span>
            </div>
          </div>

          {/* Attendance List */}
          <div className="flex-1 overflow-auto px-3 py-2 space-y-2">
            {attendees.map((attendee) => (
              <div
                key={attendee.name}
                className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                  {getInitials(attendee.name)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-gray-900">{attendee.name}</p>
                  <p className="text-[8px] text-gray-500">{attendee.time}</p>
                </div>

                <div className="flex-shrink-0">
                  <Clock className="h-3.5 w-3.5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Sessions Count */}
          <div className="px-3 py-3 border-b border-gray-200">
            <p className="text-[10px] text-gray-600 font-medium">Total Sessions</p>
            <p className="text-2xl font-bold text-black">{sessions.length}</p>
          </div>

          {/* Sessions List */}
          <div className="flex-1 overflow-auto px-3 py-2 space-y-2">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="flex items-start gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                  {session.id}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-gray-900">{session.name}</p>
                  <p className="text-[8px] text-gray-500 truncate">{session.sessionId}</p>
                  <p className="text-[8px] text-gray-500 flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" />
                    {session.location}
                  </p>
                </div>

                <div className="flex-shrink-0 text-right">
                  <p className="text-[10px] font-bold text-gray-900">{session.time}</p>
                  <p className="text-[8px] text-gray-500">{session.date}</p>
                </div>
              </div>
            ))}
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
