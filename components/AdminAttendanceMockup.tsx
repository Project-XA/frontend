import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

export const AdminAttendanceMockup: React.FC = () => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const attendees = [
    { name: 'John Doe', time: '09:15', score: 95 },
    { name: 'Jane Smith', time: '09:17', score: 93 },
    { name: 'Mike Johnson', time: '09:20', score: 89 },
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-3 py-2 bg-black text-white border-b text-center">
        <h2 className="text-xs font-bold">Attendance List</h2>
      </div>

      {/* Stats */}
      <div className="px-3 py-2 border-b text-center text-xs">
        <p className="text-gray-600 text-[10px]">Present / Total</p>
        <p className="font-bold text-lg">{attendees.length} / 30</p>
      </div>

      {/* Attendance List */}
      <div className="flex-1 overflow-auto px-2 py-2 space-y-1">
        {attendees.map((attendee, index) => {
          const isExpanded = expandedRow === index;
          return (
            <div 
              key={index}
              onClick={() => setExpandedRow(isExpanded ? null : index)}
              className="border border-gray-300 rounded cursor-pointer hover:bg-gray-50 transition-colors"
            >
              {/* Main Row */}
              <div className="flex items-center gap-2 p-2">
                {/* Avatar */}
                <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                  {getInitials(attendee.name)}
                </div>
                
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-gray-900 truncate">{attendee.name}</p>
                  <p className="text-[9px] text-gray-500">{attendee.time}</p>
                </div>

                {/* Score Badge */}
                <div className="flex-shrink-0 px-1.5 py-0.5 rounded border border-black bg-white font-bold text-[9px]">
                  {attendee.score}%
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="px-2 pb-2 border-t border-gray-300 bg-gray-50 text-[9px]">
                  <p className="flex items-center gap-1 mt-1">
                    <CheckCircle className="h-3 w-3" />
                    Verified
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-3 py-2 border-t text-center text-[9px] text-gray-600">
        Live
      </div>
    </div>
  );
};
