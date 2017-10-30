import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { SignupPage } from '../../../src/components/auth/SignupPage.jsx';

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
    expect(wrapper.find('FormField').at(0).props().name).toBe('fullname');
    expect(wrapper.find('FormField').at(1).props().name).toBe('email');
    expect(wrapper.find('FormField').at(2).props().name).toBe('mobile');
    expect(wrapper.find('FormField').at(3).props().name).toBe('username');
    expect(wrapper.find('FormField').at(4).props().name).toBe('password');
    expect(wrapper.find('FormField').at(5).props().name).toBe('confirmPassword');
  });
  it('Should check if number of form fields is equal to 6', () => {
    expect(wrapper.find('FormField').length).toBe(6);
  });
  it('Should check if SignupPage component has header defined', () => {
    expect(wrapper.find('IndexHeader').length).toBe(1);
  });
  it('Should check if SignupPage component has footer defined',
    () => {
      expect(wrapper.find('IndexFooter').length).toBe(1);
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
  it('Should check if ErrorComponent exists when error is thrown', () => {
    const signupState = {
      fails: 'invalid username'
    };
    wrapper.setProps({ signupState });
    // singinAction inside handleSubmit is called
    expect(wrapper.find('ErrorComponent').length).toBe(1);
  });
});
