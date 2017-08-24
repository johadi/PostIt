import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
// import store from '../../src/store/store';
import { SigninPage } from '../../../src/components/auth/SigninPage';
import AuthHeader from '../../../src/components/headers/AuthHeader';


describe('<SigninPage/>', () => {
  const signinAction = sinon.spy(); // create a spy function for signupAction
  sinon.spy(SigninPage.prototype, 'handleSubmit'); // spy on handleSubmit of SIgnup Page
  sinon.spy(SigninPage.prototype, 'handleChange'); // spy on handleChange of SIgnup Page
  const props = {
    signinState: {},
    signinAction
  };
  const wrapper = mount(<SigninPage { ...props} />);
  it('should check if all FormFields are defined', () => {
    expect(wrapper.find('FormField').at(0).props().name).toBe('username');
    expect(wrapper.find('FormField').at(1).props().name).toBe('password');
  });
  it('Should check if number of form fields is equal to 2', () => {
    expect(wrapper.find('FormField').length).toBe(2);
  });
  it('Should check if Signin component has header defined', () => {
    expect(wrapper.find('AuthHeader').length).toBe(1);
  });
  it('Should check if handleSubmit is called', () => {
    wrapper.find('form').simulate('submit'); // trigger an event by Signup form
    expect(SigninPage.prototype.handleSubmit.calledOnce).toBe(true); // handleSubmit is called
  });
  it('Should check if there is submit button with text Login Now', () => {
    const button = wrapper.find('button');
    expect(button.props().type).toEqual('submit');
    expect(button.text()).toEqual('Login now');
  });
  it('Should check if signinAction is called', () => {
    wrapper.find('form').simulate('submit'); // trigger an event by Signup form
    expect(signinAction.called).toBe(true); // singinAction inside handleSubmit is called
  });
});
