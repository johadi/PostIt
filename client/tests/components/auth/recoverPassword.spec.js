import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { RecoverPasswordPage } from '../../../src/components/auth/RecoverPasswordPage';

describe('<RecoverPasswordPage/>', () => {
  // create a spy function for signupAction
  const recoverPasswordAction = sinon.spy();
  // spy on handleSubmit of SIgnup Page
  sinon.spy(RecoverPasswordPage.prototype, 'handleSubmit');
  // spy on handleChange of SIgnup Page
  sinon.spy(RecoverPasswordPage.prototype, 'handleChange');
  const props = {
    recoveryState: {},
    recoverPasswordAction
  };
  const wrapper = mount(<RecoverPasswordPage {...props} />);
  it('should check if email FormField is defined', () => {
    expect(wrapper.find('FormField').props().name).toBe('email');
  });
  it('Should check if number of form fields is equal to 1',
    () => {
      expect(wrapper.find('FormField').length).toBe(1);
    });
  it('Should check if RecoverPasswordPage component has header defined',
    () => {
      expect(wrapper.find('IndexHeader').length).toBe(1);
    });
  it('Should check if RecoverPasswordPage component has footer defined',
    () => {
      expect(wrapper.find('IndexFooter').length).toBe(1);
    });
  it('Should check if handleSubmit is called', () => {
    // trigger an event by Recovery form
    wrapper.find('form').simulate('submit');
    // handleSubmit is called
    expect(RecoverPasswordPage.prototype.handleSubmit.calledOnce).toBe(true);
  });
  it('Should check if there is submit button with text "Send password recovery link"', () => {
    const button = wrapper.find('button');
    expect(button.props().type).toEqual('submit');
    expect(button.text()).toEqual('Send password recovery link');
  });
  it('Should check if recoverPasswordAction is called', () => {
    // trigger an event by recoverPassword form
    wrapper.find('form button').simulate('click');
    // recoverPasswordAction inside handleSubmit is called
    expect(recoverPasswordAction.called).toBe(true);
  });
  it('Should check if ErrorComponent exists when error is thrown', () => {
    const recoveryState = {
      fails: 'invalid email'
    };
    wrapper.setProps({ recoveryState });
    expect(wrapper.find('ErrorComponent').length).toBe(1);
  });
});
