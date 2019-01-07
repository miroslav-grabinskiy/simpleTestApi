const express = require("express");
const bodyParser = require("body-parser");
const config = require("../config/config");

const routeFiles = [
  "./routes/themes",
];

class Server {
  constructor(config) {
    this._app = express();
  }
  
  init() {
    this._initMiddlewares();
    this._initRoutes();
    this._initErrorHandler();
  }
  
  start() {
    const port = config.port;

    this._app.listen(port, () => {
      console.log(`started on port ${port}`);
    });
  }
  
  _initRoutes() {
    routeFiles.forEach(path => {
      const routes = require(path);

      this._app.use(routes);
    });
  }
  
  _initMiddlewares() {
    this._app.use(bodyParser.json());
  }

  _initErrorHandler() {
    this._app.use((err, req, res, next) => {
      const statusCode = err.code || 500;

      res.status(statusCode).json(err);
    });
  }
}

module.exports = Server;