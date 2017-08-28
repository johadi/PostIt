import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { CreateGroupAddUser } from '../../../src/components/groups/CreatedGroupAddUser';


describe('<CreateGroupAddUser/>', () => {
  const onAddUser = sinon.spy();
  const getGroupUsers = sinon.spy();
  const getUsersSearch = sinon.spy();
  sinon.spy(CreateGroupAddUser.prototype, 'handleSubmit');
  sinon.spy(CreateGroupAddUser.prototype, 'handleSearch');
  // sinon.spy(CreateGroupAddUser.prototype, 'componentWIllMount'); // spy on componentWillMount
  const props = {
    name: '',
    onAddUser,
    addUserError: null,
    addUserSuccess: false,
    getGroupUsers,
    groupState: {},
    getUsersSearch,
    groupId: ''
  };
  const wrapper = mount(<CreateGroupAddUser{ ...props} />);
  it('should check if component contains form input of type text and with onKeyUp attribute', () => {
    expect(wrapper.find('input').first().props().onKeyUp).toExist();
    expect(wrapper.find('input').first().props().type).toBe('text');
  });
  it('Should check if a form has a button of type submit for searching user', () => {
    expect(wrapper.find('button').props().type).toBe('submit');
  });
  it('Should check if handleSubmit and getUsersSearch methods are called when a form is submitted', () => {
    wrapper.find('form').simulate('submit'); // trigger an event by form
    expect(CreateGroupAddUser.prototype.handleSubmit.called).toBe(true); // handleSubmit is called
    expect(getUsersSearch.called).toBe(true);
  });
  it('Should check if handleSearch and getUsersSearch methods are called on every onKeyUp', () => {
    wrapper.find('input').first().simulate('keyup'); // trigger an event by form
    expect(CreateGroupAddUser.prototype.handleSearch.called).toBe(true);
    expect(getUsersSearch.called).toBe(true);
  });
});
