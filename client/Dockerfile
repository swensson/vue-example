FROM node:latest

WORKDIR /app

COPY package.json ./
COPY webpack.config.js ./
COPY .babelrc ./
COPY src ./src

RUN npm install

EXPOSE $CLIENT_PORT
CMD ["npm", "start"]
