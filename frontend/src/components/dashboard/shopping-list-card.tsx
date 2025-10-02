import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ShoppingList {
  id: string;
  user_id: string;
  name: string;
  completed_items: number;
  total_items: number;
  created_at: Date;
  updated_at: Date;
}

interface ShoppingListCardProps {
  list: ShoppingList;
  onClick: () => void;
}

export const ShoppingListCard: React.FC<ShoppingListCardProps> = ({ list, onClick }) => {
  const progressPercentage = list.total_items > 0 ? (list.completed_items / list.total_items) * 100 : 0;

  return (
    <Card
      className="p-6 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105 bg-gray-100 border-none"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-800 tracking-wide">
          {list.name}
        </h3>
        <span className="text-gray-600 font-medium text-sm">
          {list.completed_items}/{list.total_items}
        </span>
      </div>
      
      {/* Progress bar */}
      <div className="space-y-2">
        <Progress 
          value={progressPercentage} 
          className="h-2 bg-gray-200"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>{progressPercentage.toFixed(0)}% concluído</span>
          <span>{list.total_items - list.completed_items} itens restantes</span>
        </div>
      </div>
    </Card>
  );
};