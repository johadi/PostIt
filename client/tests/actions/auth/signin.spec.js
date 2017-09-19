// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import expect from 'expect';
// import moxios from 'moxios';
// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
// import actionTypes from '../../../src/actions/actionTypes';
// import { signinAction } from '../../../src/actions/auth/signinAction';
//
// const mock = new MockAdapter(axios);
// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);
// const userCredentials = {
//   username: 'johadi10',
//   password: '123456',
// };
// describe('SigninAction', () => {
//   // before((done) => {
//   //   mock.restore();
//   //   done();
//   // });
//   beforeEach(() => {
//     mock.reset();
//   });
//   it('should dispatch SIGNIN_SUCCESSFUL action when user is logged in ',
//     (done) => {
//       const expectedActions = [{ type: actionTypes.SIGNIN_SUCCESSFUL }];
//       // arguments for reply are (status, data, headers)
//       mock.onPost('/api/v1/user/signin', userCredentials).reply(() => {
//         return new Promise((resolve, reject) => {
//           resolve([200, 'helloooo']);
//         });
//       });
//       const store = mockStore({});
//       store.dispatch(signinAction(userCredentials)).then(() => {
//         // expect(store.getActions()).toEqual(expectedActions);
//         console.log(store.getActions());
//       });
//       setTimeout(() => {
//         done();
//       }, 1000);
//     });
//   // it('should dispatch SIGNIN_VALIDATION_ERROR action when any user input is invalid',
//   //   (done) => {
//   //     const expectedActions = [{
//   //       type: actionTypes.SIGNIN_VALIDATION_ERROR,
//   //       payload: 'The username field is required'
//   //     }];
//   //     // arguments for reply are (status, data, headers)
//   //     mock.onPost('/api/v1/user/signin', userCredentials).reply(400, {
//   //       validateError: 'The username field is required'
//   //     });
//   //     const store = mockStore({});
//   //     store.dispatch(signinAction(userCredentials)).then(() => {
//   //       expect(store.getActions()).toEqual(expectedActions);
//   //     });
//   //     setTimeout(() => {
//   //       done();
//   //     }, 1000);
//   //   });
//   // it('should dispatch SIGNIN_UNSUCCESSFUL action when username is not found',
//   //   (done) => {
//   //     const expectedActions = [{
//   //       type: actionTypes.SIGNIN_VALIDATION_ERROR,
//   //       payload: undefined
//   //     }, {
//   //       type: actionTypes.SIGNIN_UNSUCCESSFUL,
//   //       payload: 'User not found'
//   //     },];
//   //     // arguments for reply are (status, data, headers)
//   //     mock.onPost('/api/v1/user/signin', userCredentials).reply(400, 'User not found');
//   //     const store = mockStore({});
//   //     store.dispatch(signinAction(userCredentials)).then(() => {
//   //       expect(store.getActions()).toEqual(expectedActions);
//   //     });
//   //     setTimeout(() => {
//   //       done();
//   //     }, 1000);
//   //   });
// });
