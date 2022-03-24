const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { requestLogger } = require('./src/api/rest/middleware');
const router = require('./src/api/rest');

const init = (config) => {
  const app = express();

  // Configuring body parser middleware
  // allow cors requests from any origin and with credentials
  app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));
  
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(requestLogger);

  app.set('trust proxy', 'loopback, uniquelocal');

  app.get('/_ping', (req, res) => res.send({ ok: true }));
  app.use('/api', router(config));

  module.exports.instance = () => app;
};

module.exports = {
  init,
  instance: () => {
    throw new Error('Express app not initialized');
  },
};
