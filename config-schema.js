const joi = require('@hapi/joi');

module.exports = joi.object().keys({
  knex: joi.object().keys({
    client: joi.string().required(),
    migrations: joi.object().keys({
      directory: joi.string().required(),
    }),
    connection: joi.object().keys({
      database: joi.string().required(),
      host: joi.string().required(),
      password: joi.string().required(),
      port: joi.number().port().required(),
      user: joi.string().required(),
    }),
  }),
  webServer: joi.object().keys({
    port: joi.number().port().required(),
  }).required(),
  smtp: joi.object().keys({
    host: joi.string().required(),
      port: joi.number().port().required(),
      auth: joi.object().keys({
         user: joi.string().required(),
         pass: joi.string().required(),
      }).required(),
  }).required(),
});
