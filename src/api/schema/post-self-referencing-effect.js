const joi = require('@hapi/joi');

module.exports = joi.object().keys({
  participant: joi.object().keys({
    email: joi.string().required(),
    studentId: joi.string(),
    course: joi.string(),
    birthday: joi.date(),
    gender: joi.string(),
    deviceType: joi.string(),
    deviceModel: joi.string().allow(''),
    visionProblems: joi.boolean(),
    usingVisualAid: joi.boolean(),
    nationality: joi.string(),
  }).required(),
  answers: joi.array().items(joi.object().keys({
    id: joi.number().integer()
  })).required(),
});
