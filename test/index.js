const sinon = require('sinon');
const knex = require('knex');

const app = require('../app');
const config = require('./config');

const knexInstance = knex(config.knex);

before(async () => {
  await knexInstance.migrate.latest(config.knex.migrations);

  app.init(config);
});

beforeEach(() => {
  sinon.useFakeTimers({
    now: new Date('2020-01-30T11:26:55Z'),
    toFake: ['Date'],
  });
});

afterEach(async () => {
  sinon.restore();
});

after(async () => {
  knexInstance.destroy();
});
