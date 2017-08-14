import 'babel-polyfill';
import React from 'react';
import { expect } from 'chai';
// import expect from 'expect';
import { shallow } from 'enzyme';
import App from '../../src/AppTest';

describe('a passing test', () => {
  it('should pass', () => {
    const wrapper = shallow(<App />);
    const button = wrapper.find('button');
    expect(wrapper.type()).to.eql('li');
    expect('hi').to.equal('hi');
    expect(button).to.have.length(1);
  });
});
