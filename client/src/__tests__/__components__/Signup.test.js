import 'babel-polyfill';
import React from 'react';
// import expect from 'expect';
// import { expect } from 'chai';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import SignupPage from '../../components/auth/SignupPage';

const mockStore = configureStore();
/* global jest */
/* global expect */

Object.defineProperty(window, 'sessionStorage', { value: jest.fn() });
window.sessionStorage.getItem = jest.fn();
window.sessionStorage.setItem = jest.fn();

describe('<SignupPage/>', () => {
  // before((done)=>{
  //   window.location.token = 'hello';
  //   done();
  // })
  // const mockState = {
  //   fails: 'hello',
  //   errors: ''
  // };
  // const store = mockStore(mockState);
  const signupState = {
    fails: null,
    errors: null
  };
  const wrapper = shallow(<Provider store={mockStore({ runtime: {} })}><SignupPage signupState={signupState} /></Provider>);
  it('should pass for this signup', () => {
    expect(wrapper.find('AuthHeader')).toBeDefined();
    expect(wrapper.find('form')).toBeDefined();
    expect(wrapper.find('FormField').first().props().name).toBeDefined();
    // const AuthHeader2 = wrapper.find('AuthHeader');
  });
});
