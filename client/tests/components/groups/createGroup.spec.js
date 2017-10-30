import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { CreateGroup } from '../../../src/components/groups/CreateGroup';


describe('<CreateGroup/>', () => {
  // create a spy function for createGroup Action
  const createGroup = sinon.spy();
  // spy on handleCreateGroup of CreateGroup Page
  sinon.spy(CreateGroup.prototype, 'handleCreateGroup');
  const props = {
    groupState: {},
    createGroup
  };
  const wrapper = mount(<CreateGroup { ...props} />);
  it('should check if component contains form input for group name', () => {
    expect(wrapper.find('input').first().props().name).toBe('name');
  });
  it('Should check if a form has a button of type submit', () => {
    expect(wrapper.find('button').text()).toBe('Create group');
    expect(wrapper.find('button').props().type).toBe('submit');
  });
  it('Should check if handleCreateGroup is called when form is submitted', () => {
    wrapper.find('form').simulate('submit'); // trigger an event by form
    // handleCreateGroup is called
    expect(CreateGroup.prototype.handleCreateGroup.calledOnce).toBe(true);
  });
});
