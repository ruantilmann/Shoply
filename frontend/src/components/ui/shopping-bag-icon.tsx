import React from 'react';

interface ShoppingBagIconProps {
  className?: string;
  size?: number;
}

export const ShoppingBagIcon: React.FC<ShoppingBagIconProps> = ({ 
  className = "", 
  size = 64 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Shopping bag body */}
      <rect
        x="12"
        y="20"
        width="40"
        height="36"
        rx="8"
        ry="8"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
      />
      
      {/* Shopping bag handles */}
      <path
        d="M20 20V16C20 11.5817 23.5817 8 28 8H36C40.4183 8 44 11.5817 44 16V20"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      
      {/* Checkmark */}
      <path
        d="M24 34L28 38L40 26"
        stroke="white"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Shopping list lines */}
      <rect x="18" y="28" width="8" height="2" rx="1" fill="rgba(255,255,255,0.3)" />
      <rect x="18" y="32" width="6" height="2" rx="1" fill="rgba(255,255,255,0.3)" />
      <rect x="18" y="44" width="10" height="2" rx="1" fill="rgba(255,255,255,0.3)" />
      <rect x="18" y="48" width="8" height="2" rx="1" fill="rgba(255,255,255,0.3)" />
    </svg>
  );
};

export default ShoppingBagIcon;