const log = require('loglevel');
const knex = require('knex');

const app = require('./app');

log.setLevel('trace');

const startServer = (app, config = {}) => new Promise((resolve, reject) => {
  const { port } = config;
  const server = app.listen(port, (error) => {
    if (error) {
      log.error('Failed to start server', { error });
      reject(error);
    } else {
      log.info('Server started', { port });
      resolve(server);
    }
  });
  server.keepAliveTimeout = config.keepAliveTimeout || 61000;
  server.headersTimeout = config.headersTimeout || 62000;
});

const boot = async (config) => {
  try {
    const knexInstance = knex(config.knex);
    await knexInstance.migrate.latest(config.knex.migrations);

    app.init(config);
    await startServer(app.instance(), config.webServer);
  } catch (error) {
    log.error('Failed to boot', { error });
    throw Error('Failed to boot');
  }
};

module.exports = {
  boot,
};
