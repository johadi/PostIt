import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import thunk from 'redux-thunk';
import jsdom from 'jsdom-global';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import AddUserGroupContainer from '../../../../src/components/groups/groupContainers/AddUserGroupContainer.jsx';
import Page from '../../../../src/components/groups/Page.jsx';

const middleware = [thunk];
const mockStore = configureStore(middleware);
const storeStateMock = {
  verifyTokenReducer: {
    userDetail: {},
    success: true
  },
  groupReducer: { groupUsersStore: 'hi' }
};
const clearAddUserError = sinon.spy();
const addUserToGroup = sinon.spy();
const getGroupUsers = sinon.spy();
const props = {
  params: { groupId: 1 },
  tokenStatus: {
    success: true
  },
  groupState: {
    groupUsersStore: { name: 'jimoh' }
  },
  getGroupUsers,
  clearAddUserError,
  addUserToGroup,
}
let store = mockStore(storeStateMock);
let wrapper = shallow(<AddUserGroupContainer {...props} store={store} />).shallow();
describe('<AddUserGroupContainer/>', () => {
  // beforeEach(() => {
  //
  //   wrapper =
  // });
  it('should check that the Page is rendered', () => {
    // expect(wrapper.contains(<Page/>)).toBe(true);
    // expect(wrapper.contains('<Page>')).toBe(true);
  });
  // it('should check that activities header exists', () => {
  //   expect(wrapper.find('p').at(1).text()).toBe('Activities');
  // });
  // it('should check that group notification link exists', () => {
  //   expect(wrapper.find('Link').at(0).text()).toBe(' Group notifications');
  // });
  // it('should check that send notification link exists', () => {
  //   expect(wrapper.find('Link').at(1).text()).toBe(' Send notification here');
  // });
  // it('should check that add user to group link exists', () => {
  //   expect(wrapper.find('Link').at(2).text()).toBe(' Add User to group');
  // });
  // it('should check that group members link exists', () => {
  //   expect(wrapper.find('Link').at(3).text()).toBe(' Group members');
  // });
  // it('should check that UserDetail component exists', () => {
  //   expect(wrapper.find('UserDetail').length).toBe(1);
  // });
});
