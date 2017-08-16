import 'babel-polyfill';
import React from 'react';
// import { expect } from 'chai';
import expect from 'expect';
import { shallow, mount } from 'enzyme';
import App from '../../src/AppTest';

describe('a passing test', () => {
  it('should pass', () => {
    const wrapper = mount(<App />);
    const button = wrapper.find('button');
    // expect(wrapper.type()).to.eql('li');
    expect(button.length).toBe(1);
    expect(button.props().onClick).toExist();

  });
  it('should see App', () => {
    const wrapper = mount(<App />);
    const App2 = wrapper.find('AppTest2');
    // expect(wrapper.type()).to.eql('li');
    expect('hi').toEqual('hi');
    expect(App2.length).toBe(1);
  });
  it('should see Form', () => {
    const wrapper = mount(<App />);
    const input = wrapper.find('input');
    // expect(wrapper.type()).to.eql('li');
    expect(input.first().props().id).toEqual('username');
  });
});
