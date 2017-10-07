import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { SigninPage } from '../../../src/components/auth/SigninPage.jsx';
import IndexHeader from '../../../src/components/headers/IndexHeader.jsx';


describe('<SigninPage/>', () => {
  // create a spy function for signupAction
  const signinAction = sinon.spy();
  // spy on handleSubmit of SIgnup Page
  sinon.spy(SigninPage.prototype, 'handleSubmit');
  // spy on handleChange of SIgnup Page
  sinon.spy(SigninPage.prototype, 'handleChange');
  const props = {
    signinState: {},
    signinAction
  };
  const wrapper = mount(<SigninPage {...props} />);
  it('should check if all FormFields are defined', () => {
    expect(wrapper.find('FormField').at(0).props().name).toBe('username');
    expect(wrapper.find('FormField').at(1).props().name).toBe('password');
  });
  it('Should check if number of form fields is equal to 2',
    () => {
      expect(wrapper.find('FormField').length).toBe(2);
    });
  it('Should check if Signin component has header defined',
    () => {
      expect(wrapper.find('IndexHeader').length).toBe(1);
    });
  it('Should check if handleSubmit is called', () => {
    // trigger an event by Signup form
    wrapper.find('form').simulate('submit');
    // handleSubmit is called
    expect(SigninPage.prototype.handleSubmit.calledOnce).toBe(true);
  });
  it('Should check if there is submit button with text Login Now', () => {
    const button = wrapper.find('button');
    expect(button.props().type).toEqual('submit');
    expect(button.text()).toEqual('Login now');
  });
  it('Should check if signinAction is called', () => {
    // trigger an event by Signup form
    wrapper.find('form').simulate('submit');
    // singinAction inside handleSubmit is called
    expect(signinAction.called).toBe(true);
  });
});
