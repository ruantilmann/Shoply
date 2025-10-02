import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import api from '@/api/axiosConfig';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  ShoppingListItem?: {
    quantity: number;
  };
}

interface ShoppingList {
  id: string;
  name: string;
  products: Product[];
}

const ShoppingListDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [shoppingList, setShoppingList] = useState<ShoppingList | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddProductDialogOpen, setAddProductDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  useEffect(() => {
    const fetchShoppingList = async () => {
      try {
        const response = await api.get(`/lists/${id}`);
        if (response.status === 200) {
          setShoppingList(response.data);
        }
      } catch (error) {
        console.error('Error fetching shopping list:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar a lista de compras.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    const fetchAllProducts = async () => {
      try {
        const response = await api.get('/products/allProducts');
        if (response.status === 200) {
          setAllProducts(response.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchShoppingList();
    fetchAllProducts();
  }, [id, toast]);

  const handleAddProduct = async () => {
    if (!selectedProduct || quantity <= 0) {
      toast({
        title: 'Erro',
        description: 'Selecione um produto e informe a quantidade.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await api.post(`/lists/${id}/products/${selectedProduct}`,
        { quantity }
      );

      if (response.status === 201) {
        const updatedListResponse = await api.get(`/lists/${id}`);
        setShoppingList(updatedListResponse.data);
        toast({
          title: 'Sucesso',
          description: 'Produto adicionado à lista.',
        });
        setAddProductDialogOpen(false);
        setSelectedProduct('');
        setQuantity(1);
      }
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível adicionar o produto.',
        variant: 'destructive',
      });
    }
  };

  const handleRemoveProduct = async (productId: string) => {
    try {
      const response = await api.delete(`/lists/${id}/products/${productId}`);
      if (response.status === 204) {
        const updatedListResponse = await api.get(`/lists/${id}`);
        setShoppingList(updatedListResponse.data);
        toast({
          title: 'Sucesso',
          description: 'Produto removido da lista.',
        });
      }
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível remover o produto.',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!shoppingList) {
    return <div>Lista de compras não encontrada.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{shoppingList.name}</h1>
      <Button onClick={() => setAddProductDialogOpen(true)}>Adicionar Produto</Button>

      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shoppingList.products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.ShoppingListItem?.quantity}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>
                <Button variant="destructive" size="sm" onClick={() => handleRemoveProduct(product.id)}>
                  Remover
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isAddProductDialogOpen} onOpenChange={setAddProductDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Produto à Lista</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="" disabled>Selecione um produto</option>
              {allProducts.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
            <Input
              type="number"
              placeholder="Quantidade"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
              min={1}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleAddProduct}>Adicionar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShoppingListDetails;