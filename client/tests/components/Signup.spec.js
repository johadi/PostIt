import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
// import { expect } from 'chai';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
// import store from '../../src/store/store';
import { SignupPage }  from '../../src/components/auth/SignupPage';
import AuthHeader from '../../src/components/headers/AuthHeader';


describe('<Signup/>', () => {
  // before((done)=>{
  //   window.location.token = 'hello';
  //   done();
  // })
  // const mockState = {
  //   success: false,
  //   welcome: false,
  //   errors: {},
  //   fails: {}
  // };
  const props = {
    signupState: {}
  };
  // const initialState = {}
  // const middlewares = [thunk]
  // const mockStore = configureStore(middlewares);
  // const store = mockStore(mockState);
  const wrapper = mount(<SignupPage { ...props} />);
  // const wrapper = shallow(<Signup/>);
  // it('should pass for this signup', () => {
  //   expect(wrapper.find('AuthHeader').length).toBe(1);
  //   // const AuthHeader2 = wrapper.find('AuthHeader');
  //   // console.log(AuthHeader2);
  // });
  // let wrapper;
  // beforeEach(() => {
  //   wrapper = mount(
  //     <Provider store={store}>
  //       <MyComponentContainer>
  //     </Provider>
  // );
  // });
});
