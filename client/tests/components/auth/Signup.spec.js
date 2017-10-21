import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { SignupPage } from '../../../src/components/auth/SignupPage.jsx';
import IndexHeader from '../../../src/components/headers/IndexHeader.jsx';


describe('<SignupPage/>', () => {
  const signupAction = sinon.spy(); // create a spy function for signupAction
  sinon.spy(SignupPage.prototype, 'handleSubmit');
  sinon.spy(SignupPage.prototype, 'handleChange');
  const props = {
    signupState: {},
    signupAction
  };
  const wrapper = mount(<SignupPage { ...props} />);
  it('should check if all FormFields are defined', () => {
    expect(wrapper.find('SignupFormField').at(0).props().name).toBe('fullname');
    expect(wrapper.find('SignupFormField').at(1).props().name).toBe('email');
    expect(wrapper.find('SignupFormField').at(2).props().name).toBe('mobile');
    expect(wrapper.find('SignupFormField').at(3).props().name).toBe('username');
    expect(wrapper.find('SignupFormField').at(4).props().name).toBe('password');
    expect(wrapper.find('SignupFormField').at(5).props().name).toBe('confirmPassword');
  });
  it('Should check if number of form fields is equal to 6', () => {
    expect(wrapper.find('SignupFormField').length).toBe(6);
  });
  it('Should check if Signup component has header defined', () => {
    expect(wrapper.find('IndexHeader').length).toBe(1);
  });
  it('Should check if there is submit button with text Sign up', () => {
    const button = wrapper.find('button');
    expect(button.props().type).toEqual('submit');
    expect(button.text()).toEqual('Sign up');
  });
  it('Should check if handleSubmit is called', () => {
    wrapper.find('form').simulate('submit');
    expect(SignupPage.prototype.handleSubmit.calledOnce).toBe(true);
  });
  it('Should check if signupAction is called', () => {
    // trigger an event by Signup form
    wrapper.find('form').simulate('submit');
    // singupAction inside handleSubmit is called
    expect(signupAction.called).toBe(true);
  });
});
