import React, { useState, ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
}

export function Tooltip({ children, content }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-10 w-64 p-2 mt-2 text-sm text-white bg-gray-800 rounded-lg shadow-lg">
          {content}
        </div>
      )}
    </div>
  );
}
