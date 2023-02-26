# Define la imagen base a utilizar
FROM node:16.13.0-alpine3.14

# Crea y establece el directorio de trabajo de la aplicación dentro del contenedor
WORKDIR /app

# Copia los archivos de la aplicación (package.json y package-lock.json)
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia los archivos de la aplicación al contenedor
COPY . .

# Compila la aplicación
RUN npm run build

# Expone el puerto 3000 del contenedor
EXPOSE 3000

# Define el comando a ejecutar cuando se inicie el contenedor
CMD ["npm", "start"]
