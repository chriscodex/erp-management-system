# Imagen de Node.js
FROM node:20.18.0

# Directorio de trabajo
WORKDIR /app

# Copiar el package.json y el yarn.lock
COPY package.json yarn.lock ./

# Instalar dependencias
RUN yarn install

# Copiar el código fuente
COPY . .

# Construir la aplicación
#RUN yarn build

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["yarn", "dev"]