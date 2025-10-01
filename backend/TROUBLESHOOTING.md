# Troubleshooting - Tabelas não criadas

## Verificação de migrations

1. Verifique o status das migrations:
   ```bash
   npx sequelize-cli db:migrate:status
   ```

2. Se as migrations aparecerem como "pending", execute:
   ```bash
   npx sequelize-cli db:migrate
   ```

3. Para verificar quais tabelas existem no banco:
   ```bash
   npm run check-tables
   ```

## Problemas comuns e soluções

### 1. Conflitos de migrations
Se você encontrar erros relacionados a migrations já aplicadas:
```bash
# Verificar migrations no banco
npx sequelize-cli db:migrate:status

# Resetar todas as migrations (CUIDADO: isso apagará os dados)
npx sequelize-cli db:migrate:undo:all

# Reaplicar todas as migrations
npx sequelize-cli db:migrate
```

### 2. Problemas de conexão com o banco
Verifique se as variáveis de ambiente estão corretas:
- DB_HOST
- DB_USER
- DB_PASS
- DB_NAME
- DB_PORT

### 3. Erros específicos na migration de produtos
Se apenas a tabela de produtos não está sendo criada, pode ser um problema com a migration específica:

1. Execute apenas a migration de produtos:
   ```bash
   npx sequelize-cli db:migrate --name 20250915015432-create-products-table.js
   ```

2. Ou force a execução de todas as migrations com debug:
   ```bash
   npx sequelize-cli db:migrate --debug
   ```

## Verificação pós-correção

Após aplicar as correções:
1. Verifique novamente o status das migrations
2. Confirme que ambas as tabelas existem
3. Reinicie a aplicação