// module.exports = {
//   'Demo test Google' : function (client) {
//     client
//       .url('http://www.google.com')
//       .waitForElementVisible('body', 1000)
//       .assert.title('Google')
//       .assert.visible('input[type=text]')
//       .setValue('input[type=text]', 'rembrandt van rijn')
//       .waitForElementVisible('button[name=btnG]', 1000)
//       .click('button[name=btnG]')
//       .pause(1000)
//       .assert.containsText('ol#rso li:first-child',
//       'Rembrandt - Wikipedia')
//       .end();
//   }
// }
// import config from '../config';
//
// export default {
//   before: (browser) => {
//     browser
//       .url(config.baseUrl)
//       .waitForElementVisible('body', 1000);
//   },
//   'Test Signup page': (browser) => {
//     browser
//       .waitForElementVisible('form', 1000);
//   },
//   after: browser => browser.end()
// };
