const nodemailer = require('nodemailer');

const mailParticipation = async (participationData, smtpConfig) => {
  const transport = nodemailer.createTransport(smtpConfig);
  await transport.sendMail({
    from: {
      name: 'ENCODELab',
      address: smtpConfig.auth.user,
    },
    to: 'nicolemmciver@gmail.com',
    subject: 'New participation: Self Referencing Effect',
    text: 'Hi, There is a new participation in the Self referencing experiment. Please see attachment.',
    attachments: [{
      filename: 'participation.json',
      content: JSON.stringify(participationData),
      contentType: 'text/json'
    }],
  });
};

module.exports = {
  mailParticipation,
};
