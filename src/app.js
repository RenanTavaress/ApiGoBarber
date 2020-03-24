require('dotenv/config');
const express = require('express');
const path = require('path');
const Youch = require('youch');
require('express-async-errors');
const Sentry = require('@sentry/node');
const routes = require('./routes');
const sentryConfig = require('./config/sentry');
require('./database');


class App {
   constructor() {
      this.server = express();

      Sentry.init(sentryConfig);

      this.middlewares();
      this.routes();
      this.exceptionHandle();
   }

   middlewares() {
      this.server.use(Sentry.Handlers.requestHandler());
      this.server.use(express.json());
      this.server.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));
   }

   routes() {
      this.server.use(routes);
      this.server.use(Sentry.Handlers.errorHandler());
   }

   exceptionHandle() {
      this.server.use(async (err, req, res, next) => {
         if (process.env.NODE_ENV === 'development') {
            const errors = await new Youch(err, req).toJSON();

            return res.status(500).json(errors);
         }

         return res.status(500).json({ error: 'Internal Server Erro' });
      });
   }
}

module.exports = new App().server;
