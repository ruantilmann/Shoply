import express from 'express';
import { createUser, getAllUsers, deleteUser, updateUser, login, getMe } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router()

/**
 * @swagger
 * /users/createUser:
 *   post:
 *     summary: Cria um novo usuário
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - age
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *               age:
 *                 type: integer
 *                 example: 30
 *               email:
 *                 type: string
 *                 example: joao.silva@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       '201':
 *         description: Usuário criado com sucesso
 *       '400':
 *         description: Erro de validação (ex. email já existe)
 *       '500':
 *         description: Erro interno do servidor
 */
router.post('/createUser', createUser)

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Autentica um usuário e retorna um token JWT
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: joao.silva@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       '200':
 *         description: Login bem-sucedido
 *       '401':
 *         description: Senha inválida
 *       '404':
 *         description: Usuário não encontrado
 *       '500':
 *         description: Erro interno do servidor
 */
router.post('/login', login)

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Retorna o usuário autenticado
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Retorna o usuário autenticado
 *       '401':
 *         description: Token não fornecido ou inválido
 *       '404':
 *         description: Usuário não encontrado
 *       '500':
 *         description: Erro interno do servidor
 */
router.get('/me', authMiddleware, getMe)

/**
 * @swagger
 * /users/allUsers:
 *   get:
 *     summary: Lista todos os usuários
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Retorna uma lista de usuários
 *       '401':
 *         description: Token não fornecido ou inválido
 *       '500':
 *         description: Erro interno do servidor
 */
router.get('/allUsers', authMiddleware, getAllUsers)

/**
 * @swagger
 * /users/deleteUser/{id}:
 *   delete:
 *     summary: Deleta um usuário pelo ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário a ser deletado
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Usuário deletado com sucesso
 *       '401':
 *         description: Token não fornecido ou inválido
 *       '500':
 *         description: Erro interno do servidor
 */
router.delete('/deleteUser/:id', authMiddleware, deleteUser)

/**
 * @swagger
 * /users/updateUser:
 *   put:
 *     summary: Atualiza um usuário pelo ID ou email
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         required: false
 *         description: ID do usuário a ser atualizado
 *         schema:
 *           type: string
 *       - name: email
 *         in: query
 *         required: false
 *         description: Email do usuário a ser atualizado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Usuário atualizado com sucesso
 *       '400':
 *         description: Erro de validação
 *       '401':
 *         description: Token não fornecido ou inválido
 *       '404':
 *         description: Usuário não encontrado
 *       '500':
 *         description: Erro interno do servidor
 */
router.put('/updateUser', authMiddleware, updateUser)

export default router