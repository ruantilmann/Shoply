import React, { useState, useEffect } from 'react';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { ShoppingListCard } from '@/components/dashboard/shopping-list-card';
import { FloatingActionMenu } from '@/components/dashboard/floating-action-menu';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import api from '@/api/axiosConfig';

interface ShoppingList {
  id: string;
  user_id: string;
  name: string;
  completed_items: number;
  total_items: number;
  created_at: Date;
  updated_at: Date;
}

const Dashboard = () => {
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('USUÁRIO');
  const [isCreateListDialogOpen, setCreateListDialogOpen] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [isCreateProductDialogOpen, setCreateProductDialogOpen] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductDescription, setNewProductDescription] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          setUserName(user.name || user.email?.split('@')[0] || 'USUÁRIO');
        }

        const response = await api.get('/lists');
        if (response.status === 200) {
          setShoppingLists(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar as listas',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [toast]);

  const handleListClick = (listId: string) => {
    navigate(`/lists/${listId}`);
  };

  const handleMenuAction = (action: string) => {
    if (action === 'new-list') {
      setCreateListDialogOpen(true);
    } else if (action === 'items') {
      setCreateProductDialogOpen(true);
    } else {
      console.log('Menu action:', action);
    }
  };

  const handleCreateList = async () => {
    if (!newListName.trim()) {
      toast({
        title: 'Erro',
        description: 'O nome da lista não pode estar vazio.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await api.post('/lists', { name: newListName });
      if (response.status === 201) {
        setShoppingLists([...shoppingLists, response.data]);
        toast({
          title: 'Sucesso',
          description: 'Lista de compras criada.',
        });
        setNewListName('');
        setCreateListDialogOpen(false);
      }
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível criar a lista de compras.',
        variant: 'destructive',
      });
    }
  };

  const handleCreateProduct = async () => {
    if (!newProductName.trim() || !newProductPrice.trim()) {
      toast({
        title: 'Erro',
        description: 'Nome e preço do produto são obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await api.post('/products/createProduct', {
        name: newProductName,
        price: parseFloat(newProductPrice),
        description: newProductDescription,
      });

      if (response.status === 201) {
        toast({
          title: 'Sucesso',
          description: 'Produto criado com sucesso.',
        });
        setNewProductName('');
        setNewProductPrice('');
        setNewProductDescription('');
        setCreateProductDialogOpen(false);
      }
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível criar o produto.',
        variant: 'destructive',
      });
    }
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

      <Dialog open={isCreateListDialogOpen} onOpenChange={setCreateListDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Nova Lista de Compras</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Nome da lista"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleCreateList}>Criar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isCreateProductDialogOpen} onOpenChange={setCreateProductDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Novo Produto</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <Input
              placeholder="Nome do produto"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
            />
            <Input
              placeholder="Preço"
              type="number"
              value={newProductPrice}
              onChange={(e) => setNewProductPrice(e.target.value)}
            />
            <Input
              placeholder="Descrição (opcional)"
              value={newProductDescription}
              onChange={(e) => setNewProductDescription(e.target.value)}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleCreateProduct}>Criar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;