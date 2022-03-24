const joi = require('@hapi/joi');

module.exports = joi.object().keys({
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
