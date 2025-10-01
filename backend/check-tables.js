'use strict';

import { Sequelize } from 'sequelize';
import config from './src/config/database.js';

async function checkTables() {
  const sequelize = new Sequelize(config);

  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    // Verificar se a tabela de usuários existe
    const usersTableExists = await sequelize.getQueryInterface().showAllTables().then(tables => tables.includes('users'));
    console.log('Tabela de usuários existe:', usersTableExists);

    // Verificar se a tabela de produtos existe
    const productsTableExists = await sequelize.getQueryInterface().showAllTables().then(tables => tables.includes('products'));
    console.log('Tabela de produtos existe:', productsTableExists);

    // Listar todas as tabelas
    const allTables = await sequelize.getQueryInterface().showAllTables();
    console.log('Todas as tabelas no banco de dados:', allTables);

    await sequelize.close();
  } catch (error) {
    console.error('Erro ao verificar tabelas:', error);
  }
}

checkTables();