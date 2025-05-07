# Etapa de build
FROM node:18 AS build
WORKDIR /app
COPY . .

# Garante que typescript está disponível globalmente
RUN npm install -g typescript

RUN npm install
RUN npm run build

# Etapa de produção
FROM node:18
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3001
CMD ["node", "dist/index.js"]
