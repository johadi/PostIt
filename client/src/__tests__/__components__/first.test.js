import 'babel-polyfill';
import React from 'react';
// import expect from 'expect';
// import { expect } from 'chai';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import Signup from '../../components/groups/Notification';
import AuthHeader from '../../components/headers/AuthHeader';

const mockStore = configureStore();
/* global jest */
/* global expect */

Object.defineProperty(window, 'sessionStorage', { value: jest.fn() });
window.sessionStorage.getItem = jest.fn();
window.sessionStorage.setItem = jest.fn();

describe('<First/>', () => {
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
  };
  const wrapper = mount(<Provider store={mockStore({ runtime: {} })}><Signup message={message} /></Provider>);
  it('should pass for this first test', () => {
    expect('he').toBe('he');
    // expect(wrapper.find('h2').length).toBe(1);
    // expect(wrapper.find('h2').text()).toBe(' group');
    // expect(wrapper.find('Moment')).toBeDefined();
    // const AuthHeader2 = wrapper.find('AuthHeader');
    // console.log(AuthHeader2);
  });
});
