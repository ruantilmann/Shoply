import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { ShoppingListCard } from '@/components/dashboard/shopping-list-card';
import { FloatingActionMenu } from '@/components/dashboard/floating-action-menu';
import { useToast } from '@/hooks/use-toast';

import api from '@/api/axiosConfig';

interface ShoppingList {
  id: string;
  user_id: string;
  title: string;
  completed_items: number;
  total_items: number;
  created_at: Date;
  updated_at: Date;
}

const Dashboard = () => {
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('USUÁRIO');
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get user data from localStorage or API
        const userData = localStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          setUserName(user.name || user.email?.split('@')[0] || 'USUÁRIO');
        }

        // Fetch shopping lists from API using axios
        const response = await api.get('/lists');

        if (response.status === 200) {
          setShoppingLists(response.data);
        } else {
          // Mock data for development
          setShoppingLists([
            {
              id: '1',
              user_id: '1',
              title: 'COMPRA HORTIFRUTI',
              completed_items: 1,
              total_items: 18,
              created_at: new Date(),
              updated_at: new Date(),
            },
            {
              id: '2',
              user_id: '1',
              title: 'JANTAR TERÇA',
              completed_items: 3,
              total_items: 7,
              created_at: new Date(),
              updated_at: new Date(),
            },
          ]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar as listas",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [toast]);

  const handleListClick = (listId: string) => {
    // Navigate to list details
    console.log('Navigate to list:', listId);
  };

  const handleMenuAction = (action: string) => {
    // Handle floating menu actions
    console.log('Menu action:', action);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader userName={userName} />
      
      <main className="container mx-auto px-4 py-6 pb-24">
        {shoppingLists.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              Nenhuma lista encontrada
            </h3>
            <p className="text-gray-500">
              Comece criando sua primeira lista de compras
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {shoppingLists.map((list) => (
              <ShoppingListCard
                key={list.id}
                list={list}
                onClick={() => handleListClick(list.id)}
              />
            ))}
          </div>
        )}
      </main>

      <FloatingActionMenu onAction={handleMenuAction} />
    </div>
  );
};

export default Dashboard;