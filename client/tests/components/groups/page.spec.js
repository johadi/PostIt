import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import Page from '../../../src/components/groups/Page.jsx';

const middleware = [thunk];
const mockStore = configureStore(middleware);
const storeStateMock = {
  myReducer: {
    someState: 'ABC'
  }
};
let store;
let wrapper;
describe('<Page/>', () => {
  const cancelModal = sinon.spy();
  const props = {
    children: null,
    showModal: false,
    cancelModal,
    signupState: {
      welcome: false
    }
  };
  beforeEach(() => {
    store = mockStore(storeStateMock);
    wrapper = shallow(<Page {...props} store={store} />).shallow();
  });
  it('should check that the div with container class exist', () => {
    expect(wrapper.find('.container').length).toBe(1);
  });
  it('should check that header section exists', () => {
    expect(wrapper.find('MainHeader').length).toBe(1);
  });
  it('should check that footer section exists', () => {
    expect(wrapper.find('MainFooter').length).toBe(1);
  });
});
