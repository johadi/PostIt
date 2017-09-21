import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import moxios from 'moxios';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import actionTypes from '../../src/actions/actionTypes';
import {signupAction} from '../../src/actions/auth/signupAction';
import {signinAction} from '../../src/actions/auth/signinAction';
import {recoverPasswordAction, resetPasswordAction } from '../../src/actions/auth/passwordAction';

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
  it('should dispatch SIGNUP_SUCCESSFUL action when user is created', (done) => {
    const expectedActions = [{type: actionTypes.SIGNUP_SUCCESSFUL}];
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
  it('should dispatch SIGNUP_VALIDATION_ERROR action when any user input is invalid',
    (done) => {
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
      mock.onPost('/api/v1/user/signup', userDetails).reply(400, 'username already exists');
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
      const expectedActions = [{type: actionTypes.SIGNIN_SUCCESSFUL}];
      // arguments for reply are (status, data, headers)
      mock.onPost('/api/v1/user/signin', userCredentials).reply(200, 'xyz.abc.tyz.you');
      const store = mockStore({});
      store.dispatch(signinAction(userCredentials)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
      setTimeout(() => {
        done();
      }, 1000);
    });
  it('should dispatch SIGNIN_VALIDATION_ERROR action when any user input is invalid',
    (done) => {
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
      mock.onPost('/api/v1/user/signin', userCredentials).reply(400, 'User not found');
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

