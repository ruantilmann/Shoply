# Shoply - Gerenciador de Listas de Compras

**Este é um projeto pessoal desenvolvido para fins de estudo. A API e o frontend ainda estão em desenvolvimento e novas funcionalidades estão sendo implementadas.**

Este é um projeto de um sistema de CRUD (Create, Read, Update, Delete) para gerenciar usuários, produtos e listas de compras, com um frontend para interação.

## Tecnologias Utilizadas

### Backend
*   **Backend:** Node.js com Express.js
*   **Banco de Dados:** PostgreSQL com Sequelize ORM
*   **Containerização:** Docker
*   **Documentação da API:** Swagger

### Frontend
*   **Framework:** React com Vite
*   **Linguagem:** TypeScript
*   **Estilização:** Tailwind CSS e shadcn/ui
*   **Requisições HTTP:** Axios
*   **Roteamento:** React Router DOM

## Começando

Siga as instruções abaixo para configurar e executar o projeto em seu ambiente local.

### Pré-requisitos

*   [Node.js](https://nodejs.org/) (versão 22.19.0 ou superior)
*   [Docker](https://www.docker.com/get-started)

### Instalação

#### Backend

1.  Navegue até o diretório do backend:

    ```bash
    cd backend
    ```

2.  Instale as dependências do Node.js:

    ```bash
    npm install
    ```

3.  Crie os arquivos de ambiente `.env.dev` e `.env.prod` na raiz do diretório do backend, baseando-se no `.env.example`.

#### Frontend

1.  Navegue até o diretório do frontend:

    ```bash
    cd frontend
    ```

2.  Instale as dependências:

    ```bash
    npm install
    ```

## Uso

### Executando a Aplicação

#### Backend com Docker

Para iniciar a aplicação com Docker, execute o seguinte comando na raiz do diretório `backend`:

```bash
docker-compose up
```

A aplicação estará disponível em `http://localhost:3000`.

#### Backend sem Docker

Para iniciar a aplicação em modo de desenvolvimento, execute na raiz do `backend`:

```bash
npm run start:dev
```

Para iniciar a aplicação em modo de produção, execute:

```bash
npm run start:prod
```

#### Frontend

Para iniciar o ambiente de desenvolvimento do frontend, execute o seguinte comando na raiz do diretório `frontend`:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

### Endpoints da API

A API possui os seguintes endpoints:

*   **Users:**
    *   `POST /users/createUser`: Cria um novo usuário.
    *   `GET /users/allUsers`: Lista todos os usuários.
    *   `DELETE /users/deleteUser/:id`: Deleta um usuário pelo ID.
    *   `PUT /users/updateUser`: Atualiza um usuário.
*   **Products:**
    *   `POST /products/createProduct`: Cria um novo produto.
    *   `GET /products/allProducts`: Lista todos os produtos.
    *   `DELETE /products/deleteProduct/:id`: Deleta um produto pelo ID.
*   **Shopping Lists:**
    *   `POST /users/:userId/lists`: Cria uma nova lista de compras para um usuário.
    *   `GET /users/:userId/lists`: Lista todas as listas de compras de um usuário.
    *   `POST /lists/:shoppingListId/products/:productId`: Adiciona um produto a uma lista de compras.
    *   `PUT /lists/:shoppingListId/products/:productId`: Atualiza um item em uma lista de compras.
    *   `DELETE /lists/:shoppingListId/products/:productId`: Remove um item de uma lista de compras.

## Documentação da API

A documentação completa da API está disponível com Swagger. Após iniciar a aplicação backend, acesse a seguinte URL em seu navegador:

[http://localhost:3000/doc](http://localhost:3000/doc)

## Banco de Dados

O projeto utiliza o Sequelize para gerenciar as migrações do banco de dados. Para executar as migrações, utilize o seguinte comando no diretório `backend`:

```bash
npm run migrate
```
