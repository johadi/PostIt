import nodemailer from 'nodemailer';
import twilio from 'twilio';
import handlebars from 'nodemailer-express-handlebars';
import dotenv from 'dotenv';
import fs from 'fs';
import jimp from 'jimp';
import cloudinary from 'cloudinary';
import lodash from 'lodash';
import models from '../database/models';

dotenv.config();
// settings for cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});
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
    case 409:
      return res.status(409).json(err.message);
    case 422:
      return res.status(422).json(err.message);
    case 500:
      return res.status(500).json(err.message);
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
  client.messages.create({to, from, body});
};

/**
 * Helper function that handles profile picture upload locally
 * @function uploadPictureLocally
 * @param {string} oldPath - where picture is saved
 * @param {string} newPath - where resized picture will be saved
 * @return {Promise}
 */
const uploadPictureLocally = (oldPath, newPath) => {
  return new Promise((resolve, reject) => {
    jimp.read(oldPath, (err, image) => {
      if (err) {
        return reject(err);
      }

      image.resize(250, 250)
        .quality(100)
        .write(newPath);
      fs.unlink(oldPath);
      return resolve(newPath);

    });
  })
}

/**
 * Helper function that handles profile picture upload to cloudinary
 * @function uploadPictureToCloudinary
 * @param {string} uploadPath - where picture is saved
 * @param {string} cloudFileName - name of the cloud uploaded file
 * @return {Promise}
 */
const uploadPictureToCloudinary = (uploadPath, cloudFileName) => {
  const cloudPath = `postit/profile_pictures/${cloudFileName}`; //remember it has no file extension
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(uploadPath,(result)=> {
        fs.unlink(uploadPath);
        return resolve(result);
      },
      {
        public_id: cloudPath,//images/files are saved according to this path
        width: 200,
        height: 200
      });
  })
}

/**
 * Helper function that updates user details
 * @function updateUserDetails
 * @param {object} req - http req object
 * @param {object} res - http res object
 * @param {object} fields - fields body to update in the database
 * @return {void}
 */
const updateUserDetails = (req, res, fields) => {
  models.User.findOne({where: {username: req.user.username}})
    .then(user => {
      if (!user) {
        return Promise.reject('Something went wrong');
      }

      const fieldsInLowercase = {};
      Object.keys(fields).forEach((key) => {
        fieldsInLowercase[key] = fields[key].toLowerCase();
      });

      return user.update(fieldsInLowercase);
    })
    .then((updatedUser) => {
      return handleSuccess(
        200,
        lodash.pick(updatedUser, ['id', 'username', 'email', 'mobile', 'fullname', 'avatarPath']),
        res
      )
    })
    .catch(err => {

      const errors = {};
      if(err && err.name && err.name === 'SequelizeValidationError') {
        err.errors.forEach((error) => {
          errors[error.path] = error.message;
        });
        return handleError({code: 400, message: errors}, res);
      }

      if(err && err.name && err.name === 'SequelizeUniqueConstraintError') {
        err.errors.forEach((error) => {
          errors[error.path] = error.message;
        });
        return handleError({code: 409, message: errors}, res);
      }

      return handleError(err, res);
    });
}

export {
  sendSMS, sendMail, handleError, handleSuccess, uploadPictureLocally, uploadPictureToCloudinary, updateUserDetails
};
