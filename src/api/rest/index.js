const express = require('express');

const selfReferencingEffectServiceHandler = require('../../service-handlers/self-referencing-effect');

const {
  errorHandler,
  requestValidator,
  ResponseError,
} = require('./middleware');
const schema = require('../schema');

const usersRouter = (config) => {
  const router = express();
  
  router.post(
    '/v1/participation/self-referencing-effect',
    requestValidator('body', schema.postSelfReferencingEffect, { allowUnknown: true }),
    async (req, res, next) => {
      try {
        await selfReferencingEffectServiceHandler.mailParticipation(req.body, config.smtp);
        return res.json({});
      } catch (error) {
        return next(error);
      }
    },
  );

  router.use(errorHandler);

  return router;
};

module.exports = usersRouter;
