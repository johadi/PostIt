import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import moxios from 'moxios';
import { signupAction } from '../../src/actions/auth/signupAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const userDetails = {
  fullname: 'jimoh hadi',
  username: 'kadir',
  email: 'jim33@gmail.com',
  password: '123456',
  confirmPassword: '123456'
};
describe('SignupAction', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  it('should work', (done) => {
    const expectedActions = [
      {
        type: 'SIGNUP_SUCCESSFUL'
      }
    ];

    const store = mockStore({});
    console.log('xxxxxxxxxxxx',store);
    store.dispatch(signupAction(userDetails)).then(() => {
      console.log('----------------------');
      // expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: 'abcdefgjiop'
      });
    });
    done();
  });
  // it('should work unsuccessful', (done) => {
  //   const expectedActions = [
  //     {
  //       type: 'SIGNUP_UNSUCCESSFUL',
  //       payload: 'username already exists'
  //     }
  //   ];
  //
  //   const store = mockStore({});
  //   store.dispatch(signupAction(userDetails)).then(() => {
  //     console.log('*************************',store.getActions());
  //     // expect(store.getActions()).toEqual(expectedActions);
  //     done();
  //   });
  //
  //   moxios.wait(() => {
  //     const request = moxios.requests.mostRecent();
  //     request.respondWith({
  //       status: 200,
  //       response: 'username already in use'
  //     });
  //   });
  //   done();
  // });
});
