import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { AllGroups } from '../../../src/components/groups/AllGroups.jsx';

const middleware = [thunk];
const mockStore = configureStore(middleware);
describe('<AllGroups/>', () => {
  const getAllUserGroups = sinon.spy();
  const getUserGroups = sinon.spy();
  sinon.spy(AllGroups.prototype, 'handleSelect');
  // sinon.spy(AllGroups.prototype, 'componentWillMount');
  const props = {
    groupState: {},
    getAllUserGroups,
    getUserGroups,
    userGroups: {
      groups: [],
      count: 0,
      pages: 1
    }
  };
  const wrapper = mount(<AllGroups { ...props} />);
  // const wrapper = mount(
  //   <Provider store={mockStore({ runtime: {} })}>
  //     <AllGroups { ...props} />
  //   </Provider>
  // )
  describe('No Groups', () => {
    before(() => {
      const userGroups = {
        groups: [],
        count: 0,
        pages: 1
      };
      wrapper.setProps({ userGroups });
    });
    it('should check that Pagination doesn\'t exist since our page' +
      ' is just 1, no pagination', () => {
      expect(wrapper.find('Pagination').length).toNotExist();
      // expect(wrapper.find('.yo').length).toBe(1);
    });
    it('Should check that no group div exists since our groups ' +
      'array is empty', () => {
      expect(wrapper.find('.group-div').length).toBe(0);
    });
    it('Should check that group count is zero since our groups ' +
      'array is empty', () => {
      expect(wrapper.find('.group-count').text()).toBe('Total groups you joined: 0');
    });
  });
  describe('If there is at least one Group', () => {
    const pages = 3;
    before(() => {
      const userGroups = {
        groups: [
          {
            Group: {
              id: '2',
              name: 'twilight'
            }
          },
          {
            Group: {
              id: '4',
              name: 'jamboree'
            }
          }
        ],
        count: 20,
        pages
      };
      wrapper.setProps({ userGroups });
    });
    it('Should check that group count is 20 since our props ' +
      'changes count to 20', () => {
      expect(wrapper.find('.group-count').text()).toBe('Total groups you joined: 20');
    });
    it('should check that Pagination exist since our pages is now 3.' +
      'there is pagination', () => {
      expect(wrapper.find('Pagination').length).toBe(1);
    });
    it('Should check that 2 group divs exist since we have array of 2 ' +
      'groups available', () => {
      expect(wrapper.find('.group-div').length).toBe(2);
    });
    it('Should check whether our pages are paginated correctly', () => {
      // assert that items is equal to no of our pages
      expect(wrapper.find('Pagination').props().items).toBe(pages);
    });
  });
});
