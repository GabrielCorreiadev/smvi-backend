# Etapa de build
FROM node:18 AS build
WORKDIR /app

# Copia tudo antes
COPY . .

# Instala o TypeScript globalmente
RUN npm install -g typescript

# Instala dependências do projeto
RUN npm install

# Compila diretamente com o tsc global (sem usar "npm run build")
RUN tsc

# Etapa de produção
FROM node:18
WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3001
CMD ["node", "dist/index.js"]
