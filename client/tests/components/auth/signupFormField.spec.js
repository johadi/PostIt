import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import SignupFormField from '../../../src/components/auth/SignupFormField.jsx';

const wrapper = mount(<SignupFormField/>);
describe('<SignupFormField/>', () => {
  it('should check that the div with form-group class exists', () => {
    expect(wrapper.find('.form-group').length).toBe(1);
  });
  it('should check that input text field exists', () => {
    expect(wrapper.find('input').length).toBe(1);
  });
});
