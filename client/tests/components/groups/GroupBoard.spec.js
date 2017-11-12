import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { GroupBoard } from
  '../../../src/components/groups/GroupBoard';
import componentsSeeder from '../../seeds/componentsSeeder';

describe('<GroupBoard/>', () => {
  const getGroupUsers = sinon.spy();
  const getGroupMessages = sinon.spy();
  sinon.spy(GroupBoard.prototype, 'handleSelect');
  const { groupMessages, name, groupId } = componentsSeeder.groupBoard;
  const props = {
    getGroupMessages,
    getGroupUsers,
    name,
    groupId,
    groupState: { groupMessages }
  };
  const wrapper = mount(<GroupBoard{ ...props} />);
  describe('No Messages', () => {
    before(() => {
      const groupState = {
        groupMessages
      };
      wrapper.setProps({ groupState });
    });

    it('should check that Pagination doesn\'t exist when number ' +
      'of pages is just 1', () => {
      expect(wrapper.find('Pagination').length).toNotExist();
    });

    it('Should check that no message div exists for empty message array',
      () => {
        expect(wrapper.find('.message').length).toBe(0);
      });
  });

  describe('Messages with Pagination', () => {
    const pages = 4;
    const { newGroupMessages } = componentsSeeder.groupBoard;
    before(() => {
      const groupState = {
        groupMessages: newGroupMessages
      };
      wrapper.setProps({ groupState });
    });

    it('should check that Pagination exists since our pages is now 4.'
      , () => {
        expect(wrapper.find('Pagination').length).toBe(1);
      });

    it('Should check that 2 message divs exist since we now have array of 2 messages',
      () => {
        expect(wrapper.find('.message').length).toBe(2);
      });

    it('Should check that our pages are paginated correctly', () => {
      // assert that items is equal to no of our pages
      expect(wrapper.find('Pagination').props().items).toBe(pages);
    });
  });
});
