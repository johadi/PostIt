import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import NotFoundHeader from '../../../src/components/headers/NotFoundHeader';

const wrapper = mount(<NotFoundHeader/>);
describe('<NotFoundHeader/>', () => {
  it('should check the div with navbar class exists', () => {
    expect(wrapper.find('.navbar').length).toBe(1);
  });

  it('should check that the go back home exists', () => {
    expect(wrapper.find('a strong').text()).toBe('PostIt');
  });
});
