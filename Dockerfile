FROM node:15.12.0

WORKDIR /app

COPY . .
COPY package*.json ./
RUN npm install --force

CMD ["npm", "run", "dev", "--", "--host"]

EXPOSE 8080