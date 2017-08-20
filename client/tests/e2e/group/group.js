import faker from 'faker';
import config from '../config';

const username = faker.internet.userName();
const password = 'andela29';
const username2 = 'joseph82';
const groupName = faker.random.word();
const getGroupIdFromUrl = (str) => {
  const strArray = str.split('/');
  return strArray[4];
}
let groupId;
export default {
  before: (browser) => {
    browser
      .waitForElementVisible('body', 1000)
    // .url(`${config.baseUrl}/signup`)
    // .waitForElementVisible('form', 1000)
    // .setValue('input[name=username]', username)
    // .setValue('input[name=email]', faker.internet.email())
    // .setValue('input[name=fullname]', faker.name.findName())
    // .setValue('input[name=password]', password)
    // .setValue('input[name=confirm_password]', password)
    // .setValue('input[name=mobile]', faker.phone.phoneNumber())
    // .waitForElementVisible('#signup', 1000)
    // .execute(() => {
    //   document.getElementById('signup').click();
    // });
      .url(`${config.baseUrl}/signin`)
      .waitForElementVisible('form', 1000)
      .clearValue('input[name=username]')
      .clearValue('input[name=password]')
      .setValue('input[name=username]', username2)
      .setValue('input[name=password]', password)
      .assert.elementPresent('#signin')
      .assert.containsText('#signin', 'Login now')
      .waitForElementVisible('#signin', 1000)
      // .execute(() => {
      //   document.getElementById('signin').click();
      // })
      .click('#signin')
      .pause(2000)
      .assert.urlEquals(`${config.baseUrl}/dashboard`);
  },
  'CREATE GROUP: (say user typed the group name)': (browser) => {
    browser
      .url(`${config.baseUrl}/dashboard`)
      .waitForElementVisible('.main', 1000)
      .assert.elementPresent('div.main p a:nth-of-type(2)')
      .assert.containsText('div.main p a:nth-of-type(2)', 'Create Group')
      // .waitForElementVisible('#signin', 1000)
      // .execute(() => {
      //   document.getElementById('signin').click();
      // })
      .click('div.main p a:nth-of-type(2)')
      .pause(2000)
      .assert.urlEquals(`${config.baseUrl}/create-group`)
      .waitForElementVisible('form', 1000)
      .setValue('input[name=name]', groupName)
      .waitForElementVisible('form button[type=submit]', 1000)
      .click('button[type=submit]')
      .pause(1000)
      .url((result) => {
        groupId = getGroupIdFromUrl(result.value);
        console.log('******************', groupId);
        browser.assert.urlEquals(`${config.baseUrl}/group/${groupId}/add`);
      })
      .pause(5000)
      // .assert.urlEquals(`${config.baseUrl}/${groupId}/add`)
      .end();
  },
  'CREATE GROUP: (we waiting)': (browser) => {
    console.log('--------------------------', groupId);
    browser
      .url(`${config.baseUrl}/group/${groupId}/add`)
      .waitForElementVisible('div', 1000)
      // .assert.elementPresent('div.main p a:nth-of-type(2)')
      // .assert.containsText('div.main p a:nth-of-type(2)', 'Create Group')
    // .waitForElementVisible('#signin', 1000)
    // .execute(() => {
    //   document.getElementById('signin').click();
    // })
    //   .click('div.main p a:nth-of-type(2)')
    //   .pause(2000)
    //   .assert.urlEquals(`${config.baseUrl}/create-group`)
    //   .waitForElementVisible('form', 1000)
    //   .setValue('input[name=name]', groupName)
    //   .waitForElementVisible('form button[type=submit]', 1000)
    //   .click('button[type=submit]')
    //   .pause(1000)
    //   .url((result) => {
    //     groupId = getGroupIdFromUrl(result.value);
    //     console.log('******************', groupId);
    //   })
      .pause(5000)
      // .assert.urlEquals(`${config.baseUrl}/${groupId}/add`)
      .end();
  },
  // 'SIGNIN: Valid Signin (Say user typed correct details)': (browser) => {
  //   browser
  //     .url(`${config.baseUrl}/signin`)
  //     .waitForElementVisible('form', 1000)
  //     .clearValue('input[name=username]')
  //     .clearValue('input[name=password]')
  //     .setValue('input[name=username]', username2)
  //     .setValue('input[name=password]', password)
  //     .assert.elementPresent('#signin')
  //     .assert.containsText('#signin', 'Login now')
  //     .waitForElementVisible('#signin', 1000)
  //     // .execute(() => {
  //     //   document.getElementById('signin').click();
  //     // })
  //     .click('#signin')
  //     .pause(2000)
  //     .assert.urlEquals(`${config.baseUrl}/dashboard`)
  //     .end();
  // },
  'show Id': (browser) => {
    console.log(groupId);
    browser
      .url(`${config.baseUrl}/group/${groupId}/add`)
      .end();
  },
  after: browser => browser.end()
};
