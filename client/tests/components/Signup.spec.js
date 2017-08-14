// import 'babel-polyfill';
// import React from 'react';
// import expect from 'expect';
// // import { expect } from 'chai';
// import { Provider } from 'react-redux';
// import configureStore from 'redux-mock-store';
// import sinon from 'sinon';
// import { shallow, mount } from 'enzyme';
// // import store from '../../src/store/store';
// import Signup from '../../src/components/auth/SignupPage';
// import AuthHeader from '../../src/components/headers/AuthHeader';
//
//
// describe('<Signup/>', () => {
//   // before((done)=>{
//   //   window.location.token = 'hello';
//   //   done();
//   // })
//   const mockState = {
//     myValue: 1,
//     otherValue: 'test'
//   };
//   const mockStore = configureStore();
//   const store = mockStore(mockState);
//   const wrapper = mount(<Provider store={store}><Signup/></Provider>);
//   let wrapper;
//   beforeEach(() => {
//     wrapper = mount(
//       <Provider store={store}>
//         <MyComponentContainer>
//       </Provider>
//   );
//   });
//   const wrapper = shallow(<Signup/>);
//   it('should pass for this signup', () => {
//     expect(wrapper.find('AuthHeader')).toExist();
//     // const AuthHeader2 = wrapper.find('AuthHeader');
//     // console.log(AuthHeader2);
//   });
// });
