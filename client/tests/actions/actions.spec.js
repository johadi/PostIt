import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import actionTypes from '../../src/actions/actionTypes';
import { signupAction } from '../../src/actions/auth/signupAction';
import signinAction from '../../src/actions/auth/signinAction';
import { recoverPasswordAction,
  resetPasswordAction } from '../../src/actions/auth/passwordAction';
import { createGroup, addUserToGroup, postMessage, getGroupMessages,
  viewMessage, getGroupUsers, getUserGroups, getBoardMessages, getUsersSearch,
  updateReadMessage } from '../../src/actions/group/groupActions';
import actionsSeeder from '../seeds/actionsSeeder';

const mock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Authentication Actions', () => {
  describe('SignupAction', () => {
    beforeEach(() => {
      mock.reset();
    });
    const { signupDetails, signupReply } = actionsSeeder;

    it('should dispatch SIGNUP_SUCCESSFUL action when user is created',
      (done) => {
        const expectedActions = [{ type: actionTypes.SIGNUP_SUCCESSFUL }];
        // arguments for reply are (status, data, headers)
        mock.onPost('/api/v1/user/signup', signupDetails).reply(201, signupReply);
        const store = mockStore({});
        store.dispatch(signupAction(signupDetails)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        setTimeout(() => {
          done();
        }, 1000);
      });

    it('should dispatch SIGNUP_VALIDATION_ERROR action when any user' +
      'input is invalid', (done) => {
      const expectedActions = [{
        type: actionTypes.SIGNUP_VALIDATION_ERROR,
        payload: 'The username field is required'
      }];
      // arguments for reply are (status, data, headers)
      mock.onPost('/api/v1/user/signup', signupDetails).reply(400, {
        validateError: 'The username field is required'
      });
      const store = mockStore({});
      store.dispatch(signupAction(signupDetails)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
      setTimeout(() => {
        done();
      }, 1000);
    });

    it('should dispatch SIGNUP_UNSUCCESSFUL action when user already exists',
      (done) => {
        const expectedActions = [{
          type: actionTypes.SIGNUP_VALIDATION_ERROR,
          payload: undefined
        }, {
          type: actionTypes.SIGNUP_UNSUCCESSFUL,
          payload: 'username already exists'
        }];
        // arguments for reply are (status, data, headers)
        mock.onPost('/api/v1/user/signup',
          signupDetails).reply(400, 'username already exists');
        const store = mockStore({});
        store.dispatch(signupAction(signupDetails)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        setTimeout(() => {
          done();
        }, 1000);
      });
  });

  describe('SigninAction', () => {
    beforeEach(() => {
      mock.reset();
    });
    const { signinDetails } = actionsSeeder;

    it('should dispatch SIGNIN_SUCCESSFUL action when user is logged in ',
      (done) => {
        const expectedActions = [{ type: actionTypes.SIGNIN_SUCCESSFUL }];
        // arguments for reply are (status, data, headers)
        mock.onPost('/api/v1/user/signin',
          signinDetails).reply(200, 'xyz.abc.tyz.you');
        const store = mockStore({});
        store.dispatch(signinAction(signinDetails)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        setTimeout(() => {
          done();
        }, 1000);
      });

    it('should dispatch SIGNIN_VALIDATION_ERROR action when any user' +
      'input is invalid', (done) => {
      const expectedActions = [{
        type: actionTypes.SIGNIN_VALIDATION_ERROR,
        payload: 'The username field is required'
      }];
      // arguments for reply are (status, data, headers)
      mock.onPost('/api/v1/user/signin', signinDetails).reply(400, {
        validateError: 'The username field is required'
      });
      const store = mockStore({});
      store.dispatch(signinAction(signinDetails)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
      setTimeout(() => {
        done();
      }, 1000);
    });

    it('should dispatch SIGNIN_UNSUCCESSFUL action when password is incorrect',
      (done) => {
        const expectedActions = [{
          type: actionTypes.SIGNIN_VALIDATION_ERROR,
          payload: { password: ['Incorrect password'] }
        }];
        // arguments for reply are (status, data, headers)
        mock.onPost('/api/v1/user/signin',
          signinDetails).reply(400, 'Incorrect password');
        const store = mockStore({});
        store.dispatch(signinAction(signinDetails)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        setTimeout(() => {
          done();
        }, 1000);
      });

    it('should dispatch SIGNIN_UNSUCCESSFUL action when other error is thrown',
      (done) => {
        const expectedActions = [{
          type: actionTypes.SIGNIN_VALIDATION_ERROR,
          payload: undefined
        }, {
          type: actionTypes.SIGNIN_UNSUCCESSFUL,
          payload: 'User not found'
        }];
        // arguments for reply are (status, data, headers)
        mock.onPost('/api/v1/user/signin',
          signinDetails).reply(400, 'User not found');
        const store = mockStore({});
        store.dispatch(signinAction(signinDetails)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        setTimeout(() => {
          done();
        }, 1000);
      });
  });

  describe('recoverPasswordAction', () => {
    beforeEach(() => {
      mock.reset();
    });
    const { userEmail } = actionsSeeder;

    it('should dispatch RECOVERY_SUCCESSFUL action when user is logged in ',
      (done) => {
        const expectedActions = [{
          type: actionTypes.RECOVERY_SUCCESSFUL,
          payload: 'password link sent successfully'
        }];
        // arguments for reply are (status, data, headers)
        mock.onPost('/api/v1/user/recover-password', userEmail)
          .reply(200, 'password link sent successfully');
        const store = mockStore({});
        store.dispatch(recoverPasswordAction(userEmail)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        setTimeout(() => {
          done();
        }, 1000);
      });

    it('should dispatch RECOVERY_VALIDATION_ERROR action when ' +
      'any user input is invalid',
      (done) => {
        const expectedActions = [{
          type: actionTypes.RECOVERY_VALIDATION_ERROR,
          payload: 'The email field is required'
        }];
        // arguments for reply are (status, data, headers)
        mock.onPost('/api/v1/user/recover-password', userEmail).reply(400, {
          validateError: 'The email field is required'
        });
        const store = mockStore({});
        store.dispatch(recoverPasswordAction(userEmail)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        setTimeout(() => {
          done();
        }, 1000);
      });

    it('should dispatch RECOVERY_UNSUCCESSFUL action when email is not found',
      (done) => {
        const expectedActions = [{
          type: actionTypes.RECOVERY_VALIDATION_ERROR,
          payload: undefined
        }, {
          type: actionTypes.RECOVERY_UNSUCCESSFUL,
          payload: 'Sorry this email doesn\'t match our record'
        }];
        // arguments for reply are (status, data, headers)
        mock.onPost('/api/v1/user/recover-password', userEmail).reply(400,
          'Sorry this email doesn\'t match our record');
        const store = mockStore({});
        store.dispatch(recoverPasswordAction(userEmail)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        setTimeout(() => {
          done();
        }, 1000);
      });
  });

  describe('resetPasswordAction', () => {
    beforeEach(() => {
      mock.reset();
    });
    const { passwordDetails } = actionsSeeder;
    const queryParam = 'xxxyyyzzz';

    it('should dispatch RESET_SUCCESSFUL action when password is successfully reset ',
      (done) => {
        const expectedActions = [{
          type: actionTypes.RESET_SUCCESSFUL,
          payload: 'password changed successfully'
        }];
        // arguments for reply are (status, data, headers)
        mock.onPost(`/api/v1/user/reset-password?token=${queryParam}`, passwordDetails)
          .reply(200, 'password changed successfully');
        const store = mockStore({});
        store.dispatch(resetPasswordAction(queryParam, passwordDetails)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        setTimeout(() => {
          done();
        }, 1000);
      });

    it('should dispatch RESET_VALIDATION_ERROR action when ' +
      'any user input is invalid',
      (done) => {
        const expectedActions = [{
          type: actionTypes.RESET_VALIDATION_ERROR,
          payload: 'The password field is required'
        }];
        // arguments for reply are (status, data, headers)
        mock.onPost(`/api/v1/user/reset-password?token=${queryParam}`, passwordDetails).reply(400, {
          validateError: 'The password field is required'
        });
        const store = mockStore({});
        store.dispatch(resetPasswordAction(queryParam, passwordDetails)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        setTimeout(() => {
          done();
        }, 1000);
      });

    it('should dispatch RESET_UNSUCCESSFUL action when passwords not matched',
      (done) => {
        const expectedActions = [{
          type: actionTypes.RESET_VALIDATION_ERROR,
          payload: undefined
        }, {
          type: actionTypes.RESET_UNSUCCESSFUL,
          payload: 'Passwords not matched'
        }];
        // arguments for reply are (status, data, headers)
        mock.onPost(`/api/v1/user/reset-password?token=${queryParam}`, passwordDetails).reply(400,
          'Passwords not matched');
        const store = mockStore({});
        store.dispatch(resetPasswordAction(queryParam, passwordDetails)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        setTimeout(() => {
          done();
        }, 1000);
      });

    it('should dispatch RESET_UNSUCCESSFUL action when other error occurred',
      (done) => {
        const expectedActions = [{
          type: actionTypes.RESET_VALIDATION_ERROR,
          payload: undefined
        }, {
          type: actionTypes.RESET_UNSUCCESSFUL,
          payload: 'Sorry this token in the query is invalid'
        }];
        // arguments for reply are (status, data, headers)
        mock.onPost(`/api/v1/user/reset-password?token=${queryParam}`, passwordDetails).reply(400,
          'Sorry this token in the query is invalid');
        const store = mockStore({});
        store.dispatch(resetPasswordAction(queryParam, passwordDetails)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        setTimeout(() => {
          done();
        }, 1000);
      });
  });
});

describe('Message Actions', () => {
  describe('postMessage', () => {
    beforeEach(() => {
      mock.reset();
    });
    const message = 'how is react';
    const priority = 'normal';
    const groupId = 2;

    it('should dispatch POST_MESSAGE_SUCCESSFUL action when message is sent ',
      (done) => {
        const expectedActions = [{
          type: actionTypes.POST_MESSAGE_SUCCESSFUL
        }];
        // arguments for reply are (status, data, headers)
        mock.onPost(`/api/v1/group/${groupId}/message`, { message, priority })
          .reply(201, 'message created successfully');
        const store = mockStore({});
        store.dispatch(postMessage(groupId, message, priority)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        setTimeout(() => {
          done();
        }, 1000);
      });

    it('should dispatch POST_MESSAGE_ERROR action when ' +
      'message is not sent',
      (done) => {
        const expectedActions = [{
          type: actionTypes.POST_MESSAGE_ERROR,
          payload: 'message body required'
        }];
        // arguments for reply are (status, data, headers)
        mock.onPost(`/api/v1/group/${groupId}/message`,
          { message, priority }).reply(400, 'message body required');
        const store = mockStore({});
        store.dispatch(postMessage(groupId, message, priority)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        setTimeout(() => {
          done();
        }, 1000);
      });
  });

  describe('viewMessage', () => {
    beforeEach(() => {
      mock.reset();
    });
    const groupId = 2;
    const messageId = 3;
    const { viewBody, viewGroupId } = actionsSeeder;
    const payload = { body: viewBody, groupId: viewGroupId };

    it('should dispatch VIEW_MESSAGE_SUCCESSFUL action a message is retrieved ',
      (done) => {
        const expectedActions = [{
          type: actionTypes.VIEW_MESSAGE_SUCCESSFUL,
          payload
        }];
        // arguments for reply are (status, data, headers)
        mock.onGet(`/api/v1/group/${groupId}/message/${messageId}`)
          .reply(200, payload);
        const store = mockStore({});
        store.dispatch(viewMessage(groupId, messageId)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        setTimeout(() => {
          done();
        }, 1000);
      });

    it('should dispatch VIEW_MESSAGE_SUCCESSFUL action when ' +
      'a message can\'t be retrieved',
      (done) => {
        const expectedActions = [{
          type: actionTypes.VIEW_MESSAGE_ERROR,
          payload: 'Error Occurred...Try again'
        }];
        // arguments for reply are (status, data, headers)
        mock.onGet(`/api/v1/group/${groupId}/message/${messageId}`)
          .reply(400, 'Error Occurred...Try again');
        const store = mockStore({});
        store.dispatch(viewMessage(groupId, messageId)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        setTimeout(() => {
          done();
        }, 1000);
      });
  });

  describe('getBoardMessages', () => {
    beforeEach(() => {
      mock.reset();
    });
    const payload = { rows: ['who is he?', 'he is a superman'] };

    it('should dispatch BOARD_MESSAGES_SUCCESS action when ' +
      'getBoardMessages method is called ',
      (done) => {
        const expectedActions = [{
          type: actionTypes.BOARD_MESSAGES_SUCCESS,
          payload
        }];
        // arguments for reply are (status, data, headers)
        mock.onGet('/api/v1/group/user/board?page=1')
          .reply(200, payload);
        const store = mockStore({});
        store.dispatch(getBoardMessages(1)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        setTimeout(() => {
          done();
        }, 1000);
      });

    it('should dispatch BOARD_MESSAGES_ERROR action when ' +
      'error occurred after getBoardMessages is called',
      (done) => {
        const expectedActions = [{
          type: actionTypes.BOARD_MESSAGES_ERROR,
          payload: 'Error Occurred...Try again'
        }];
        // arguments for reply are (status, data, headers)
        mock.onGet('/api/v1/group/user/board?page=1')
          .reply(400, 'Error Occurred...Try again');
        const store = mockStore({});
        store.dispatch(getBoardMessages(1)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        setTimeout(() => {
          done();
        }, 1000);
      });
  });

  describe('updateReadMessage', () => {
    beforeEach(() => {
      mock.reset();
    });
    const payload = true;
    const messageId = 3;

    it('should dispatch MESSAGE_READ_SUCCESSFUL action when ' +
      'updateReadMessage method is called ',
      (done) => {
        const expectedActions = [{
          type: actionTypes.MESSAGE_READ_SUCCESSFUL,
          payload
        }];
        // arguments for reply are (status, data, headers)
        mock.onPost(`/api/v1/group/message-read/${messageId}`)
          .reply(200, payload);
        const store = mockStore({});
        store.dispatch(updateReadMessage(messageId)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        setTimeout(() => {
          done();
        }, 1000);
      });

    it('should dispatch MESSAGE_READ_ERROR action when ' +
      'error occurred after updateReadMessage is called',
      (done) => {
        const expectedActions = [{
          type: actionTypes.MESSAGE_READ_ERROR,
          payload: 'Error Occurred...Try again'
        }];
        // arguments for reply are (status, data, headers)
        mock.onPost(`/api/v1/group/message-read/${messageId}`)
          .reply(400, 'Error Occurred...Try again');
        const store = mockStore({});
        store.dispatch(updateReadMessage(messageId)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        setTimeout(() => {
          done();
        }, 1000);
      });
  });
});

describe('User Actions', () => {
  describe('getUserGroups', () => {
    beforeEach(() => {
      mock.reset();
    });
    const { userGroupsPayload } = actionsSeeder;
    const payload = userGroupsPayload;

    it('should dispatch USER_GROUPS_SUCCESS action when ' +
      'getUserGroups method is called ',
      (done) => {
        const expectedActions = [{
          type: actionTypes.USER_GROUPS_SUCCESS,
          payload
        }];
        // arguments for reply are (status, data, headers)
        mock.onGet('/api/v1/group/user/groups?page=1')
          .reply(200, payload);
        const store = mockStore({});
        store.dispatch(getUserGroups(1)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        setTimeout(() => {
          done();
        }, 1000);
      });

    it('should dispatch USER_GROUPS_ERROR action when ' +
      'error occurred after getUserGroups is called',
      (done) => {
        const expectedActions = [{
          type: actionTypes.USER_GROUPS_ERROR,
          payload: 'Error Occurred...Try again'
        }];
        // arguments for reply are (status, data, headers)
        mock.onGet('/api/v1/group/user/groups?page=1')
          .reply(400, 'Error Occurred...Try again');
        const store = mockStore({});
        store.dispatch(getUserGroups(1)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        setTimeout(() => {
          done();
        }, 1000);
      });
  });

  describe('getUsersSearch', () => {
    beforeEach(() => {
      mock.reset();
    });
    const { searchPayload, searchTerm } = actionsSeeder;
    const payload = searchPayload;
    const search = searchTerm;
    const id = 3;
    const page = 1;

    it('should dispatch USERS_SEARCH_SUCCESSFUL action when ' +
      'getUsersSearch method is called ',
      (done) => {
        const expectedActions = [{
          type: actionTypes.USERS_SEARCH_SUCCESSFUL,
          payload
        }];
        // arguments for reply are (status, data, headers)
        mock.onGet(`/api/v1/users?page=${page}&search=${search}&groupId=${id}`)
          .reply(200, payload);
        const store = mockStore({});
        store.dispatch(getUsersSearch(id, search, page)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        setTimeout(() => {
          done();
        }, 1000);
      });

    it('should dispatch USERS_SEARCH_ERROR action when ' +
      'error occurred after getUsersSearch is called',
      (done) => {
        const expectedActions = [{
          type: actionTypes.USERS_SEARCH_ERROR,
          payload: 'Error Occurred...Try again'
        }];
        // arguments for reply are (status, data, headers)
        mock.onGet(`/api/v1/users?page=${page}&search=${search}&groupId=${id}`)
          .reply(400, 'Error Occurred...Try again');
        const store = mockStore({});
        store.dispatch(getUsersSearch(id, search, page)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        setTimeout(() => {
          done();
        }, 1000);
      });
  });
});

describe('Group Actions', () => {
  describe('createGroup', () => {
    beforeEach(() => {
      mock.reset();
    });
    const name = 'andela';

    it('should dispatch CREATE_GROUP_SUCCESS action when group is created ',
      (done) => {
        const expectedActions = [{
          type: actionTypes.CREATE_GROUP_SUCCESS
        }];
        // arguments for reply are (status, data, headers)
        mock.onPost('/api/v1/group', { name })
          .reply(201, 'group created successfully');
        const store = mockStore({});
        store.dispatch(createGroup(name)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        setTimeout(() => {
          done();
        }, 1000);
      });

    it('should dispatch CREATE_GROUP_ERROR action when ' +
      'group is not created',
      (done) => {
        const expectedActions = [{
          type: actionTypes.CREATE_GROUP_ERROR,
          payload: 'group name is required'
        }];
        // arguments for reply are (status, data, headers)
        mock.onPost('/api/v1/group', { name }).reply(400, 'group name is required');
        const store = mockStore({});
        store.dispatch(createGroup(name)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        setTimeout(() => {
          done();
        }, 1000);
      });
  });

  describe('addUserToGroup', () => {
    beforeEach(() => {
      mock.reset();
    });
    const { addUser, addUserGroupId } = actionsSeeder;
    const user = addUser;
    const groupId = addUserGroupId;

    it('should dispatch ADD_USER_SUCCESSFUL action when user is added to group ',
      (done) => {
        const expectedActions = [{
          type: actionTypes.ADD_USER_SUCCESSFUL
        }];
        // arguments for reply are (status, data, headers)
        mock.onPost(`/api/v1/group/${groupId}/user`, { user })
          .reply(200, 'user added successfully');
        const store = mockStore({});
        store.dispatch(addUserToGroup(groupId, user)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        setTimeout(() => {
          done();
        }, 1000);
      });

    it('should dispatch ADD_USER_ERROR action when ' +
      'user is not added to group',
      (done) => {
        const expectedActions = [{
          type: actionTypes.ADD_USER_ERROR,
          payload: 'invalid username'
        }];
        // arguments for reply are (status, data, headers)
        mock.onPost(`/api/v1/group/${groupId}/user`, { user })
          .reply(404, 'invalid username');
        const store = mockStore({});
        store.dispatch(addUserToGroup(groupId, user)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        setTimeout(() => {
          done();
        }, 1000);
      });
  });

  describe('getGroupMessages', () => {
    beforeEach(() => {
      mock.reset();
    });
    const { groupId, messagePayload } = actionsSeeder;
    const payload = messagePayload;

    it('should dispatch GET_GROUP_MESSAGES_SUCCESSFUL ' +
      'action when messages are retrieved ',
      (done) => {
        const expectedActions = [{
          type: actionTypes.GET_GROUP_MESSAGES_SUCCESSFUL,
          payload
        }];
        // arguments for reply are (status, data, headers)
        mock.onGet(`/api/v1/group/${groupId}/message?page=1`)
          .reply(200, payload);
        const store = mockStore({});
        store.dispatch(getGroupMessages(groupId)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        setTimeout(() => {
          done();
        }, 1000);
      });

    it('should dispatch GET_GROUP_MESSAGES_ERROR action when ' +
      'messages can\'t be retrieved',
      (done) => {
        const expectedActions = [{
          type: actionTypes.GET_GROUP_MESSAGES_ERROR,
          payload: 'invalid groupId'
        }];
        // arguments for reply are (status, data, headers)
        mock.onGet(`/api/v1/group/${groupId}/message?page=1`)
          .reply(400, 'invalid groupId');
        const store = mockStore({});
        store.dispatch(getGroupMessages(groupId)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        setTimeout(() => {
          done();
        }, 1000);
      });
  });

  describe('getGroupUsers', () => {
    beforeEach(() => {
      mock.reset();
    });
    const { groupId, getUsersPayload } = actionsSeeder;
    const payload = getUsersPayload;

    it('should dispatch GROUP_USERS_PAGINATED_SUCCESSFUL action when ' +
      'getGroupUsers method is called ',
      (done) => {
        const expectedActions = [{
          type: actionTypes.GROUP_USERS_SUCCESS,
          payload
        }];
        // arguments for reply are (status, data, headers)
        mock.onGet(`/api/v1/group/${groupId}/group-users?page=1`)
          .reply(200, payload);
        const store = mockStore({});
        store.dispatch(getGroupUsers(groupId)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        setTimeout(() => {
          done();
        }, 1000);
      });

    it('should dispatch GROUP_USERS_ERROR action when ' +
      'error occurred after getGroupUsers is called',
      (done) => {
        const expectedActions = [{
          type: actionTypes.GROUP_USERS_ERROR,
          payload: 'Error Occurred...Try again'
        }];
        // arguments for reply are (status, data, headers)
        mock.onGet(`/api/v1/group/${groupId}/group-users?page=1`)
          .reply(400, 'Error Occurred...Try again');
        const store = mockStore({});
        store.dispatch(getGroupUsers(groupId)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        setTimeout(() => {
          done();
        }, 1000);
      });
  });
});

