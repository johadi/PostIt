import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { ResetPasswordPage } from '../../../src/components/auth/ResetPasswordPage';
import componentsSeeder from '../../seeds/componentsSeeder';

describe('<ResetPasswordPage/>', () => {
  // create a spy function for signupAction
  const resetPasswordAction = sinon.spy();
  // spy on handleSubmit of SIgnup Page
  sinon.spy(ResetPasswordPage.prototype, 'handleSubmit');
  // spy on handleChange of SIgnup Page
  sinon.spy(ResetPasswordPage.prototype, 'handleChange');
  const { token } = componentsSeeder;
  const props = {
    resetState: {},
    location: {
      query: { token }
    },
    resetPasswordAction
  };
  const wrapper = mount(<ResetPasswordPage {...props}/>);

  it('should check that password field is defined', () => {
    expect(wrapper.find('FormField').at(0).props().name).toBe('password');
  });

  it('should check that confirmPassword field is defined', () => {
    expect(wrapper.find('FormField').at(1).props().name).toBe('confirmPassword');
  });

  it('Should check that number of form fields is equal to 2',
    () => {
      expect(wrapper.find('FormField').length).toBe(2);
    });

  it('Should check that IndexHeader is defined',
    () => {
      expect(wrapper.find('IndexHeader').length).toBe(1);
    });

  it('Should check that IndexFooter is defined',
    () => {
      expect(wrapper.find('IndexFooter').length).toBe(1);
    });

  it('Should check that handleSubmit is called', () => {
    // trigger an event by Reset form
    wrapper.find('form').simulate('submit');
    // handleSubmit is called
    expect(ResetPasswordPage.prototype.handleSubmit.calledOnce).toBe(true);
  });

  it('Should check that there is reset password submit button ', () => {
    const button = wrapper.find('button');
    expect(button.props().type).toEqual('submit');
    expect(button.text()).toEqual('Reset my password');
  });

  it('Should check that recoverPasswordAction is called', () => {
    // trigger an event by Signup form
    wrapper.find('form button').simulate('click');
    // recoverPasswordAction inside handleSubmit is called
    expect(resetPasswordAction.called).toBe(true);
  });

  it('Should check that ErrorComponent exists when error is thrown', () => {
    const resetState = {
      resetFails: 'passwords field can\'t be empty'
    };
    wrapper.setProps({ resetState });
    expect(wrapper.find('ErrorComponent').length).toBe(1);
  });
});
