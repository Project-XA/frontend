import React from 'react';

interface MobileFrameProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative mx-auto ${className}`} style={{ width: '260px', height: '520px' }}>
      {/* Android Phone Frame - Minimal Black and White */}
      <div className="absolute inset-0 rounded-[40px] border-8 border-black bg-black shadow-lg">
        

        {/* Screen */}
        <div className="relative w-full h-full rounded-[32px] bg-white overflow-hidden flex flex-col">
          {/* Content */}
          <div className="flex-1 overflow-auto flex flex-col">
            {children}
          </div>
        </div>
      </div>
      
      {/* Side Button */}
      <div className="absolute -right-1 top-24 w-1 h-10 bg-black rounded-r"></div>
    </div>
  );
};
