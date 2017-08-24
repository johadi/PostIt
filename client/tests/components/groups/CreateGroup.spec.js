import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { CreateGroup } from '../../../src/components/groups/CreateGroup';


describe('<CreateGroup/>', () => {
  const createGroup = sinon.spy(); // create a spy function for createGroup Action
  sinon.spy(CreateGroup.prototype, 'handleCreateGroup'); // spy on handleCreateGroup of CreateGroup Page
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
    expect(CreateGroup.prototype.handleCreateGroup.calledOnce).toBe(true); // handleSubmit is called
  });
  // it('Should check if createGroup action method is called', () => {
  //   wrapper.find('form').simulate('submit'); // trigger an event by form
  //   expect(createGroup.called).toBe(true); // createGroup action inside handleCreateGroup is called
  // });
});
