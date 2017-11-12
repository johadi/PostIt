import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import IndexHeader from '../../../src/components/headers/IndexHeader';

const wrapper = mount(<IndexHeader/>);
describe('<IndexHeader/>', () => {
  it('should check the div with masthead class exists', () => {
    expect(wrapper.find('.masthead').length).toBe(1);
  });

  it('should check the Home link exists', () => {
    expect(wrapper.find('IndexLink').text()).toBe('Home');
  });

  it('should check the Login link exists', () => {
    expect(wrapper.find('Link').at(1).text()).toBe('Login');
  });

  it('should check the Sign up link exists', () => {
    expect(wrapper.find('Link').at(2).text()).toBe('Sign up');
  });
});
