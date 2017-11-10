import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import MainHeader from '../../../src/components/headers/MainHeader';

const wrapper = mount(<MainHeader/>);
describe('<MainHeader/>', () => {
  it('should check that the div with navbar class exists', () => {
    expect(wrapper.find('.navbar').length).toBe(1);
  });
  it('should check that Dashboard link exists', () => {
    expect(wrapper.find('Link').at(0).text()).toBe(' Dashboard');
  });
  it('should check that Groups link exists', () => {
    expect(wrapper.find('Link').at(1).text()).toBe(' Groups');
  });
  it('should check that Logout link exists', () => {
    expect(wrapper.find('Link').at(2).text()).toBe(' Logout');
  });
});
