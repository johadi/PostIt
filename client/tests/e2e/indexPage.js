import config from './config';

export default {
  before: (browser) => {
    browser
      .url(config.baseUrl)
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('form', 3000);
  },
  'INDEX PAGE: Signin button (Say user clicked singin button in home page)':
    (browser) => {
      browser
        .url(config.baseUrl)
        .assert.elementPresent('.btn-success')
        .assert.containsText('.btn-success', 'Login now')
        .click('.btn-success')
        .pause(1000)
        .assert.urlEquals(`${config.baseUrl}/signin`)
        .end();
    },
  'INDEX PAGE: Signup button (Say user clicked Signup button in index page)':
    (browser) => {
      browser
        .url(config.baseUrl)
        .assert.elementPresent('.btn-danger')
        .assert.containsText('.btn-danger', 'Join now')
        .click('.btn-danger')
        .pause(1000)
        .assert.urlEquals(`${config.baseUrl}/signup`)
        .end();
    },
  after: browser => browser.end()
};
