import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import SignupModal from '../../../src/components/groups/SignupModal';

const wrapper = mount(<SignupModal/>);
describe('<SignupModal/>', () => {
  it('should check that the div with modal class exist', () => {
    expect(wrapper.find('.modal').length).toBe(1);
  });

  it('should check that welcome text elements exist', () => {
    expect(wrapper.find('strong').at(0).text()).toBe('Hi, Welcome to PostIt');
    expect(wrapper.find('strong').at(1).text()).toBe('PostIt');
    expect(wrapper.find('strong').at(2)
      .text()).toBe('Create groups and share every bit of your moment with loved ones.');
  });

  it('should check that modal close button exists', () => {
    expect(wrapper.find('.btn-danger').text()).toBe('Close');
  });
});
