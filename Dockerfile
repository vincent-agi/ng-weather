# Stage 1: Build Angular application
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY . .
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN npm install
RUN npm run build

# Étape de création de l'image nginx pour servir l'application Angular construite
FROM nginx:alpine

# Supprimez la page d'accueil par défaut de nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiez les fichiers de l'application Angular construite dans le répertoire nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiez les fichiers d'assets dans le répertoire de destination
COPY --from=builder /app/dist/assets /usr/share/nginx/html/assets

# Configuration personnalisée de nginx pour rediriger toutes les requêtes vers index.html
COPY .host/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]