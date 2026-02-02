import React from 'react';
import { Users, CheckCircle, Fingerprint } from 'lucide-react';

export const AdminAttendanceMockup: React.FC = () => {
  const attendees = [
    { name: 'John Doe', username: 'johnd', time: '09:15', type: 'Face', score: 95.2, color: 'bg-blue-500' },
    { name: 'Jane Smith', username: 'janes', time: '09:17', type: 'Fingerprint', score: 92.8, color: 'bg-purple-500' },
    { name: 'Mike Johnson', username: 'mikej', time: '09:20', type: 'Face', score: 88.5, color: 'bg-green-500' },
    { name: 'Sarah Williams', username: 'sarahw', time: '09:22', type: 'Face', score: 94.1, color: 'bg-orange-500' },
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-4 py-3 bg-black text-white">
        <div className="flex items-center gap-2 mb-1">
          <Users className="h-4 w-4" />
          <h2 className="text-sm font-semibold">Session Attendance</h2>
        </div>
        <p className="text-xs opacity-80">Database Systems - Hall A</p>
      </div>

      {/* Stats */}
      <div className="px-4 py-3 bg-gray-50 border-b">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500">Total Present</p>
            <p className="text-lg font-bold">{attendees.length}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Live Update</p>
            <div className="flex items-center gap-1 justify-end">
              <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
              <p className="text-xs font-medium">Active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance List */}
      <div className="flex-1 overflow-auto p-3 space-y-2">
        {attendees.map((attendee, index) => (
          <div key={index} className="flex items-center gap-3 p-2.5 bg-white border rounded-lg hover:bg-gray-50 transition-colors">
            {/* Avatar */}
            <div className={`w-9 h-9 rounded-full ${attendee.color} flex items-center justify-center text-white text-xs font-semibold flex-shrink-0`}>
              {getInitials(attendee.name)}
            </div>
            
            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate">{attendee.name}</p>
              <div className="flex items-center gap-2">
                <p className="text-[10px] text-gray-500">@{attendee.username}</p>
                <span className="text-[10px] text-gray-400">•</span>
                <p className="text-[10px] text-gray-500">{attendee.time}</p>
              </div>
            </div>

            {/* Verification Badge */}
            <div className="flex flex-col items-end gap-0.5">
              <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-medium ${
                attendee.type === 'Face' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-purple-100 text-purple-700'
              }`}>
                {attendee.type === 'Face' ? (
                  <CheckCircle className="h-2.5 w-2.5" />
                ) : (
                  <Fingerprint className="h-2.5 w-2.5" />
                )}
                {attendee.type}
              </span>
              <span className={`text-[10px] font-semibold ${
                attendee.score >= 90 ? 'text-green-600' : 'text-yellow-600'
              }`}>
                {attendee.score.toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
