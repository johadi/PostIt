import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { SigninPage } from '../../../src/components/auth/SigninPage';

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
    // trigger an event by Signup form
    wrapper.find('form').simulate('submit');
    // handleSubmit is called
    expect(SigninPage.prototype.handleSubmit.calledOnce).toBe(true);
  });

  it('Should check that there is login submit button', () => {
    const button = wrapper.find('button');
    expect(button.props().type).toEqual('submit');
    expect(button.text()).toEqual('Login now');
  });

  it('Should check that signinAction is called', () => {
    // trigger an event by Signup form
    wrapper.find('form').simulate('submit');
    // singinAction inside handleSubmit is called
    expect(signinAction.called).toBe(true);
  });

  it('Should check that ErrorComponent exists when error is thrown', () => {
    const signinState = {
      fails: 'invalid username'
    };
    wrapper.setProps({ signinState });
    // singinAction inside handleSubmit is called
    expect(wrapper.find('ErrorComponent').length).toBe(1);
  });
});
