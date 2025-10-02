# --- Estágio de Build ---
# Usa uma imagem base Alpine para um tamanho menor
FROM node:22-alpine AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de manifesto de pacote
COPY package*.json ./

# Instala todas as dependências (incluindo as necessárias para o startup.sh)
RUN npm ci

# Copia o restante do código-fonte da aplicação
COPY . .


# --- Estágio de Produção ---
# Começa de uma imagem Alpine limpa para a imagem final
FROM node:22-alpine

# Define o diretório de trabalho
WORKDIR /app

# Cria um usuário não-root para segurança
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown appuser:appgroup /app

# Copia os artefatos do estágio de build
# Copia package.json para que o npm possa encontrar os scripts
COPY --from=builder /app/package*.json ./
# Copia as dependências de produção instaladas
COPY --from=builder /app/node_modules ./node_modules
# Copia o código-fonte da aplicação
COPY --from=builder /app/src ./src
# Copia os scripts e arquivos de configuração necessários
COPY --from=builder /app/.sequelizerc ./.sequelizerc
COPY --from=builder /app/check-tables.js ./check-tables.js
COPY --from=builder /app/startup.sh ./startup.sh
COPY --from=builder /app/src/config ./src/config
COPY --from=builder /app/src/database ./src/database

# Garante que o novo usuário seja o dono dos arquivos
RUN chown -R appuser:appgroup .

# Muda para o usuário não-root
USER appuser

# Expõe a porta da aplicação
EXPOSE 3000

# Adiciona uma verificação de saúde
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget -q --spider http://localhost:3000/ || exit 1

# Comando para iniciar a aplicação
# Garante que o script seja executável
RUN chmod +x ./startup.sh
CMD ["./startup.sh"]