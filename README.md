# Vue Example

This is a simple vue project. It's made using docker so you can just do `docker-compose up` and enjoy! Alternatively you can do `npm run up` (alias for `docker-compose up`) and `npm run down` (alias for `docker-compose down`).

## Services

The project has 3 services: mongo (for mongodb), server (for REST api and docs) and client (for vue application). You can run each of them independently with e.g. `npm run up -- mongo server`. All of 3 services consume the same `.env` file being placed in the root directory of a project. Please do not commit any changes made to it. Update it with custom credentials when deploying.

## Development

You can run server or client locally in "dev mode" by doing `npm install` in client or server folder (beside of installing it also copies .env) and `npm run dev`. Dev builds consume `server/.env` and `client/.env` files accordingly, but docker-compose build consumes the root `.env` file.

## Server

The server application is using `node.js` and `typescript`, provides simple REST API you can check in swagger.json. After doing `npm run dev` swagger docs should be accessible on `/docs` endpoint. Please mind that docs are not included in "production" build (via docker-compose). If your server is up but no request is completed, check the MONGO_HOST variable. It should point to IP address of the machine you are running mongo on (usually it's 127.0.0.1) when the server is running in "dev" mode. When the server is running in "production" mode it should be pointing to mongodb service name (`mongo`).

## Client

Client is a simple JS/Vue/Webpack application. It uses `webpack-dev-server` to run in "dev" mode and `static-server` to run in "production" mode.