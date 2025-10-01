import React from 'react';

export const GeometricShapes: React.FC = () => {
  return (
    <>
      {/* Desktop decorative shapes - matching reference image */}
      <div className="hidden lg:block">
        {/* Left side green shapes */}
        <div className="absolute left-0 bottom-32 w-40 h-32 bg-brand-primary-dark rounded-r-3xl opacity-90"></div>
        <div className="absolute left-0 bottom-64 w-24 h-24 bg-brand-secondary rounded-r-2xl opacity-70"></div>
        
        {/* Right side vertical green shapes - like in reference */}
        <div className="absolute right-0 top-1/4 w-32 h-48 bg-brand-primary-dark rounded-l-3xl opacity-90"></div>
        <div className="absolute right-0 top-1/2 w-20 h-32 bg-brand-secondary rounded-l-2xl opacity-70"></div>
        <div className="absolute right-0 bottom-40 w-16 h-80 bg-brand-primary-dark rounded-l-2xl opacity-85"></div>
        <div className="absolute right-0 bottom-20 w-24 h-16 bg-brand-secondary rounded-l-xl opacity-60"></div>
        
        {/* Additional small shapes for depth */}
        <div className="absolute right-12 bottom-72 w-12 h-48 bg-brand-primary-dark rounded-l-xl opacity-50"></div>
        <div className="absolute right-6 bottom-96 w-8 h-32 bg-brand-secondary rounded-l-lg opacity-40"></div>
        
        {/* Orange decorative circle */}
        <div className="absolute right-8 bottom-8 w-28 h-28 bg-brand-orange rounded-full opacity-95 animate-pulse"></div>
      </div>

      {/* Mobile subtle shapes */}
      <div className="block lg:hidden">
        <div className="absolute right-4 bottom-4 w-16 h-16 bg-brand-orange rounded-full opacity-80"></div>
        <div className="absolute left-4 top-20 w-8 h-20 bg-brand-primary opacity-30 rounded-r-xl"></div>
      </div>
    </>
  );
};

export default GeometricShapes;