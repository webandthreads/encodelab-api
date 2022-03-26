const joi = require('@hapi/joi');

const option = joi.object().keys({
  id: joi.number().required(),
  title: joi.string().required(),
});

const screeningResponse = joi.object().keys({
  question: joi.object().keys({
    id: joi.number().required(),
    title: joi.string().allow(''),
    options: joi.array().items(option).required(),
  }),
  answer: joi.string().required(),
});

const emotionReading = joi.object().keys({
  time: joi.number().required(),
  value: joi.number().required(),
});

const recallAnswer = joi.object().keys({
  item: joi.object().keys({
    id: joi.number().required(),
    name: joi.string().required(),
    image: joi.string().required(),
    type: joi.string().required(),
  }),
  question1: joi.object().keys({
    answer: joi.boolean(),
    time: joi.number()
  }),
  question2: joi.object().keys({
    answer: joi.string(),
    time: joi.number()
  }),
}).allow(null);

module.exports = joi.object().keys({
  participant: joi.object().keys({
    fullname: joi.string().required(),
    age: joi.number().required(),
    nationality: joi.string().required(),
    gender: joi.string().required(),
    prescribedGlasses: joi.boolean(),
    wearGlasses: joi.boolean(),
    device: joi.string().required(),
    makeAndModel: joi.string().required(),
    studentNumber: joi.string(),
    course: joi.string(),
  }).required(),
  depressionScreeningResponses: joi.array().items(screeningResponse).required(),
  anxietyScreeningResponses: joi.array().items(screeningResponse).required(),
  emotionReadings: joi.array().items(emotionReading).required(),
  emotionType: joi.string().required(),
  recallAnswers: joi.array().items(recallAnswer).required(),
});
