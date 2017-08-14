import 'babel-polyfill';
import React from 'react';
// import expect from 'expect';
// import { expect } from 'chai';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
// import store from '../../src/store/store';
import Signup from '../components/groups/Notification';
import AuthHeader from '../../src/components/headers/AuthHeader';

const mockStore = configureStore();
/* global jest */

Object.defineProperty(window, 'sessionStorage', { value: jest.fn()});
window.sessionStorage.getItem = jest.fn();
window.sessionStorage.setItem = jest.fn();

describe('<Signup/>', () => {
  // before((done)=>{
  //   window.location.token = 'hello';
  //   done();
  // })
  // const mockState = {
  //   myValue: 1,
  //   otherValue: 'test'
  // };
  // const store = mockStore(mockState);
  const message = {
    User: {
      id: 'jimoh',
      fullname: 'hadi',
      username: 'johadi'
    }
  }
  const wrapper = mount(<Provider store={mockStore({ runtime: {} })}><Signup message={message} /></Provider>);
  const wrapper2 = mount(<Signup message={message} />)
  it('should pass for this signup', () => {
    expect(wrapper2.find('small').length).toBe(1);
    // const AuthHeader2 = wrapper.find('AuthHeader');
    // console.log(AuthHeader2);
  });
});
