import faker from 'faker';
import config from '../config';

const username = faker.internet.userName();
const password = 'andela29';
const password2 = 'andela29'
const username2 = 'moshe.batz80';
const groupName = faker.random.word();
const getGroupIdFromUrl = (str) => {
  const strArray = str.split('/');
  return strArray[4];
};
let groupId = 21;
export default {
  before: (browser) => {
    browser
      .waitForElementVisible('body', 1000)
      // .url(`${config.baseUrl}/signup`) // register a user //Done
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
  },
  beforeEach: (browser) => { // login the user on every test suites
    browser
    .url(`${config.baseUrl}/signin`)
    .waitForElementVisible('form', 1000)
    .clearValue('input[name=username]')
    .clearValue('input[name=password]')
    .setValue('input[name=username]', username2)
    .setValue('input[name=password]', password2)
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
  // 'CREATE GROUP: (say user typed the group name)': (browser) => { // Done
  //   browser
  //     .url(`${config.baseUrl}/dashboard`)
  //     .waitForElementVisible('.main', 1000)
  //     .assert.elementPresent('div.main p a:nth-of-type(2)')
  //     .assert.containsText('div.main p a:nth-of-type(2)', 'Create Group')
  //     // .waitForElementVisible('#signin', 1000)
  //     // .execute(() => {
  //     //   document.getElementById('signin').click();
  //     // })
  //     .click('div.main p a:nth-of-type(2)')
  //     .pause(2000)
  //     .assert.urlEquals(`${config.baseUrl}/create-group`)
  //     .waitForElementVisible('form', 1000)
  //     .setValue('input[name=name]', groupName)
  //     .waitForElementVisible('form button[type=submit]', 1000)
  //     .click('button[type=submit]')
  //     .pause(1000)
  //     .url((result) => {
  //       groupId = getGroupIdFromUrl(result.value);
  //       console.log('******************', groupId);
  //       browser.assert.urlEquals(`${config.baseUrl}/group/${groupId}/add`);
  //     })
  //     .pause(2000)
  //     // .assert.urlEquals(`${config.baseUrl}/${groupId}/add`)
  //     .end();
  // },
  // 'ADD_USER_TO GROUP: (user search by username)': (browser) => { // Done
  //   browser
  //     // .url(`${config.baseUrl}/group/${groupId}/add`)
  //     .url(`${config.baseUrl}/group/${groupId}/add`)
  //     .waitForElementVisible('form', 1000)
  //     .setValue('input[name=search]', 'johadi10')
  //     .pause(2000)
  //     // .assert.elementPresent('#search')
  //     .assert.elementPresent('table tbody tr:nth-of-type(1)') // do we have search result
  //     .assert.containsText('table tbody tr:nth-of-type(1) td:nth-of-type(1)', 'johadi')
  //     .assert.containsText('table tbody tr:nth-of-type(1) td:nth-of-type(4) a', 'Add')
  //     .click('table tbody tr:nth-of-type(1) td:nth-of-type(4) a')
  //     .pause(2000)
  //     .assert.containsText('table caption h4', 'User added successfully')
  //     .end();
  // },
  'SEND NOTIFICATION: (say user wants to post message)': (browser) => { // Done
    browser
    // .url(`${config.baseUrl}/group/${groupId}/add`)
    //   .url('http://localhost:8080/group/21/add')
      .url(`${config.baseUrl}/group/${groupId}/message`)
      .waitForElementVisible('form', 1000)
      .setValue('textarea', `the north always remembers ${faker.lorem.words()}`)
      .click('button[type=submit]')
      .pause(2000)
      .assert.urlEquals(`${config.baseUrl}/group/${groupId}/board`)
      .assert.containsText('div.message:nth-of-type(1) div.media-body p.text-overflow a', 'the north always remembers')
      .pause(1000)
      .end();
  },
  'VIEW NOTIFICATIONS: (list of messages in a group)': (browser) => { // Done
    browser
      .url(`${config.baseUrl}/group/${groupId}/board`)
      .waitForElementVisible('div#message-board-div', 1000)
      .pause(2000)
      .assert.urlEquals(`${config.baseUrl}/group/${groupId}/board`)
      .assert.containsText('div.message:nth-of-type(1) div.media-body p.text-overflow a', 'the north always remembers')
      .assert.containsText('div.message:nth-of-type(1) div.media-body h4', username2) // message sender
      .pause(3000)
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
  // 'show Id': (browser) => {
  //   console.log(groupId);
  //   browser
  //     .url(`${config.baseUrl}/group/${groupId}/add`)
  //     .end();
  // },
  after: browser => browser.end()
};
