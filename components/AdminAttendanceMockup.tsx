import React, { useState } from 'react';
import { Users, CheckCircle, Fingerprint, Eye, EyeOff } from 'lucide-react';

export const AdminAttendanceMockup: React.FC = () => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const attendees = [
    { name: 'John Doe', username: 'johnd', time: '09:15', type: 'Face', score: 95.2, color: 'from-blue-500 to-blue-600' },
    { name: 'Jane Smith', username: 'janes', time: '09:17', type: 'Fingerprint', score: 92.8, color: 'from-purple-500 to-purple-600' },
    { name: 'Mike Johnson', username: 'mikej', time: '09:20', type: 'Face', score: 88.5, color: 'from-green-500 to-green-600' },
    { name: 'Sarah Williams', username: 'sarahw', time: '09:22', type: 'Face', score: 94.1, color: 'from-orange-500 to-orange-600' },
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="px-4 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-b-3xl shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <Users className="h-4 w-4" />
          <h2 className="text-sm font-semibold">Session Attendance</h2>
        </div>
        <p className="text-xs opacity-90">Database Systems - Hall A</p>
      </div>

      {/* Stats Cards */}
      <div className="px-4 py-4 space-y-2">
        <div className="flex gap-2">
          <div className="flex-1 bg-white rounded-2xl p-3 border border-purple-100 shadow-sm">
            <p className="text-xs text-gray-600 font-semibold">Total Present</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-purple-600">{attendees.length}</p>
              <p className="text-xs text-gray-500">/ 30</p>
            </div>
          </div>
          <div className="flex-1 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-3 border border-green-200 shadow-sm">
            <p className="text-xs text-green-700 font-semibold">Status</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
              <p className="text-xs font-semibold text-green-700">Live</p>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance List */}
      <div className="flex-1 overflow-auto px-4 py-2 space-y-2">
        {attendees.map((attendee, index) => {
          const isExpanded = expandedRow === index;
          return (
            <div 
              key={index}
              onClick={() => setExpandedRow(isExpanded ? null : index)}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {/* Main Row */}
              <div className="flex items-center gap-3 p-3">
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${attendee.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-md`}>
                  {getInitials(attendee.name)}
                </div>
                
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900 truncate">{attendee.name}</p>
                  <p className="text-[10px] text-gray-500">@{attendee.username} • {attendee.time}</p>
                </div>

                {/* Score Badge */}
                <div className={`text-right flex-shrink-0 px-2.5 py-1.5 rounded-full font-bold text-[10px] ${
                  attendee.score >= 90 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {attendee.score.toFixed(1)}%
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="px-3 pb-3 pt-0 border-t border-gray-100 bg-gradient-to-b from-transparent to-gray-50 animate-in fade-in duration-200">
                  <div className="space-y-2 mt-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {attendee.type === 'Face' ? (
                          <Eye className="h-3.5 w-3.5 text-blue-600" />
                        ) : (
                          <Fingerprint className="h-3.5 w-3.5 text-purple-600" />
                        )}
                        <span className={`text-[10px] font-semibold ${
                          attendee.type === 'Face' 
                            ? 'text-blue-700' 
                            : 'text-purple-700'
                        }`}>
                          {attendee.type} Verification
                        </span>
                      </div>
                      <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                    </div>
                    <div className="text-[9px] text-gray-600">
                      <p>Confidence: <span className="font-semibold text-gray-800">{attendee.score}%</span></p>
                      <p>Verified at <span className="font-semibold text-gray-800">{attendee.time}</span></p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Stats */}
      <div className="px-4 py-3 border-t border-gray-200 bg-white text-center">
        <p className="text-[10px] text-gray-500 font-semibold">
          Last updated: Just now
        </p>
      </div>
    </div>
  );
};
