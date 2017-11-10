import nodemailer from 'nodemailer';
import twilio from 'twilio';
import handlebars from 'nodemailer-express-handlebars';
import dotenv from 'dotenv';

dotenv.config();
/**
 * Helper function that handles error messages
 * @function handleError
 * @param {object} err - error parameter
 * @param {object} res - response parameter
 * @return {object} response detail
 */
const handleError = (err, res) => {
  switch (err.code) {
    case 400:
      return res.status(400).json(err.message);
    case 403:
      return res.status(403).json(err.message);
    case 404:
      return res.status(404).json(err.message);
    case 422:
      return res.status(422).json(err.message);
    default:
      return res.status(500).json(err);
  }
};

/**
 * Helper function that handles success messages
 * @function handleSuccess
 * @param {number} code - success code parameter
 * @param {object} body - response body
 * @param {object} res - response parameter
 * @return {object} response detail
 */
const handleSuccess = (code, body, res) => {
  switch (code) {
    case 201:
      return res.status(201).json(body);
    default:
      return res.status(200).json(body);
  }
};

// Sending Email
// Create handlebars options
const handlebarsOptions = {
  viewPath: 'server/emails',
  extName: '.hbs'
};

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true, // secure:true for port 465, secure:false for port 587
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
});
// Tells transport to use handlebars
transporter.use('compile', handlebars(handlebarsOptions));

/**
 * Helper function that handles send mail
 * @function sendMail
 * @param {string} from
 * @param {string|array} to
 * @param {string} subject
 * @param {string} template
 * @param {string} context
 * @return {*} any
 */
const sendMail = (from, to, subject, template, context) => {
  const mailOptions = {
    from,
    to,
    subject,
    template,
    context
  };
  return transporter.sendMail(mailOptions);
};

// Sending SMS
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
/**
 * Helper function that handles send SMS
 * @function sendSMS
 * @param {string} from
 * @param {string} to
 * @param {string} body
 * @return {void}
 */
const sendSMS = (from, to, body) => {
  client.messages.create({ to, from, body });
};
/**
 * Helper function that paginates results
 * @function paginateResult
 * @param {number} page
 * @param {number} itemsPerPage
 * @return {object} pagination meta data
 */
const paginateResult = (page, itemsPerPage) => {
  // convert the query to standard number for use
  // Let the page query default to one if user never passes page query
  const pageQuery = parseInt(page, 10) || 1;
  // limit you want to display per page
  const limit = itemsPerPage;
  const currentPage = pageQuery < 1 ? 1 : pageQuery;
  // Number of items to skip
  const offset = limit * (currentPage - 1);
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;
  return { limit, offset, currentPage, previousPage, nextPage };
};
export { sendSMS, sendMail, handleError, handleSuccess, paginateResult };
