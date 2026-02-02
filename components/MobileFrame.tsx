import React from 'react';

interface MobileFrameProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative mx-auto ${className}`} style={{ width: '280px', height: '570px' }}>
      {/* Phone Frame */}
      <div className="absolute inset-0 rounded-[45px] border-[16px] border-black bg-black shadow-2xl">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-10"></div>
        
        {/* Screen */}
        <div className="relative w-full h-full rounded-[30px] bg-white overflow-hidden">
          {children}
        </div>
        
        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gray-300 rounded-full"></div>
      </div>
      
      {/* Volume Buttons */}
      <div className="absolute -left-1 top-24 w-1 h-6 bg-black rounded-l"></div>
      <div className="absolute -left-1 top-36 w-1 h-10 bg-black rounded-l"></div>
      
      {/* Power Button */}
      <div className="absolute -right-1 top-28 w-1 h-12 bg-black rounded-r"></div>
    </div>
  );
};
