import React from 'react';

interface AnimationContainerProps {
  className?: string;
  children: React.ReactNode;
}

/**
 * A standardized container for strategy animations that ensures consistent
 * sizing and aspect ratio across all animation components.
 */
export const AnimationContainer = ({ 
  className = '', 
  children 
}: AnimationContainerProps) => {
  return (
    <div 
      className={`relative w-full overflow-hidden bg-black/20 rounded-lg ${className}`}
      style={{ aspectRatio: '2/1' }} // Enforce the 2:1 wide aspect ratio
    >
      {children}
    </div>
  );
};
