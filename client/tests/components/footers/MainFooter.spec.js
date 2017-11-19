import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import MainFooter from '../../../src/components/footers/MainFooter';

const wrapper = mount(<MainFooter/>);
describe('<MainFooter/>', () => {
  it('should check the div with footer-div class exists', () => {
    expect(wrapper.find('.footer-div').length).toBe(1);
  });

  it('should check that footer text exists', () => {
    expect(wrapper.find('footer p').text()).toBe('Copyright © Johadi PostIt 2017');
  });
});
