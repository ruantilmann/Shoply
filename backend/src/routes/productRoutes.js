import express from 'express';
import { createProduct, getAllProducts, deleteProduct } from '../controllers/productController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router()

/**
 * @swagger
 * /products/createProduct:
 *   post:
 *     summary: Cria um novo produto
 *     tags:
 *       - Products
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
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: Arroz
 *               price:
 *                 type: number
 *                 example: 5.99
 *     responses:
 *       '201':
 *         description: Produto criado com sucesso
 *       '401':
 *         description: Token não fornecido ou inválido
 *       '500':
 *         description: Erro interno do servidor
 */
router.post('/createProduct', authMiddleware, createProduct)

/**
 * @swagger
 * /products/allProducts:
 *   get:
 *     summary: Lista todos os produtos
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Retorna uma lista de produtos
 *       '401':
 *         description: Token não fornecido ou inválido
 *       '500':
 *         description: Erro interno do servidor
 */
router.get('/allProducts', authMiddleware, getAllProducts)

/**
 * @swagger
 * /products/deleteProduct/{id}:
 *   delete:
 *     summary: Deleta um produto pelo ID
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do produto a ser deletado
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Produto deletado com sucesso
 *       '401':
 *         description: Token não fornecido ou inválido
 *       '500':
 *         description: Erro interno do servidor
 */
router.delete('/deleteProduct/:id', authMiddleware, deleteProduct)

export default router