import faker from 'faker';
import config from '../config';

export default {
  before: (browser) => {
    browser
      .waitForElementVisible('body', 1000);
  },
  'SIGNUP: Invalid Signup (say user left some fields blank)': (browser) => {
    browser
      .url(`${config.baseUrl}/signup`)
      .waitForElementVisible('form', 1000)
      .assert.elementPresent('#signup')
      .assert.containsText('#signup', 'Sign up')
      .waitForElementVisible('#signup', 1000)
      .execute(() => {
        document.getElementById('signup').click();
      })
      .pause(1000)
      // Remains in the same page since Signup is invalid
      .assert.urlEquals(`${config.baseUrl}/signup`)
      .end();
  },
  'SIGNUP: Valid Signup (Say user filled fields correctly)': (browser) => {
    browser
      .url(`${config.baseUrl}/signup`)
      .waitForElementVisible('form', 1000)
      .setValue('input[name=username]', faker.internet.userName())
      .setValue('input[name=email]', faker.internet.email())
      .setValue('input[name=fullname]', faker.name.findName())
      .setValue('input[name=password]', 'andela29')
      .setValue('input[name=confirmPassword]', 'andela29')
      .setValue('input[name=mobile]', faker.phone.phoneNumber())
      .assert.elementPresent('#signup')
      .assert.containsText('#signup', 'Sign up')
      .waitForElementVisible('#signup', 1000)
      .execute(() => {
        document.getElementById('signup').click();
      })
      .pause(2000)
      .assert.urlEquals(`${config.baseUrl}/dashboard`)
      .end();
  },
  after: browser => browser.end()
};
