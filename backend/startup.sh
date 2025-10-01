#!/bin/bash

# Script de inicialização para garantir que todas as migrations sejam executadas

echo "Iniciando processo de migração..."

# Verificar se o banco de dados está acessível
echo "Verificando conexão com o banco de dados..."
npx sequelize-cli db:migrate:status

# Executar todas as migrations pendentes
echo "Executando migrations..."
npx sequelize-cli db:migrate --debug

# Verificar o status após a migração
echo "Verificando status após migração..."
npx sequelize-cli db:migrate:status

# Iniciar a aplicação
echo "Iniciando a aplicação..."
npm start