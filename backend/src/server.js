import express from 'express'
import User from './models/User.js'
import Product from './models/Product.js'
import ShoppingList from './models/ShoppingList.js';
import ShoppingListItem from './models/ShoppingListItem.js';
import Sequelize from 'sequelize'
import config from './config/database.js'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import shoppingListRoutes from './routes/shoppingListRoutes.js'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './swagger.js'
import cors from 'cors'

const env = process.env.NODE_ENV || 'dev'

let envFile = `.env.${env}`;

dotenv.config({ path: envFile })

console.log(`🔧 Carregando configurações de ${envFile}`);

const app = express()
app.use(express.json())

const sequelize = new Sequelize(config)

const models = [User, Product, ShoppingList, ShoppingListItem];
models.forEach(model => model.init(sequelize));
models.forEach(model => model.associate && model.associate(sequelize.models));

app.use(cors()) // Permite requisições de qualquer origem
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/users', userRoutes)
app.use('/products', productRoutes)
app.use('/', shoppingListRoutes)

sequelize.authenticate().then(() => {
    console.log("BD Conectado!")
    app.listen(3000, () => {
        console.log('Servidor ON!')
    })
}).catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err)
})


