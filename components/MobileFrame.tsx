import React from 'react';

interface MobileFrameProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative mx-auto ${className}`} style={{ width: '320px', height: '640px' }}>
      {/* Android Phone Frame with Premium Design */}
      <div className="absolute inset-0 rounded-[60px] border-[12px] border-gray-900 bg-gray-900 shadow-2xl"
        style={{
          boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
        }}>
        
        {/* Camera Notch - Android Style Punch Hole */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-gray-900 rounded-full z-10 border-2 border-gray-800"></div>
        
        {/* Screen */}
        <div className="relative w-full h-full rounded-[48px] bg-white overflow-hidden flex flex-col"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
          }}>
          {/* Status Bar */}
          <div className="h-6 bg-black flex items-center justify-between px-6 text-white text-xs font-semibold flex-shrink-0">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-hidden flex flex-col">
            {children}
          </div>
        </div>
        
        {/* Navigation Buttons - Android Bottom */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-8 px-6 z-20">
          <div className="h-1 w-8 bg-gray-600 rounded-full opacity-40 hover:opacity-60 transition-opacity"></div>
        </div>
      </div>
      
      {/* Side Buttons - Android Style */}
      <div className="absolute -left-2 top-20 w-1.5 h-12 bg-gradient-to-b from-gray-700 to-gray-800 rounded-l-lg shadow-lg"></div>
      <div className="absolute -left-2 top-36 w-1.5 h-16 bg-gradient-to-b from-gray-700 to-gray-800 rounded-l-lg shadow-lg"></div>
      
      {/* Power Button - Right Side */}
      <div className="absolute -right-2 top-32 w-1.5 h-14 bg-gradient-to-b from-blue-600 to-blue-700 rounded-r-lg shadow-lg"></div>
    </div>
  );
};
