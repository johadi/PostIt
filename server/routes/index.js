const P = require('bluebird');
const { sendMail, sendSMS } = require('../helpers/helpers');

module.exports = (app) => {
  app.get('/testing', (req, res) => {
    const from = 'no-reply <jimoh@gmail.com>';
    const to = 'jimoh.hadi@gmail.com,taonewsline@gmail.com';
    const subject = 'Notification from Postit';
    const message = '<h2>Hi!, you have one notification from PostIt</h2>' +
        '<h3>Notification level: Critical</h3>' +
        '<p><a href="https://jimoh-postit.herokuapp.com">Login to your PostIt account to view</a></p>' +
        '<p>The PostIt mangement team!!!</p>';
    sendMail(from, to, subject, message)
        .then(result => res.send(result))
        .catch(err => res.send(err));
  });
  app.get('/sms', (req, res) => {
    const to = '+2347082015065';
    const from = '+12568264564';
    const body = 'You have one notification from PostIt. you can login to view at https://jimoh-postit.herokuapp.com';
    sendSMS(from, to, body)
        .then(response => res.json(response))
        .catch(err => res.json(err));
  });
  app.get('/promise', (req, res) => {
    const array = [6, 7, 8, 2, 3];
    P.map(array, (item) => {
      return item * 2;
    })
        .then(rs => res.json(rs))
        .catch(err => res.json(err));
  });
  app.get('/api', (req, res) => res.status(200)
      .send('Welcome to PostIt API. An App for Sending notification to love ones'));
  app.use('/api', require('./auth'));
  app.use('/api', require('./group'));
  app.use('/api/*', (req, res) => res.status(404).json('Oops! 404, This route doesn\'t exist'));
};
