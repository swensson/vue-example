FROM node:latest

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
COPY swagger.json ./
COPY .env ./
COPY src ./src

RUN npm install

EXPOSE $SERVER_PORT
CMD ["npm", "start"]
