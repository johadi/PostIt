import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import actionTypes from '../../src/actions/actionTypes';
import { signupAction } from '../../src/actions/auth/signupAction';
import { signinAction } from '../../src/actions/auth/signinAction';
import { recoverPasswordAction } from '../../src/actions/auth/passwordAction';
import { createGroup, addUserToGroup, postMessage, getGroupMessages,
  viewMessage, getGroupUsers, getUserGroups,
  getAllUserGroups, getBoardMessages, getUsersSearch,
  updateReadMessage } from '../../src/actions/group/groupActions';

const mock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('SignupAction', () => {
  beforeEach(() => {
    mock.reset();
  });
  const userDetails = {
    fullname: 'jimoh hadi',
    username: 'johadi10',
    email: 'jim33@gmail.com',
    password: '123456',
    confirmPassword: '123456'
  };
  it('should dispatch SIGNUP_SUCCESSFUL action when user is created',
    (done) => {
      const expectedActions = [{ type: actionTypes.SIGNUP_SUCCESSFUL }];
      // arguments for reply are (status, data, headers)
      mock.onPost('/api/v1/user/signup', userDetails).reply(201, 'hajji');
      const store = mockStore({});
      store.dispatch(signupAction(userDetails)).then(() => {
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
    mock.onPost('/api/v1/user/signup', userDetails).reply(400, {
      validateError: 'The username field is required'
    });
    const store = mockStore({});
    store.dispatch(signupAction(userDetails)).then(() => {
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
        userDetails).reply(400, 'username already exists');
      const store = mockStore({});
      store.dispatch(signupAction(userDetails)).then(() => {
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
  const userCredentials = {
    username: 'johadi10',
    password: '123456',
  };
  it('should dispatch SIGNIN_SUCCESSFUL action when user is logged in ',
    (done) => {
      const expectedActions = [{ type: actionTypes.SIGNIN_SUCCESSFUL }];
      // arguments for reply are (status, data, headers)
      mock.onPost('/api/v1/user/signin',
        userCredentials).reply(200, 'xyz.abc.tyz.you');
      const store = mockStore({});
      store.dispatch(signinAction(userCredentials)).then(() => {
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
    mock.onPost('/api/v1/user/signin', userCredentials).reply(400, {
      validateError: 'The username field is required'
    });
    const store = mockStore({});
    store.dispatch(signinAction(userCredentials)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    setTimeout(() => {
      done();
    }, 1000);
  });
  it('should dispatch SIGNIN_UNSUCCESSFUL action when username is not found',
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
        userCredentials).reply(400, 'User not found');
      const store = mockStore({});
      store.dispatch(signinAction(userCredentials)).then(() => {
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
  const userEmail = 'johadi@gmail.com';
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
describe('Group Actions', () => {
  describe('createGroup', () => {
    beforeEach(() => {
      mock.reset();
    });
    const name = 'andela';
    it('should dispatch GROUP_CREATE_SUCCESSFUL action when group is created ',
      (done) => {
        const expectedActions = [{
          type: actionTypes.GROUP_CREATE_SUCCESSFUL
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
    it('should dispatch GROUP_CREATE_ERROR action when ' +
      'group is not created',
      (done) => {
        const expectedActions = [{
          type: actionTypes.GROUP_CREATE_ERROR,
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
    const user = 'jimoh';
    const groupId = 2;
    it('should dispatch GROUP_ADD_USER_SUCCESSFUL action when user is added to group ',
      (done) => {
        const expectedActions = [{
          type: actionTypes.GROUP_ADD_USER_SUCCESSFUL
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
    it('should dispatch GROUP_ADD_USER_ERROR action when ' +
      'user is not added to group',
      (done) => {
        const expectedActions = [{
          type: actionTypes.GROUP_ADD_USER_ERROR,
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
  describe('getGroupMessages', () => {
    beforeEach(() => {
      mock.reset();
    });
    const groupId = 2;
    const payload = { body: 'hello', groupId: 5 };
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
  describe('viewMessage', () => {
    beforeEach(() => {
      mock.reset();
    });
    const groupId = 2;
    const messageId = 3;
    const payload = { body: 'hello', groupId: 5 };
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
  describe('getGroupUsers', () => {
    beforeEach(() => {
      mock.reset();
    });
    const groupId = 2;
    const payload = { rows: ['johadi', 'jimoh'] };
    it('should dispatch GROUP_USERS_PAGINATED_SUCCESSFUL action when ' +
      'getGroupUsers method is called ',
      (done) => {
        const expectedActions = [{
          type: actionTypes.GROUP_USERS_PAGINATED_SUCCESS,
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
    it('should dispatch GROUP_USERS_PAGINATED_ERROR action when ' +
      'error occurred after getGroupUsers is called',
      (done) => {
        const expectedActions = [{
          type: actionTypes.GROUP_USERS_PAGINATED_ERROR,
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
  describe('getAllUserGroups', () => {
    beforeEach(() => {
      mock.reset();
    });
    const payload = { rows: ['andela', 'class29'] };
    it('should dispatch GET_USER_GROUPS_SUCCESS action when ' +
      'getAllUserGroups method is called ',
      (done) => {
        const expectedActions = [{
          type: actionTypes.GET_USER_GROUPS_SUCCESS,
          payload
        }];
        // arguments for reply are (status, data, headers)
        mock.onGet('/api/v1/group/user/groups?page=0')
          .reply(200, payload);
        const store = mockStore({});
        store.dispatch(getAllUserGroups()).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        setTimeout(() => {
          done();
        }, 1000);
      });
    it('should dispatch GET_USER_GROUPS_ERROR action when ' +
      'error occurred after getAllUserGroups is called',
      (done) => {
        const expectedActions = [{
          type: actionTypes.GET_USER_GROUPS_ERROR,
          payload: 'Error Occurred...Try again'
        }];
        // arguments for reply are (status, data, headers)
        mock.onGet('/api/v1/group/user/groups?page=0')
          .reply(400, 'Error Occurred...Try again');
        const store = mockStore({});
        store.dispatch(getAllUserGroups()).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
        setTimeout(() => {
          done();
        }, 1000);
      });
  });
  describe('getUserGroups', () => {
    beforeEach(() => {
      mock.reset();
    });
    const payload = { rows: ['andela', 'class29'] };
    it('should dispatch USER_GROUPS_PAGINATED_SUCCESS action when ' +
      'getUserGroups method is called ',
      (done) => {
        const expectedActions = [{
          type: actionTypes.USER_GROUPS_PAGINATED_SUCCESS,
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
    it('should dispatch USER_GROUPS_PAGINATED_ERROR action when ' +
      'error occurred after getUserGroups is called',
      (done) => {
        const expectedActions = [{
          type: actionTypes.USER_GROUPS_PAGINATED_ERROR,
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
  describe('getBoardMessages', () => {
    beforeEach(() => {
      mock.reset();
    });
    const payload = { rows: ['who is he?', 'he is a superman'] };
    it('should dispatch GET_BOARD_MESSAGES_SUCCESS action when ' +
      'getBoardMessages method is called ',
      (done) => {
        const expectedActions = [{
          type: actionTypes.GET_BOARD_MESSAGES_SUCCESS,
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
    it('should dispatch GET_BOARD_MESSAGES_ERROR action when ' +
      'error occurred after getBoardMessages is called',
      (done) => {
        const expectedActions = [{
          type: actionTypes.GET_BOARD_MESSAGES_ERROR,
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
  describe('getUsersSearch', () => {
    beforeEach(() => {
      mock.reset();
    });
    const payload = { rows: ['johadi10', 'emmanuel'] };
    const search = 'joh';
    const id = 3;
    it('should dispatch USERS_SEARCH_SUCCESSFUL action when ' +
      'getUsersSearch method is called ',
      (done) => {
        const expectedActions = [{
          type: actionTypes.USERS_SEARCH_SUCCESSFUL,
          payload
        }];
        // arguments for reply are (status, data, headers)
        mock.onGet(`/api/v1/users?search=${search}&groupId=${id}`)
          .reply(200, payload);
        const store = mockStore({});
        store.dispatch(getUsersSearch(id, search)).then(() => {
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
        mock.onGet(`/api/v1/users?search=${search}&groupId=${id}`)
          .reply(400, 'Error Occurred...Try again');
        const store = mockStore({});
        store.dispatch(getUsersSearch(id, search)).then(() => {
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

