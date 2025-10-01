import React, { useState } from 'react';
import { Plus, Package, ShoppingCart, Grid3X3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FloatingActionMenuProps {
  onAction: (action: string) => void;
}

interface MenuButton {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: string;
}

export const FloatingActionMenu: React.FC<FloatingActionMenuProps> = ({ onAction }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const menuButtons: MenuButton[] = [
    {
      id: 'items',
      label: 'ITENS',
      icon: <Package className="h-5 w-5" />,
      action: 'items',
    },
    {
      id: 'markets',
      label: 'MERCADOS',
      icon: <ShoppingCart className="h-5 w-5" />,
      action: 'markets',
    },
    {
      id: 'categories',
      label: 'CATEGORIAS',
      icon: <Grid3X3 className="h-5 w-5" />,
      action: 'categories',
    },
    {
      id: 'new-list',
      label: 'NOVA LISTA',
      icon: <List className="h-5 w-5" />,
      action: 'new-list',
    },
  ];

  const handleMainButtonClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMenuClick = (action: string) => {
    onAction(action);
    setIsExpanded(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Menu buttons */}
      <div className={`flex flex-col space-y-3 mb-4 transition-all duration-300 ${
        isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {menuButtons.map((button, index) => (
          <div
            key={button.id}
            className="flex items-center space-x-3 group"
            style={{
              transitionDelay: isExpanded ? `${index * 50}ms` : '0ms',
            }}
          >
            {/* Label */}
            <span className="bg-gray-800 text-white px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {button.label}
            </span>
            
            {/* Button */}
            <Button
              onClick={() => handleMenuClick(button.action)}
              className="w-14 h-14 rounded-full bg-green-400 hover:bg-green-500 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
              size="icon"
            >
              {button.icon}
            </Button>
          </div>
        ))}
      </div>

      {/* Main + button */}
      <Button
        onClick={handleMainButtonClick}
        className={`w-16 h-16 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 ${
          isExpanded ? 'rotate-45' : 'rotate-0'
        }`}
        size="icon"
      >
        <Plus className="h-8 w-8" />
      </Button>
    </div>
  );
};