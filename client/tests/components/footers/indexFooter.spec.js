import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import IndexFooter from '../../../src/components/footers/IndexFooter';

const wrapper = mount(<IndexFooter/>);
describe('<IndexFooter/>', () => {
  it('should check that the div with mastfoot class exists', () => {
    expect(wrapper.find('.mastfoot').length).toBe(1);
  });
  it('should check that a p tag exist with appropriate text', () => {
    expect(wrapper.find('p').text()).toBe('Copyright © Johadi PostIt 2017');
  });
});
