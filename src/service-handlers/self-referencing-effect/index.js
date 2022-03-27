const nodemailer = require('nodemailer');
const { parse } = require('json2csv');

const mailParticipation = async ({
  participant,
  depressionScreeningResponses,
  anxietyScreeningResponses,
  emotionReadings,
  emotionType,
  recallAnswers,
}, smtpConfig) => {
  try {
    const depressionData = depressionScreeningResponses.map(response => ({
      QuestionID: response.question.id,
      ResponseID: Number(response.answer),
    }));
    const depressionCSV = parse(depressionData);

    const anxietyData = anxietyScreeningResponses.map(response => ({
      QuestionID: response.question.id,
      ResponseID: Number(response.answer),
    }));
    const anxietyCSV = parse(anxietyData);

    const emotionReadingsCSV = parse(emotionReadings);

    const resultsData = recallAnswers
      .filter(element => (element !== null))
      .map(result => ({
        ItemID: result.item.id,
        Name: result.item.name,
        Label: result.item.type,
        Answer1: result.question1.answer,
        Time1: result.question1.time,
        Answer2: result.question2 ? result.question2.answer : '',
        Time2: result.question2 ? result.question2.time : '',
    }));
    const resultsCSV = parse(resultsData);
    const data = JSON.stringify({ participant, emotionType });
    
    const transport = nodemailer.createTransport(smtpConfig);
    await transport.sendMail({
      from: {
        name: 'ENCODELab',
        address: smtpConfig.auth.user,
      },
      to: 'tadious@webandthreads.com, p.njomboro@gmail.com, nicolemmciver@gmail.com',
      subject: `Self Referencing Effect Participant: ${participant.fullname}`,
      text: `Hi, There is a new participation in the Self referencing experiment. Please see attachments. ${data}`,
      html: `<b>Hi, There is a new participation in the Self referencing experiment. Please see attachments. 😊</b> ${data}`,
      attachments: [{
        filename: 'depression-screening.csv',
        content: depressionCSV,
      },
      {
        filename: "anxiety-screening.csv",
        content: anxietyCSV,
      },
      {
        filename: "emotion-readings.csv",
        content: emotionReadingsCSV,
      },
      {
        filename: "results.csv",
        content: resultsCSV,
      }],
    });

  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  mailParticipation,
};
