FROM node:15.12.0

WORKDIR /app

COPY package*.json ./
RUN npm install --force
COPY . .

CMD ["npm", "run", "dev"]

EXPOSE 8080