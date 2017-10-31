import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { ResetPasswordPage } from '../../../src/components/auth/ResetPasswordPage';

describe('<ResetPasswordPage/>', () => {
  // create a spy function for signupAction
  const resetPasswordAction = sinon.spy();
  // spy on handleSubmit of SIgnup Page
  sinon.spy(ResetPasswordPage.prototype, 'handleSubmit');
  // spy on handleChange of SIgnup Page
  sinon.spy(ResetPasswordPage.prototype, 'handleChange');
  const props = {
    resetState: {},
    location: {
      query: {
        token: 'dummytokenstring'
      }
    },
    resetPasswordAction
  };
  const wrapper = mount(<ResetPasswordPage {...props}/>);
  it('should check if password FormField is defined', () => {
    expect(wrapper.find('FormField').at(0).props().name).toBe('password');
  });
  it('should check if confirmPassword FormField is defined', () => {
    expect(wrapper.find('FormField').at(1).props().name).toBe('confirmPassword');
  });
  it('Should check if number of form fields is equal to 2',
    () => {
      expect(wrapper.find('FormField').length).toBe(2);
    });
  it('Should check if ResetPasswordPage component has header defined',
    () => {
      expect(wrapper.find('IndexHeader').length).toBe(1);
    });
  it('Should check if ResetPasswordPage component has footer defined',
    () => {
      expect(wrapper.find('IndexFooter').length).toBe(1);
    });
  it('Should check if handleSubmit is called', () => {
    // trigger an event by Recovery form
    wrapper.find('form').simulate('submit');
    // handleSubmit is called
    expect(ResetPasswordPage.prototype.handleSubmit.calledOnce).toBe(true);
  });
  it('Should check if there is submit button with text "Reset my password"', () => {
    const button = wrapper.find('button');
    expect(button.props().type).toEqual('submit');
    expect(button.text()).toEqual('Reset my password');
  });
  it('Should check if recoverPasswordAction is called', () => {
    // trigger an event by Signup form
    wrapper.find('form button').simulate('click');
    // recoverPasswordAction inside handleSubmit is called
    expect(resetPasswordAction.called).toBe(true);
  });
  it('Should check if ErrorComponent exists when error is thrown', () => {
    const resetState = {
      resetFails: 'passwords field can\'t be empty'
    };
    wrapper.setProps({ resetState });
    expect(wrapper.find('ErrorComponent').length).toBe(1);
  });
});
