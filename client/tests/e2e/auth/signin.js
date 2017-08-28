import faker from 'faker';
import config from '../config';

const username = faker.internet.userName();
const password = 'andela29';
const username2 = 'joseph82';

export default {
  before: (browser) => {
    browser
      .waitForElementVisible('body', 1000)
      .url(`${config.baseUrl}/signup`)
      .waitForElementVisible('form', 1000)
      .setValue('input[name=username]', username)
      .setValue('input[name=email]', faker.internet.email())
      .setValue('input[name=fullname]', faker.name.findName())
      .setValue('input[name=password]', password)
      .setValue('input[name=confirm_password]', password)
      .setValue('input[name=mobile]', faker.phone.phoneNumber())
      .waitForElementVisible('#signup', 1000)
      .execute(() => {
        document.getElementById('signup').click();
      });
  },
  'SIGNIN: Invalid Signin (say user type incorrect password)': (browser) => {
    browser
      .url(`${config.baseUrl}/signin`)
      .waitForElementVisible('form', 1000)
      .setValue('input[name=username]', username)
      .setValue('input[name=password]', 'izogem')
      .assert.elementPresent('#signin')
      .assert.containsText('#signin', 'Login now')
      .waitForElementVisible('#signin', 1000)
      // .execute(() => {
      //   document.getElementById('signin').click();
      // })
      .click('#signin')
      .pause(2000)
      // Remains in the same page since Signup is invalid
      .waitForElementVisible('#error', 1000)
      .assert.containsText('#error', 'Incorrect password')
      .assert.urlEquals(`${config.baseUrl}/signin`)
      .end();
  },
  'SIGNIN: Valid Signin (Say user typed correct details)': (browser) => {
    browser
      .url(`${config.baseUrl}/signin`)
      .waitForElementVisible('form', 1000)
      .clearValue('input[name=username]')
      .clearValue('input[name=password]')
      .setValue('input[name=username]', username)
      .setValue('input[name=password]', password)
      .assert.elementPresent('#signin')
      .assert.containsText('#signin', 'Login now')
      .waitForElementVisible('#signin', 1000)
      // .execute(() => {
      //   document.getElementById('signin').click();
      // })
      .click('#signin')
      .pause(2000)
      .assert.urlEquals(`${config.baseUrl}/dashboard`)
      .end();
  },
  after: browser => browser.end()
};
