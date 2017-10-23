import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import GroupSideBar from '../../../src/components/sideBars/GroupSideBar.jsx';

const middleware = [thunk];
const mockStore = configureStore(middleware);
const storeStateMock = {
  verifyTokenReducer: {
    userDetail: {}
  }
};
let store;
let wrapper;
describe('<GroupSideBar/>', () => {
  beforeEach(() => {
    store = mockStore(storeStateMock);
    wrapper = mount(<Provider store={store}><GroupSideBar /></Provider>);
  });
  it('should check that the div with well class exist', () => {
    expect(wrapper.find('.well').length).toBe(1);
  });
  it('should check that activities header exists', () => {
    expect(wrapper.find('p').at(1).text()).toBe('Activities');
  });
  it('should check that group notification link exists', () => {
    expect(wrapper.find('Link').at(0).text()).toBe(' Group notifications');
  });
  it('should check that send notification link exists', () => {
    expect(wrapper.find('Link').at(1).text()).toBe(' Send notification here');
  });
  it('should check that add user to group link exists', () => {
    expect(wrapper.find('Link').at(2).text()).toBe(' Add User to group');
  });
  it('should check that group members link exists', () => {
    expect(wrapper.find('Link').at(3).text()).toBe(' Group members');
  });
  it('should check that UserDetail component exists', () => {
    expect(wrapper.find('UserDetail').length).toBe(1);
  });
});
