const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_NODEMAILER,
    pass: process.env.PASS_NODEMAILER,
  },
});

const sendEmail = (to, subject, html) => {
  return transporter
    .sendMail({
      from: process.env.EMAIL_NODEMAILER,
      to,
      subject,
      html,
    });
}

module.exports = sendEmail;
