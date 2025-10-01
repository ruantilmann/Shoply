FROM node:22.19.0

WORKDIR /app

# Copiar package.json e package-lock.json primeiro para aproveitar o cache do Docker
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Copiar todos os arquivos da aplicação
COPY . .

ARG NODE_ENV=prod

ENV NODE_ENV=$NODE_ENV

EXPOSE 3000

CMD ["./startup.sh"]