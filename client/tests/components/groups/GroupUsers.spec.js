import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { GroupUsers } from '../../../src/components/groups/GroupUsers';
import componentsSeeder from '../../seeds/componentsSeeder';

describe('<GroupUsers/>', () => {
  const getGroupUsers = sinon.spy();
  sinon.spy(GroupUsers.prototype, 'handleSelect');
  const { groupId, name, groupUsers, newGroupUsers } = componentsSeeder.groupUsers;
  // Note: Whenever there is a group it must have at
  // least an existing member ,likely the creator
  const props = {
    groupUsers,
    name,
    getGroupUsers,
    groupId,
    groupState: {}
  };
  const wrapper = mount(<GroupUsers{ ...props} />);

  describe('Group Users with No pagination', () => {
    it('should check Pagination doesn\'t exist if number of pages is just 1',
      () => {
        expect(wrapper.find('Pagination').length).toBe(0);
      });

    it('Should check that only one member is in the list when' +
      'users array is length one', () => {
      expect(wrapper.find('Link').length).toBe(1);
    });
  });
  describe('Group Users with Pagination', () => {
    const pages = 3;
    before(() => {
      wrapper.setProps({ groupUsers: newGroupUsers });
    });

    it('should check that Pagination exist since our pages is now 3.',
      () => {
        expect(wrapper.find('Pagination').length).toBe(1);
      });

    it('Should check that 2 Links exist since we now have array of 2 users',
      () => {
        expect(wrapper.find('Link').length).toBe(2);
      });

    it('Should check that our pages are paginated correctly', () => {
      // assert that items is equal to no of our pages
      expect(wrapper.find('Pagination').props().items).toBe(pages);
    });
  });
});
