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
const sendData =
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
    console.log(store);
    store.dispatch({type: 'ADD'}).then(() => console.log('jkjkjkjkjjkjkjk'));
    // store.dispatch(signupAction(userDetails)).then(() => {
    //   expect(store.getActions()).toEqual(expectedActions);
    //   done();
    // });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: { user: userDetails, token: 'abcdefgjiop', status: 'success' }
      });
    });
    done();
  });
});
