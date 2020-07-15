# vue-example

This is a vue example project. It's built using docker compose and you can do `npm run up` to start the project. Do `npm run down` to remove containers.

## Development

Use `npm run up -- mongo` to run only mongodb. Visit `server` or `client` folders and do `npm install && npm run dev` there to set em up locally. Server application may require changes in `server/.env` file (it should appear after doing `npm install`), please point MONGO_HOST to localhost.
