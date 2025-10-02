import ShoppingList from '../models/ShoppingList.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import crypto from 'node:crypto';

// Create a new shopping list for a user
export const createList = async (req, res) => {
    try {
        const { name } = req.body;

        const newList = await ShoppingList.create({
            id: crypto.randomUUID(),
            name,
            user_id: req.userId
        });

        res.status(201).json(newList);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all shopping lists for a specific user
export const getListsForUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.userId, {
            include: {
                model: ShoppingList,
                as: 'shopping_lists',
                include: {
                    model: Product,
                    as: 'products',
                    through: { attributes: ['quantity'] } // Include quantity from the join table
                }
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user.shopping_lists);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getListById = async (req, res) => {
    try {
        const { id } = req.params;
        const shoppingList = await ShoppingList.findByPk(id, {
            include: {
                model: Product,
                as: 'products',
                through: { attributes: ['quantity'] } // Include quantity from the join table
            }
        });

        if (!shoppingList) {
            return res.status(404).json({ error: 'Shopping list not found' });
        }

        res.status(200).json(shoppingList);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};