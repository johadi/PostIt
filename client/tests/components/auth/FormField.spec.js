import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import FormField from '../../../src/components/auth/FormField';

const wrapper = mount(<FormField/>);
describe('<FormField/>', () => {
  it('should check the div with form-group class exists', () => {
    expect(wrapper.find('.form-group').length).toBe(1);
  });

  it('should check that input text field exists', () => {
    expect(wrapper.find('input').length).toBe(1);
  });
});
