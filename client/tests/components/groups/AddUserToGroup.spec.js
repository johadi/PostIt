import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount } from 'enzyme';
import {
  AddUserToGroup
} from '../../../src/components/groups/AddUserToGroup';
import { addUser } from '../../seeds/componentsSeeder';

describe('<AddUserToGroup/>', () => {
  const onAddUser = sinon.spy();
  const getGroupUsers = sinon.spy();
  const getUsersSearch = sinon.spy();
  const clearUsersSearch = sinon.spy();
  sinon.spy(AddUserToGroup.prototype, 'handleSubmit');
  sinon.spy(AddUserToGroup.prototype, 'handleSearch');
  const props = {
    ...addUser,
    onAddUser,
    getGroupUsers,
    getUsersSearch,
    clearUsersSearch
  };
  const wrapper = mount(<AddUserToGroup{...props} />);
  it('should check if component contains form input of type' +
    ' text and with onKeyUp attribute', () => {
    expect(wrapper.find('input').first().props().onKeyUp).toExist();
    expect(wrapper.find('input').first().props().type).toBe('text');
  });
  it('Should check if a form has a button of type submit forsearching user',
    () => {
      expect(wrapper.find('button').props().type).toBe('submit');
    });
  it('Should check if handleSubmit and getUsersSearch methods are ' +
    'called when a form is submitted', () => {
    wrapper.find('form').simulate('submit'); // trigger an event by form
    // handleSubmit is called
    expect(AddUserToGroup.prototype.handleSubmit.called).toBe(true);
    expect(getUsersSearch.called).toBe(true);
  });
  it('Should check if handleSearch and getUsersSearch methods ' +
    'are called on every onKeyUp', () => {
    wrapper.find('input').first().simulate('keyup'); // trigger an event by form
    expect(AddUserToGroup.prototype.handleSearch.called).toBe(true);
    expect(getUsersSearch.called).toBe(true);
  });
});
