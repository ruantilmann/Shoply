import ShoppingList from '../models/ShoppingList.js';
import Product from '../models/Product.js';
import ShoppingListItem from '../models/ShoppingListItem.js';

// Add an item to a shopping list
export const addItemToList = async (req, res) => {
    try {
        const { shoppingListId, productId } = req.params;
        const { quantity } = req.body;

        const shoppingList = await ShoppingList.findByPk(shoppingListId);
        if (!shoppingList) {
            return res.status(404).json({ error: 'Shopping list not found' });
        }

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const newItem = await ShoppingListItem.create({
            shopping_list_id: shoppingListId,
            product_id: productId,
            quantity
        });

        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an item in a shopping list
export const updateItemInList = async (req, res) => {
    try {
        const { shoppingListId, productId } = req.params;
        const { quantity } = req.body;

        const item = await ShoppingListItem.findOne({
            where: {
                shopping_list_id: shoppingListId,
                product_id: productId
            }
        });

        if (!item) {
            return res.status(404).json({ error: 'Item not found in the shopping list' });
        }

        item.quantity = quantity;
        await item.save();

        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Remove an item from a shopping list
export const removeItemFromList = async (req, res) => {
    try {
        const { shoppingListId, productId } = req.params;

        const result = await ShoppingListItem.destroy({
            where: {
                shopping_list_id: shoppingListId,
                product_id: productId
            }
        });

        if (result === 0) {
            return res.status(404).json({ error: 'Item not found in the shopping list' });
        }

        res.status(204).send(); // No content
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
