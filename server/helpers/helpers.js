import nodemailer from 'nodemailer';
import twilio from 'twilio';

require('dotenv').config();
// error message handler
const handleError = (err, res) => {
  switch (err.code) {
    case 404:
      return res.status(404).json(err.message);
    default:
      return res.status(400).json(err);
  }
};
// success message handler
const handleSuccess = (code, body, res) => {
  switch (code) {
    case 201:
      return res.status(201).json(body);
    default:
      return res.status(200).json(body);
  }
};
// create reusable transporter object using the default SMTP transport
// Sending Email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true, // secure:true for port 465, secure:false for port 587
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
});
const sendMail = (from, to, subject, message) => {
  const mailOptions = {
    from,
    to,
    subject,
    html: message
  };
  return transporter.sendMail(mailOptions);
};
// Sending SMS
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const sendSMS = (from, to, body) => {
  client.messages.create({ to, from, body });
};
export { sendSMS, sendMail, handleError, handleSuccess };
