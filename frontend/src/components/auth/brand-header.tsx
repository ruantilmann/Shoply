import React from 'react';
import { ShoppingBagIcon } from '@/components/ui/shopping-bag-icon';

export const BrandHeader: React.FC = () => {
  return (
    <header className="text-center space-y-4 mb-12 animate-fade-in">
      <div className="flex items-center justify-center space-x-4 hover:scale-105 transition-transform duration-300">
        <ShoppingBagIcon
          className="text-brand-primary" 
          size={72}
        />
        <h1 className="brand-title">
          ListaJá
        </h1>
      </div>
      
      <p className="brand-tagline">
        Sua lista de compras, sem stress e sem esquecer nada!
      </p>
    </header>
  );
};

export default BrandHeader;