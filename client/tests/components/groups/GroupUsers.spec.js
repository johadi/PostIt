import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { GroupUsers } from '../../../src/components/groups/GroupUsers';

describe('<GroupUsers/>', () => {
  const getGroupUsers = sinon.spy();
  const getGroupUsersPagination = sinon.spy();
  sinon.spy(GroupUsers.prototype, 'handleSelect');
  // Note: Whenever there is a group it must have at least an existing member ,likely the creator
  const props = {
    groupUsersPagination: {
      Users: [
        {
          User: {
            username: 'johadi',
            id: 5
          }
        }
      ],
      count: 3,
      pages: 1
    },
    name: 'andela',
    getGroupUsersPagination,
    getGroupUsers,
    groupId: '1',
    groupState: {}
  };
  const wrapper = mount(<GroupUsers{ ...props} />);
  describe('Group Users with No pagination', () => {
    it('should check that Pagination doesn\'t exist since our page is just 1, no pagination', () => {
      expect(wrapper.find('Pagination').length).toBe(0);
    });
    it('Should check that only one member is in the list since our users array is length one', () => {
      expect(wrapper.find('Link').length).toBe(1);
    });
  });
  describe('Implementation of pagination if number of pages is more than 1', () => {
    const pages = 3;
    before(() => {
      const groupUsersPagination = {
        Users: [
          {
            User: {
              username: 'johadi',
              id: 5
            }
          },
          {
            User: {
              username: 'jimoh',
              id: 2
            }
          }
        ],
        count: 8,
        pages
      };
      wrapper.setProps({ groupUsersPagination });
    });
    it('should check that Pagination exist since our pages is now 3.there is pagination', () => {
      expect(wrapper.find('Pagination').length).toBe(1);
    });
    it('Should check that 2 Link elements exist since we have array of 2 users available', () => {
      expect(wrapper.find('Link').length).toBe(2);
    });
    it('Should check whether our pages are paginated correctly', () => {
      expect(wrapper.find('Pagination').props().items).toBe(pages); // assert that items is equal to no of our pages
    });
  });
});
