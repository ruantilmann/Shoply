import React, { useState } from 'react';
import { User, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import shoppingBagImage from '@/assets/shopping-bag-3d.png';

interface DashboardHeaderProps {
  userName: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const handleProfile = () => {
    console.log('Navigate to profile');
  };

  const handleSettings = () => {
    console.log('Navigate to settings');
  };

  return (
    <header className="bg-slate-700 px-4 py-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-1/4 w-2 h-2 bg-white rounded-full"></div>
        <div className="absolute top-12 right-1/3 w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute bottom-6 left-1/2 w-1.5 h-1.5 bg-white rounded-full"></div>
      </div>

      <div className="container mx-auto flex items-center justify-between relative z-10">
        {/* Shopping bag illustration and greeting */}
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 flex-shrink-0">
            <img
              src={shoppingBagImage}
              alt="Sacola de compras 3D"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-white text-2xl font-bold tracking-wide">
              OLÁ, {userName.toUpperCase()}
            </h1>
          </div>
        </div>

        {/* Profile menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 rounded-full w-12 h-12"
            >
              <User className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={handleProfile} className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Perfil
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSettings} className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Configurações
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};