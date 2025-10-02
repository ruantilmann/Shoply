import express from 'express';
import { createList, getListsForUser, getListById } from '../controllers/shoppingListController.js';
import { addItemToList, updateItemInList, removeItemFromList } from '../controllers/ShoppingListItemController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router()

/**
 * @swagger
 * /lists:
 *   post:
 *     summary: Cria uma nova lista de compras para o usuário autenticado
 *     tags:
 *       - Shopping Lists
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Lista de Compras de Segunda
 *     responses:
 *       '201':
 *         description: Lista de compras criada com sucesso
 *       '401':
 *         description: Token não fornecido ou inválido
 *       '500':
 *         description: Erro interno do servidor
 *   get:
 *     summary: Lista todas as listas de compras do usuário autenticado
 *     tags:
 *       - Shopping Lists
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Retorna uma lista de listas de compras
 *       '401':
 *         description: Token não fornecido ou inválido
 *       '500':
 *         description: Erro interno do servidor
 */
router.route('/lists')
    .post(authMiddleware, createList)
    .get(authMiddleware, getListsForUser);

router.route('/lists/:id').get(authMiddleware, getListById);

/**
 * @swagger
 * /lists/{shoppingListId}/products/{productId}:
 *   post:
 *     summary: Adiciona um produto a uma lista de compras
 *     tags:
 *       - Shopping Lists
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: shoppingListId
 *         in: path
 *         required: true
 *         description: ID da lista de compras
 *         schema:
 *           type: string
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID do produto
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       '201':
 *         description: Produto adicionado à lista com sucesso
 *       '401':
 *         description: Token não fornecido ou inválido
 *       '500':
 *         description: Erro interno do servidor
 *   put:
 *     summary: Atualiza um item em uma lista de compras
 *     tags:
 *       - Shopping Lists
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: shoppingListId
 *         in: path
 *         required: true
 *         description: ID da lista de compras
 *         schema:
 *           type: string
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID do produto
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       '200':
 *         description: Item atualizado com sucesso
 *       '401':
 *         description: Token não fornecido ou inválido
 *       '500':
 *         description: Erro interno do servidor
 *   delete:
 *     summary: Remove um item de uma lista de compras
 *     tags:
 *       - Shopping Lists
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: shoppingListId
 *         in: path
 *         required: true
 *         description: ID da lista de compras
 *         schema:
 *           type: string
 *       - name: productId
 *         in: path
 *         required: true
 *         description: ID do produto
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Item removido com sucesso
 *       '401':
 *         description: Token não fornecido ou inválido
 *       '500':
 *         description: Erro interno do servidor
 */
router.route('/lists/:shoppingListId/products/:productId')
    .post(authMiddleware, addItemToList)
    .put(authMiddleware, updateItemInList)
    .delete(authMiddleware, removeItemFromList);

export default router;