import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import IndexHeader from '../../../src/components/headers/IndexHeader.jsx';

const wrapper = mount(<IndexHeader/>);
describe('<IndexHeader/>', () => {
  it('should check that the div with masthead class exists', () => {
    expect(wrapper.find('.masthead').length).toBe(1);
  });
  it('should check that Home link exists', () => {
    expect(wrapper.find('IndexLink').text()).toBe('Home');
  });
  it('should check that Login link exists', () => {
    expect(wrapper.find('Link').at(1).text()).toBe('Login');
  });
  it('should check that Sign up link exists', () => {
    expect(wrapper.find('Link').at(2).text()).toBe('Sign up');
  });
});
